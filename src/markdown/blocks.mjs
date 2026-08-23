import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { sanitizerOptions } from "../../scripts/sanitize-config.mjs";

/**
 * Shared block marker engine for GitHub CMS.
 * Single source of truth for parsing `@block` markers. Used by both
 * scripts/generate-content.mjs (build time) and src/composables/useMarkdown.ts (runtime).
 *
 * Canonical paired syntax (space after `<!--` and after `:` is optional, normalized):
 *   <!-- @block:name --> … <!-- /@block:name -->
 *
 * Legacy open-ended syntax is also accepted (marker without a closing pair). Such
 * blocks span until the next marker or EOF and produce a `legacyWarnings` entry so
 * validators can flag them. A closing marker without a matching open marker (or a
 * mismatched close) is reported as an error.
 */

export const BLOCK_NAMES = [
  "hero",
  "answer-first",
  "key-facts",
  "featured-snippet",
  "faq",
  "cta",
  "schema-hints",
];

// Matches `<!-- @block:name -->`, `<!-- @block: name -->`, `<!--/@block:name -->` variants.
const MARKER_REGEX = /<!--\s*(\/)?\s*@block:\s*([a-z0-9-]+)\s*-->/gi;

const isFenceStart = (line) => /^\s*(```|~~~)/.test(line);

// Ranges of inline code spans (backtick-wrapped) in a line.
function inlineCodeRanges(line) {
  const ranges = [];
  const re = /`[^`]*`/g;
  let m;
  while ((m = re.exec(line)) !== null) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  return ranges;
}

function inRanges(pos, ranges) {
  return ranges.some(([s, e]) => pos >= s && pos < e);
}

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch {
        /* fall through to escaped output */
      }
    }
    return markdown.utils.escapeHtml(str);
  },
});

/**
 * Render a Markdown source to sanitized HTML using the single shared
 * MarkdownIt configuration and sanitizer options.
 */
export function renderMarkdown(source) {
  return sanitizeHtml(markdown.render(source), sanitizerOptions);
}

function stripHtmlToText(html) {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Tokenize a Markdown body into block marker tokens. Handles canonical and
 * legacy whitespace variants and distinguishes opening from closing markers.
 * Markers inside fenced code blocks (``` or ~~~) and inline code spans
 * (backtick-wrapped) are ignored.
 */
export function tokenizeMarkers(rawContent) {
  const tokens = [];
  const lines = String(rawContent ?? "").split("\n");
  let inFence = false;
  let offset = 0;
  for (const line of lines) {
    if (inFence) {
      if (isFenceStart(line)) inFence = false;
    } else if (isFenceStart(line)) {
      inFence = true;
    } else {
      const codeRanges = inlineCodeRanges(line);
      MARKER_REGEX.lastIndex = 0;
      let match;
      while ((match = MARKER_REGEX.exec(line)) !== null) {
        if (inRanges(match.index, codeRanges)) continue;
        tokens.push({
          kind: match[1] === "/" ? "close" : "open",
          name: match[2],
          start: offset + match.index,
          end: offset + match.index + match[0].length,
        });
      }
    }
    offset += line.length + 1;
  }
  return tokens;
}

function buildBlock(name, markdownSource, position) {
  const source = markdownSource.trim();
  const html = source ? renderMarkdown(source) : "";
  return {
    name,
    markdown: source,
    html,
    plainText: source ? stripHtmlToText(markdown.render(source)) : "",
    position,
  };
}

/**
 * Parse a Markdown body into ordered blocks and body text.
 *
 * Returns:
 *  - `blocks`: array of { name, markdown, html, plainText, position } in source order
 *  - `body`: Markdown content outside block pairs (leading/trailing whitespace trimmed)
 *  - `legacyWarnings`: strings describing open-ended (legacy) blocks
 *  - `errors`: strings describing unbalanced closers / mismatched pairs
 *
 * Parser semantics:
 *  - an open marker followed by a matching close marker is a paired block;
 *  - if the document contains NO closing markers at all it is treated as a
 *    legacy document: each open marker is open-ended and its content runs until
 *    the next marker or EOF (one warning per block);
 *  - if the document DOES contain closing markers (paired syntax) then an open
 *    without a matching close is an unclosed-pair error;
 *  - a close marker without a preceding open marker (or mismatched) is an error;
 *  - marker content inside fenced code blocks or inline code spans is ignored.
 */
export function parseBlocks(rawContent) {
  const body = String(rawContent ?? "");
  const tokens = tokenizeMarkers(body);

  const blocks = [];
  const legacyWarnings = [];
  const errors = [];

  if (tokens.length === 0) {
    return { blocks, body: body.trim(), legacyWarnings, errors };
  }

  const hasCloseMarkers = tokens.some((t) => t.kind === "close");
  const usesPairedSyntax = hasCloseMarkers;

  // A paired block is an open marker followed (before any other marker) by a
  // matching close marker.
  let position = 0;
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.kind === "open") {
      const next = tokens[i + 1];
      if (next && next.kind === "close" && next.name === token.name) {
        const contentStart = token.end;
        const contentEnd = next.start;
        blocks.push(
          buildBlock(token.name, body.slice(contentStart, contentEnd), ++position),
        );
        i += 2;
        continue;
      }
      const contentStart = token.end;
      const contentEnd = next ? next.start : body.length;
      blocks.push(
        buildBlock(token.name, body.slice(contentStart, contentEnd), ++position),
      );
      if (usesPairedSyntax) {
        errors.push(
          `Unclosed paired block '${token.name}': an opening marker exists but its closing marker is missing or misplaced`,
        );
      } else {
        legacyWarnings.push(
          `Block '${token.name}' uses legacy open-ended syntax — add a closing marker '<!-- /@block:${token.name} -->'`,
        );
      }
      i += 1;
      continue;
    }
    errors.push(
      `Closing marker for block '${token.name}' without a matching opening marker`,
    );
    i += 1;
  }

  return {
    blocks,
    body: assembleBody(body, tokens),
    legacyWarnings,
    errors,
  };
}

// Rebuild the body as all text that is NOT part of any block (markers and
// block content are both excluded). A paired block occupies
// [open.start, close.end]; a legacy block occupies [open.start, nextMarker|EOF].
function assembleBody(body, tokens) {
  if (tokens.length === 0) return body.trim();

  const excluded = [];
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.kind === "open") {
      const next = tokens[i + 1];
      if (next && next.kind === "close" && next.name === token.name) {
        excluded.push([token.start, next.end]);
        i += 2;
        continue;
      }
      excluded.push([token.start, next ? next.start : body.length]);
      i += 1;
      continue;
    }
    // Stray closing marker — exclude it too.
    excluded.push([token.start, token.end]);
    i += 1;
  }

  const parts = [];
  let cursor = 0;
  for (const [start, end] of excluded) {
    if (start > cursor) parts.push(body.slice(cursor, start));
    cursor = Math.max(cursor, end);
  }
  if (cursor < body.length) parts.push(body.slice(cursor));
  return parts.join("").trim();
}

/**
 * Extract FAQ items from a `faq` block's Markdown source.
 * Canonical format is `**Q:** … **A:** …`; legacy `### Heading` format is also
 * supported. Empty and duplicate normalized questions are dropped.
 */
export function extractFaq(faqMarkdown) {
  if (!faqMarkdown) return [];

  const items = [];
  const qaRegex = /\*\*Q:\s*(.+?)\*\*\s*([\s\S]*?)(?=\*\*Q:\s*|$)/gi;
  let match;

  while ((match = qaRegex.exec(faqMarkdown)) !== null) {
    items.push({
      question: match[1].trim(),
      answer: match[2].replace(/^\s*\*\*A:\s*\*\*?\s*/i, "").trim(),
    });
  }

  if (items.length === 0) {
    const legacyHeadingRegex = /^###\s+(.+?)\s*\n([\s\S]*?)(?=^###\s+|\s*<!--\s*\/?@block|$)/gm;
    let headingMatch;
    while ((headingMatch = legacyHeadingRegex.exec(faqMarkdown)) !== null) {
      items.push({
        question: headingMatch[1].trim(),
        answer: headingMatch[2].trim(),
      });
    }
  }

  const seen = new Set();
  return items.filter((item) => {
    const q = item.question.replace(/\s+/g, " ").trim().toLowerCase();
    if (!q || !item.answer) return false;
    if (seen.has(q)) return false;
    seen.add(q);
    return true;
  });
}

/**
 * Validate block structure of a Markdown body. Returns a list of hard error
 * strings. Checks: unclosed pairs / stray closers, unknown block names and
 * duplicate singleton blocks. Legacy open-ended markers are NOT errors (they
 * are supported for backward compatibility) — they surface via parseBlocks
 * `legacyWarnings` and can be emitted as validation warnings.
 */
export function validateBlocks(rawContent) {
  const errors = [];
  const body = String(rawContent ?? "");

  if (!body.trim()) {
    return errors;
  }

  const { blocks, errors: parseErrors } = parseBlocks(body);

  for (const err of parseErrors) errors.push(err);

  const seen = new Set();
  for (const block of blocks) {
    if (!BLOCK_NAMES.includes(block.name)) {
      errors.push(`Unknown block name '${block.name}'`);
    }
    if (seen.has(block.name)) {
      errors.push(`Duplicate singleton block '${block.name}'`);
    }
    seen.add(block.name);
  }

  return errors;
}

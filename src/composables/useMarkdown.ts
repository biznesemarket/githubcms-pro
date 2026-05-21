import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
import hljs from "highlight.js";

export interface MarkdownBlocks {
  [name: string]: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MarkdownResult {
  frontmatter: Record<string, unknown>;
  html: string;
  blocks: MarkdownBlocks;
  faqItems: FaqItem[];
  readingTime: number;
}

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch {}
    }
    // Return escaped source instead of empty string for unknown languages
    return markdown.utils.escapeHtml(str);
  },
});

const sanitizerOptions: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "section", "article"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading"],
    "*": ["id", "class", "style"],
  },
  allowedStyles: {
    "*": {
      background: [/.*/], "background-color": [/.*/], "background-image": [/.*/],
      color: [/.*/], opacity: [/.*/], "font-size": [/.*/], "font-weight": [/.*/],
      width: [/.*/], height: [/.*/], "min-height": [/.*/], "min-width": [/.*/],
      "max-width": [/.*/], "max-height": [/.*/], padding: [/.*/], "padding-top": [/.*/],
      "padding-right": [/.*/], "padding-bottom": [/.*/], "padding-left": [/.*/],
      margin: [/.*/], "margin-top": [/.*/], "margin-right": [/.*/], "margin-bottom": [/.*/],
      "margin-left": [/.*/], border: [/.*/], "border-radius": [/.*/],
      "border-top": [/.*/], "border-left": [/.*/], "border-right": [/.*/], "border-bottom": [/.*/],
      display: [/.*/], flex: [/.*/], "flex-wrap": [/.*/], "flex-direction": [/.*/],
      "align-items": [/.*/], "justify-content": [/.*/], gap: [/.*/],
      position: [/.*/], top: [/.*/], left: [/.*/], right: [/.*/], bottom: [/.*/],
      "z-index": [/.*/], overflow: [/.*/], "object-fit": [/.*/], "object-position": [/.*/],
      "box-shadow": [/.*/], "text-align": [/.*/], "text-transform": [/.*/], "text-decoration": [/.*/],
      "letter-spacing": [/.*/], "line-height": [/.*/], transition: [/.*/],
      transform: [/.*/], "backdrop-filter": [/.*/], cursor: [/.*/],
      "-webkit-background-clip": [/.*/], "-webkit-text-fill-color": [/.*/],
    },
  },
};

function extractBlocks(rawContent: string): MarkdownBlocks {
  const blocks: MarkdownBlocks = {};
  const markerRegex = /<!--\s*@block:\s*(\S+)\s*-->/g;
  const parts = rawContent.split(markerRegex);

  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i];
    const content = (parts[i + 1] ?? "").trim();
    if (!content) {
      blocks[name] = "";
      continue;
    }
    const rendered = markdown.render(content);
    blocks[name] = sanitizeHtml(rendered, sanitizerOptions);
  }

  return blocks;
}

function extractFaq(body: string): FaqItem[] {
  const items: FaqItem[] = [];
  const faqBlock = body.match(/(?:###?\s*FAQ|<!--\s*@block:\s*faq\s*-->)([\s\S]*?)(?=###\s|<!--\s*@block:|$)/i);

  if (!faqBlock) return items;

  const faqContent = faqBlock[1] || "";
  const qaRegex = /\*\*Q:\s*(.+?)\*\*\s*([\s\S]*?)(?=\*\*Q:\s*|$)/gi;
  let match;

  while ((match = qaRegex.exec(faqContent)) !== null) {
    items.push({
      question: match[1].trim(),
      answer: match[2].replace(/^\s*\*\*A:\s*\*\*?\s*/i, "").trim(),
    });
  }

  return items;
}

function computeReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function useMarkdown(raw: string): MarkdownResult {
  const parsed = matter(raw);
  const body = parsed.content;

  const blocks = extractBlocks(body);
  const bodyWithoutBlocks = body.replace(/<!--\s*@block:\s*\S+\s*-->/g, "");

  const unsafeHtml = markdown.render(bodyWithoutBlocks);
  const html = sanitizeHtml(unsafeHtml, sanitizerOptions);

  const faqItems = extractFaq(bodyWithoutBlocks);
  const readingTime = computeReadingTime(bodyWithoutBlocks);

  return {
    frontmatter: parsed.data,
    html,
    blocks,
    faqItems,
    readingTime,
  };
}

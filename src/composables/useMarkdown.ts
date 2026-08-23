import matter from "gray-matter";
import {
  parseBlocks,
  extractFaq,
  renderMarkdown,
} from "../markdown/blocks.mjs";
import type {
  MarkdownBlock,
  FaqItem as BlocksFaqItem,
} from "../markdown/blocks.mjs";

export type { MarkdownBlock };

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MarkdownResult {
  frontmatter: Record<string, unknown>;
  html: string;
  blocks: Record<string, MarkdownBlock>;
  faqItems: BlocksFaqItem[];
  readingTime: number;
}

// MarkdownIt config, sanitizer options, extractBlocks and extractFaq live in
// src/markdown/blocks.mjs (single source of truth). This composable is a thin
// wrapper for runtime consumers.

function computeReadingTime(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function useMarkdown(raw: string): MarkdownResult {
  const parsed = matter(raw);

  const result = parseBlocks(parsed.content);

  const blocks: Record<string, MarkdownBlock> = {};
  for (const block of result.blocks) {
    blocks[block.name] = block;
  }

  const faqBlock = result.blocks.find((b) => b.name === "faq");
  const faqItems = extractFaq(faqBlock?.markdown);

  return {
    frontmatter: parsed.data,
    html: renderMarkdown(result.body),
    blocks,
    faqItems,
    readingTime: computeReadingTime(result.body),
  };
}

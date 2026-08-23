export interface MarkdownBlock {
  name: string;
  markdown: string;
  html: string;
  plainText: string;
  position: number;
}

export interface BlockToken {
  kind: "open" | "close";
  name: string;
  start: number;
  end: number;
}

export interface ParseBlocksResult {
  blocks: MarkdownBlock[];
  body: string;
  legacyWarnings: string[];
  errors: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BLOCK_NAMES: readonly string[];

export function renderMarkdown(source: string): string;

export function tokenizeMarkers(rawContent: string): BlockToken[];

export function parseBlocks(rawContent: string): ParseBlocksResult;

export function extractFaq(faqMarkdown?: string): FaqItem[];

export function validateBlocks(rawContent: string): string[];

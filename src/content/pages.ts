import { pages as generatedPages } from "../generated/pages.ts";
import type { ArticleFrontmatter } from "./articles.ts";
import type { MarkdownBlock } from "../markdown/blocks.mjs";

export interface Page {
  path: string;
  frontmatter: ArticleFrontmatter;
  html: string;
  blocks: Record<string, MarkdownBlock>;
  readingTime: number;
  isIndex: boolean;
  rawHtml?: string;
}

export const pages: Page[] = generatedPages.map((page) => ({
  path: page.path,
  frontmatter: {
    ...page.frontmatter,
    tags: [...(page.frontmatter.tags || [])],
    geo: page.frontmatter.geo ? [...page.frontmatter.geo] : undefined,
  },
  html: page.html,
  blocks: { ...page.blocks },
  readingTime: page.readingTime,
  isIndex: page.isIndex ?? false,
  rawHtml: (page as { rawHtml?: string }).rawHtml,
}));

export function findPageBySlug(slug: string): Page | undefined {
  return pages.find((page) => page.frontmatter.slug === slug);
}

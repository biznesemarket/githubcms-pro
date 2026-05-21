import { slugify } from "../utils/slug";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function useToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const headingRegex = /<h([23])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi;
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = Number.parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    items.push({ id, text, level });
  }

  return items;
}

export function addHeadingIds(html: string): string {
  return html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (_, level, attrs, content) => {
      const text = content.replace(/<[^>]+>/g, "").trim();
      const id = slugify(text);
      const existingId = attrs ? attrs.match(/id="([^"]*)"/) : null;
      if (existingId) {
        return `<h${level}${attrs}>${content}</h${level}>`;
      }
      const attrStr = attrs ? `${attrs} id="${id}"` : ` id="${id}"`;
      return `<h${level}${attrStr}>${content}</h${level}>`;
    },
  );
}

/**
 * Single-pass: adds heading IDs AND collects TOC items.
 * Replaces two separate regex passes with one combined traversal.
 */
export function processHeadings(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const result = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (_, level, attrs, content) => {
      const text = content.replace(/<[^>]+>/g, "").trim();
      const id = slugify(text);
      const lvl = Number.parseInt(level, 10);
      toc.push({ id, text, level: lvl });

      const existingId = attrs ? attrs.match(/id="([^"]*)"/) : null;
      if (existingId) {
        return `<h${level}${attrs}>${content}</h${level}>`;
      }
      const attrStr = attrs ? `${attrs} id="${id}"` : ` id="${id}"`;
      return `<h${level}${attrStr}>${content}</h${level}>`;
    },
  );
  return { html: result, toc };
}

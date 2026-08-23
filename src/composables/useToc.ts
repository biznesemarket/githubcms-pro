import { slugify } from "../utils/slug.ts";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Single-pass: adds heading IDs AND collects TOC items for h2/h3 headings.
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

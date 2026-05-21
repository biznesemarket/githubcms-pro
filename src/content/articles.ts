import { articles as generatedArticles } from "../generated/articles";

export interface ArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  category: string;
  tags: string[];
  schema_type: string;
  layout: string;
  cover_image?: string;
  geo?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Article {
  path: string;
  frontmatter: ArticleFrontmatter;
  html: string;
  blocks: Record<string, string>;
  faqItems: FaqItem[];
  readingTime: number;
}

export const articles: Article[] = generatedArticles.map((article) => ({
  path: article.path,
  frontmatter: {
    ...article.frontmatter,
    tags: [...article.frontmatter.tags],
    geo: article.frontmatter.geo ? [...article.frontmatter.geo] : undefined,
  },
  html: article.html,
  blocks: { ...article.blocks },
  faqItems: [...(article.faqItems || [])],
  readingTime: article.readingTime,
}));

export function findArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.frontmatter.slug === slug);
}

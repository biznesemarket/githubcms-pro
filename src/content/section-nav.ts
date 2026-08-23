import { sectionNav as generatedSectionNav } from "../generated/section-nav.ts";

export interface SectionNavArticles {
  [slug: string]: string;
}

export interface SectionNavEntry {
  title: string;
  titleRu: string;
  titleEn: string;
  articles: SectionNavArticles;
}

export interface SectionNavData {
  [sectionId: string]: SectionNavEntry;
}

export const sectionNav: SectionNavData = generatedSectionNav as SectionNavData;

export function getSectionLabel(sectionId: string, locale?: string): string {
  const entry = sectionNav[sectionId];
  if (!entry) return sectionId;
  if (locale === "en") return entry.titleEn;
  return entry.title;
}

export function getArticleLabel(sectionId: string, slug: string): string {
  return sectionNav[sectionId]?.articles?.[slug] ?? slug;
}

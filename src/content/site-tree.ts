import { siteTree as generatedSiteTree } from "../generated/site-tree.ts";

export interface SiteTreePage {
  slug: string;
  title: string;
  description: string;
  isIndex: boolean;
  path: string;
}

export interface SiteTreeSection {
  id: string;
  path: string;
  title: string;
  titleRu: string;
  titleEn: string;
  dropdown: boolean;
  pages: SiteTreePage[];
  component: string | null;
}

export interface SiteTreeData {
  sections: SiteTreeSection[];
}

export const siteTree: SiteTreeData = generatedSiteTree as unknown as SiteTreeData;

export function findSectionById(id: string): SiteTreeSection | undefined {
  return siteTree.sections.find((s) => s.id === id);
}

export function findSectionByPath(path: string): SiteTreeSection | undefined {
  return siteTree.sections.find((s) => s.path === path);
}

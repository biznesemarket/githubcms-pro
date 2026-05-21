import { siteConfig } from "../site.config"

export const sectionSlugMap: Record<string, string> = {
  "1": "section-geo",
  "2": "section-devops",
  "3": "section-content",
}

export function sectionIdToSlug(sectionId: string): string {
  return sectionSlugMap[sectionId] ?? `section-${sectionId}`
}

export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, siteConfig.url).toString()
}

export function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined && v !== ""),
  ) as T
}

export const schemaConfig = {
  enabledDetectors: [
    "article", "faq", "howto", "itemlist", "qapage", "breadcrumb",
    "definedterm", "casestudy", "product", "review", "statistical",
    "table", "video", "planaction", "person", "organization",
    "imageobject", "webapp", "citation", "methodology",
  ],
  maxFaqItems: 10,
  maxHowToSteps: 7,
  maxReviews: 5,
  minDetectorConfidence: 2,
}

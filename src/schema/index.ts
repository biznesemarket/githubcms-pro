import type { JsonLd, PageContext } from "./types"
import { schemaConfig } from "./config"
import * as lib from "./library"
import { allDetectors } from "./detectors/index"

export { lib, allDetectors, schemaConfig }
export type { JsonLd, PageContext }

export function generateSchema(context: PageContext): JsonLd[] {
  const schemas: JsonLd[] = []

  // Organization + LocalBusiness are added by inject-seo.mjs in production
  // Uncomment below for development mode:
  // schemas.push(lib.createOrganization())
  // const lb = lib.createLocalBusiness()
  // if (lb["@type"]) schemas.push(lb)

  // 3. Page-level schema: WebSite for homepage, Article for articles, WebPage for others
  if (context.path === "/" || context.path === "") {
    schemas.push(lib.createWebsite())
  } else if (context.type === "article") {
    schemas.push(lib.createArticle(context))
  } else if (context.type === "product") {
    const prod = lib.createProduct(context)
    if (prod["@type"]) schemas.push(prod)
    if (context.product?.specs?.length) {
      schemas.push(...lib.createPropertyValues(context.product.specs))
    }
    if (context.product?.reviews?.length) {
      const rating = lib.createAggregateRating(context.product.reviews)
      if (rating["@type"]) schemas.push(rating)
    }
    if (context.product?.faq?.length) {
      const faq = lib.createFAQPage(context.product.faq)
      if (faq["@type"]) schemas.push(faq)
    }
  } else {
    schemas.push(lib.createWebPage(context.title, context.description, context.url))
  }

  // 4. Run all detectors on HTML content
  const enabledNames = new Set(schemaConfig.enabledDetectors)
  for (const detector of allDetectors) {
    if (!enabledNames.has(detector.name)) continue
    try {
      const result = detector.detect(context.html || "", context)
      if (result && result.length > 0) {
        schemas.push(...result)
      }
    } catch {
      // Skip detector errors silently
    }
  }

  // 5. BreadcrumbList — handled by inject-seo.mjs in production
  // (uncomment for development mode)
  // const breadcrumb = lib.createBreadcrumb(context.path)
  // if (breadcrumb["@type"]) schemas.push(breadcrumb)

  return schemas
}

export { lib as schemaLibrary }

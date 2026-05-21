import { siteConfig } from "../site.config"
import type { JsonLd, PageContext } from "./types"
import { compact, absoluteUrl, sectionIdToSlug } from "./config"
import { t } from "../i18n"

// ─── Organization ───
export function createOrganization(): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": siteConfig.orgType || "Organization",
    name: siteConfig.orgName ?? siteConfig.name,
    legalName: siteConfig.orgLegalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoUrl || ""),
    image: siteConfig.logoUrl ? absoluteUrl(siteConfig.logoUrl) : siteConfig.defaultImage,
    foundingDate: siteConfig.foundingDate,
    taxID: siteConfig.inn,
    vatID: siteConfig.kpp,
    address: siteConfig.addressLegal ? {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLegal,
      addressCountry: "RU",
    } : undefined,
    contactPoint: compact({
      "@type": "ContactPoint",
      telephone: siteConfig.phone1,
      email: siteConfig.email1,
      contactType: "Customer Service",
      areaServed: siteConfig.areaServed ?? "RU",
      availableLanguage: ["ru"],
    }),
    sameAs: siteConfig.socialLinks?.filter(Boolean),
    ...(((siteConfig as Record<string, unknown>).certifications as string[] | undefined)?.length ? {
      certification: ((siteConfig as Record<string, unknown>).certifications as string[]).map((c: string) => ({
        "@type": "Certification",
        name: c,
        issuedBy: { "@type": "Organization", name: "Росстандарт" },
      })),
    } : {}),
  })
}

// ─── WebSite ───
export function createWebsite(): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    inLanguage: siteConfig.locale ?? "ru",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  })
}

// ─── WebPage ───
export function createWebPage(name: string, desc: string, url: string): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description: desc,
    url,
  })
}

// ─── Article ───
export function createArticle(context: PageContext): JsonLd {
  const article = context.article
  return compact({
    "@context": "https://schema.org",
    "@type": article?.frontmatter?.schema_type || "Article",
    headline: context.title,
    description: context.description,
    abstract: context.description,
    datePublished: article?.frontmatter?.date || context.publishedTime,
    dateModified: article?.frontmatter?.updated || article?.frontmatter?.date || context.modifiedTime,
    author: article?.frontmatter?.author
      ? createPerson({ name: article.frontmatter.author })
      : { "@type": "Person", name: "GitHub CMS Team" },
    image: context.image,
    mainEntityOfPage: context.url,
    keywords: context.tags?.join(", "),
    isAccessibleForFree: true,
    inLanguage: context.locale ?? siteConfig.locale ?? "ru",
  })
}

// ─── Person (E-E-A-T) ───
export function createPerson(author: {
  name: string
  role?: string
  bio?: string
  photo?: string
  certifications?: string[]
  linkedin?: string
  email?: string
}): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.photo,
    affiliation: {
      "@type": "Organization",
      name: siteConfig.orgName ?? siteConfig.name,
    },
    awards: author.certifications?.length ? author.certifications : undefined,
    email: author.email,
    sameAs: author.linkedin,
  })
}

// ─── BreadcrumbList ───
export function createBreadcrumb(path: string): JsonLd {
  const segments = path.replace(/\/+$/, "").split("/").filter(Boolean)
  if (segments.length <= 1) return {}

  const items = segments.map((seg, i) => ({
    "@type": "ListItem" as const,
    position: i + 2,  // Home is position 1
    name: breadcrumbName(seg),
    item: absoluteUrl(`/${segments.slice(0, i + 1).join("/")}/`),
  }))

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumb.homeCap, item: siteConfig.url },
      ...items,
    ],
  }
}

function breadcrumbName(seg: string): string {
  switch (seg) {
    case "blog": return t.breadcrumb.blog
    case "category": return t.breadcrumb.category
    case "tag": return t.breadcrumb.tag
    case "templates": return t.breadcrumb.templates
    case "about": return t.breadcrumb.about
    case "about-guide": return "Руководство и команда"
    case "about-mission": return "Миссия и ценности"
    case "about-careers": return "Вакансии и карьера"
    case "about-history": return "История компании"
    case "about-reviews": return "Отзывы и письма"
    case "about-certificates": return "Сертификаты и реквизиты"
    case "about-press": return "Пресс-центр"
    case "about-partners": return "Партнёрская программа"
    case "contact": return t.breadcrumb.contact
    case "section-geo": return t.razdel.sections[1].title
    case "section-devops": return t.razdel.sections[2].title
    case "section-content": return t.razdel.sections[3].title
    case "shop": return "Магазин"
    case "shop-section-1": return "Демо раздел товара 1"
    case "shop-section-2": return "Демо раздел товара 2"
    case "shop-section-3": return "Демо раздел товара 3"
    case "shop-section-4": return "Демо раздел товара 4"
    case "shop-section-5": return "Демо раздел товара 5"
    default: return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  }
}

// ─── FAQPage ───
export function createFAQPage(faqItems: { question: string; answer: string }[]): JsonLd {
  if (!faqItems.length) return {}
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

// ─── HowTo ───
export function createHowTo(name: string, steps: { name: string; text: string; image?: string }[]): JsonLd {
  if (!steps.length) return {}
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step, i) => compact({
      "@type": "HowToStep",
      position: String(i + 1),
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  }
}

// ─── ItemList ───
export function createItemList(items: { name: string; description?: string }[]): JsonLd {
  if (!items.length) return {}
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

// ─── QAPage ───
export function createQAPage(question: string, answer: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    },
  }
}

// ─── DefinedTerm ───
export function createDefinedTerm(name: string, definition: string, sameAs?: string): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description: definition,
    sameAs,
  })
}

// ─── CaseStudy ───
export function createCaseStudy(headline: string, client: string, problem: string, solution: string, result: string): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    headline,
    about: { "@type": "Organization", name: client },
    problem,
    solution,
    result,
  })
}

// ─── Product + Offer ───
export function createProduct(context: PageContext): JsonLd {
  const p = context.product
  if (!p) return {}
  return compact({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description || context.description,
    image: p.image || context.image,
    sku: p.id,
    offers: {
      "@type": "Offer",
      price: String(p.price),
      priceCurrency: p.currency || "RUB",
      availability: "https://schema.org/InStock",
      url: context.url,
    },
  })
}

// ─── PropertyValue (specs) ───
export function createPropertyValues(specs: { name: string; value: string }[]): JsonLd[] {
  return specs.map(s => ({
    "@context": "https://schema.org",
    "@type": "PropertyValue",
    name: s.name,
    value: s.value,
  }))
}

// ─── AggregateRating + Review ───
export function createAggregateRating(reviews: { author: string; rating: number; text: string; date: string }[]): JsonLd {
  if (!reviews.length) return {}
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  return compact({
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    bestRating: "5",
    worstRating: "1",
    ratingCount: String(reviews.length),
    reviewCount: String(reviews.length),
    review: reviews.map(r => compact({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating) },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  })
}

// ─── StatisticalVariable ───
export function createStatisticalVariable(name: string, value: number, unit: string, citation: string, citationUrl?: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "StatisticalVariable",
    name,
    value: { "@type": "QuantitativeValue", value, unitText: unit },
    citation: compact({
      "@type": "Citation",
      text: citation,
      url: citationUrl,
    }),
  }
}

// ─── Table ───
export function createTable(name: string, headers: string[], rows: string[][]): JsonLd {
  if (!rows.length) return {}
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    name,
    ...(headers.length ? { about: headers.join(" vs ") } : {}),
  }
}

// ─── VideoObject ───
export function createVideoObject(name: string, url: string, desc: string, thumbnail?: string, duration?: string): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description: desc,
    thumbnailUrl: thumbnail,
    uploadDate: new Date().toISOString().slice(0, 10),
    duration,
    contentUrl: url,
  })
}

// ─── ImageObject ───
export function createImageObject(name: string, url: string, desc: string, caption?: string): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name,
    url,
    description: desc,
    contentUrl: url,
    encodingFormat: "image/png",
    caption,
  })
}

// ─── PlanAction ───
export function createPlanAction(name: string, phases: { phase: string; period: string; actions: string; results: string }[]): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "PlanAction",
    name,
    step: phases.map((p, i) => ({
      "@type": "OrganizeAction",
      position: i + 1,
      name: p.phase,
      startTime: p.period,
      description: p.actions,
      result: p.results,
    })),
  })
}

// ─── Thing (Problem → Solution → Result) ───
export function createThing(name: string, problem: string, solution: string, result: string): JsonLd {
  return compact({
    "@context": "https://schema.org",
    "@type": "Thing",
    name,
    description: `Problem: ${problem}. Solution: ${solution}. Result: ${result}.`,
  })
}

// ─── ScholarlyArticle + Citation ───
export function createCitations(sources: { text: string; url?: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    citation: sources.map(s => compact({
      "@type": "Citation",
      text: s.text,
      url: s.url,
    })),
  }
}

// ─── LocalBusiness ───
export function createLocalBusiness(): JsonLd {
  const stores = siteConfig.stores ?? []
  if (stores.length === 0) return {}

  if (stores.length === 1) {
    const s = stores[0]
    return compact({
      "@context": "https://schema.org",
      "@type": s.storeType ?? "LocalBusiness",
      name: s.name,
      image: s.image,
      address: { "@type": "PostalAddress", streetAddress: s.address, addressCountry: "RU" },
      geo: s.lat && s.lng ? { "@type": "GeoCoordinates", latitude: Number.parseFloat(s.lat), longitude: Number.parseFloat(s.lng) } : undefined,
      telephone: s.phone,
      openingHours: s.hours,
      priceRange: siteConfig.priceRange,
      currenciesAccepted: siteConfig.currenciesAccepted,
      paymentAccepted: siteConfig.paymentAccepted,
    })
  }

  return compact({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.orgName ?? siteConfig.name,
    subOrganization: stores.map(s => compact({
      "@type": s.storeType ?? "LocalBusiness",
      name: s.name,
      image: s.image,
      address: { "@type": "PostalAddress", streetAddress: s.address, addressCountry: "RU" },
      geo: s.lat && s.lng ? { "@type": "GeoCoordinates", latitude: Number.parseFloat(s.lat), longitude: Number.parseFloat(s.lng) } : undefined,
      telephone: s.phone,
      openingHours: s.hours,
    })),
  })
}

import type { JsonLd, PageContext, Detector } from "../types"
import * as lib from "../library"

// ─── DETECTOR: FAQ ───
export const faqDetector: Detector = {
  name: "faq",
  priority: 1,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const items: { question: string; answer: string }[] = []

    // Pattern 1: Bootstrap accordion FAQ
    const accordionRegex = /<button[^>]*data-bs-[^>]*>[^<]*([\s\S]*?)<\/button>[\s\S]*?<div[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi
    let m: RegExpExecArray | null
    while ((m = accordionRegex.exec(html)) !== null) {
      const q = m[1].replace(/<[^>]+>/g, "").trim()
      const a = m[2].replace(/<[^>]+>/g, "").trim()
      if (q && a && q.length > 5 && a.length > 10) items.push({ question: q, answer: a })
    }

    // Pattern 2: Markdown FAQ **Q:** / **A:**
    const mdFaqRegex = /\*\*Q:\s*(.+?)\*\*\s*([\s\S]*?)(?=\*\*Q:\s*|<\/)/gi
    while ((m = mdFaqRegex.exec(html)) !== null) {
      const q = m[1].trim()
      const a = m[2].replace(/^\s*\*\*A:\s*\*\*?\s*/i, "").replace(/<[^>]+>/g, "").trim()
      if (q && a && q.length > 5 && a.length > 15) items.push({ question: q, answer: a })
    }

    // Pattern 3: FAQ section with h2/h3 + p pairs
    if (items.length < 3) {
      const faqSectionRegex = /<section[^>]*id="faq"[^>]*>([\s\S]*?)<\/section>/i
      const faqSection = html.match(faqSectionRegex)?.[1]
      if (faqSection) {
        const qaRegex = /<(h[34])[^>]*>([^<]+)<\/\1>\s*<p[^>]*>([\s\S]*?)<\/p>/gi
        while ((m = qaRegex.exec(faqSection)) !== null) {
          const q = m[2].trim()
          const a = m[3].replace(/<[^>]+>/g, "").trim()
          if (q && a && q.length > 5 && a.length > 15 && !items.some(i => i.question === q)) {
            items.push({ question: q, answer: a })
          }
        }
      }
    }

    if (items.length >= 3) return [lib.createFAQPage(items)]
    return null
  },
}

// ─── DETECTOR: HowTo ───
export const howtoDetector: Detector = {
  name: "howto",
  priority: 2,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const steps: { name: string; text: string }[] = []

    // Pattern 1: step-card with step-number
    const stepCardRegex = /<div[^>]*class="[^"]*step-number[^"]*"[^>]*>([^<]+)<\/div>\s*(?:<h[34][^>]*>([^<]+)<\/h[34]>\s*)?<p[^>]*>([^<]+)<\/p>/gi
    let m: RegExpExecArray | null
    while ((m = stepCardRegex.exec(html)) !== null) {
      const name = m[2]?.trim() || `Шаг ${m[1].trim()}`
      steps.push({ name, text: m[3].trim() })
    }

    // Pattern 2: section with id="how-it-works"
    if (steps.length < 3) {
      const section = html.match(/<section[^>]*id="how-it-works"[^>]*>([\s\S]*?)<\/section>/i)?.[1]
      if (section) {
        const h4pRegex = /<h[34][^>]*>([^<]+)<\/h[34]>\s*<p[^>]*>([^<]+)<\/p>/gi
        while ((m = h4pRegex.exec(section)) !== null) {
          steps.push({ name: m[1].trim(), text: m[2].trim() })
        }
      }
    }

    if (steps.length >= 3) {
      const title = html.match(/<h[12][^>]*>([^<]*инструкц|[^<]*как |[^<]*How |[^<]*этап[^<]*)<\/h[12]>/i)?.[1]?.trim() || "Пошаговая инструкция"
      return [lib.createHowTo(title, steps)]
    }
    return null
  },
}

// ─── DETECTOR: ItemList (Key Facts) ───
export const itemlistDetector: Detector = {
  name: "itemlist",
  priority: 3,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const items: { name: string; description?: string }[] = []

    // Pattern 1: fact-card with fact-number + fact-text
    const factRegex = /<div[^>]*class="[^"]*fact-number[^"]*"[^>]*>([^<]+)<\/div>\s*<div[^>]*class="[^"]*fact-text[^"]*"[^>]*>([^<]+)<\/div>/gi
    let m: RegExpExecArray | null
    while ((m = factRegex.exec(html)) !== null) {
      items.push({ name: `${m[1].trim()} — ${m[2].trim()}` })
    }

    // Pattern 2: facts-grid with cards
    if (items.length < 3) {
      const gridRegex = /<div[^>]*class="[^"]*facts-grid[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      const grid = html.match(gridRegex)?.[1]
      if (grid) {
        const cardRegex = /<div[^>]*class="[^"]*fact-card[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi
        while ((m = cardRegex.exec(grid)) !== null) {
          const text = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
          if (text.length > 10) items.push({ name: text.slice(0, 120) })
        }
      }
    }

    if (items.length >= 3) return [lib.createItemList(items)]
    return null
  },
}

// ─── DETECTOR: QAPage (Featured Snippet) ───
export const qapageDetector: Detector = {
  name: "qapage",
  priority: 4,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const results: JsonLd[] = []

    // Pattern: featured-snippet or block-answer class
    const featuredRegex = /<div[^>]*class="[^"]*(featured-snippet|block-answer)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
    let m: RegExpExecArray | null
    while ((m = featuredRegex.exec(html)) !== null) {
      const text = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      // Try to find a question above this block
      const before = html.substring(0, m.index)
      const headingMatch = before.match(/<h[234][^>]*>([^<]+\?[^<]*)<\/h[234]>/i)
      const question = headingMatch?.[1]?.trim() || html.match(/<h[12][^>]*>([^<]+)<\/h[12]>/i)?.[1]?.trim() || "Что это?"
      if (text.length > 50) {
        results.push(lib.createQAPage(question, text.slice(0, 500)))
      }
    }

    return results.length > 0 ? results : null
  },
}

// ─── DETECTOR: DefinedTerm ───
export const definedtermDetector: Detector = {
  name: "definedterm",
  priority: 7,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const results: JsonLd[] = []

    // Pattern: <h3>Term</h3> followed by <p>definition</p> in a section
    const termRegex = /<h3[^>]*>([^<]{5,60})<\/h3>\s*<p[^>]*>([^<]{30,300})<\/p>/gi
    let m: RegExpExecArray | null
    let count = 0
    while ((m = termRegex.exec(html)) !== null && count < 5) {
      const term = m[1].trim()
      const def = m[2].replace(/<[^>]+>/g, "").trim()
      if (term && def && !/^[0-9.\s]+$/.test(term)) {
        results.push(lib.createDefinedTerm(term, def))
        count++
      }
    }

    return results.length >= 1 ? results : null
  },
}

// ─── DETECTOR: Table (Comparisons) ───
export const tableDetector: Detector = {
  name: "table",
  priority: 10,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const tables = html.match(/<table[^>]*>([\s\S]*?)<\/table>/gi)
    if (!tables || tables.length === 0) return null

    const results: JsonLd[] = []
    for (const tbl of tables) {
      const headers: string[] = []
      const headerRegex = /<th[^>]*>([^<]+)<\/th>/gi
      let m: RegExpExecArray | null
      while ((m = headerRegex.exec(tbl)) !== null) headers.push(m[1].trim())

      if (headers.length >= 2) {
        const name = `Сравнение: ${headers.slice(1, 4).join(" vs ")}`
        results.push(lib.createTable(name, headers, []))
      }
    }

    return results.length > 0 ? results : null
  },
}

// ─── DETECTOR: Video ───
export const videoDetector: Detector = {
  name: "video",
  priority: 13,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const results: JsonLd[] = []
    const videoRegex = /<(?:iframe[^>]+src="(https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|vimeo\.com)[^"]*)"[^>]*>|<video[^>]*src="([^"]*)"[^>]*>)/gi
    let m: RegExpExecArray | null
    while ((m = videoRegex.exec(html)) !== null) {
      const url = m[1] || m[2]
      if (url) {
        results.push(lib.createVideoObject("Видео", url, "Видео на странице"))
      }
    }
    return results.length > 0 ? results : null
  },
}

// ─── DETECTOR: Person (E-E-A-T author) ───
export const personDetector: Detector = {
  name: "person",
  priority: 5,
  detect(_html: string, ctx: PageContext): JsonLd[] | null {
    const article = ctx.article
    if (!article?.frontmatter?.author) return null

    const extra = ctx as unknown as Record<string, unknown>
    return [lib.createPerson({
      name: article.frontmatter.author,
      role: extra.authorRole as string | undefined,
      bio: extra.authorExperience as string | undefined,
      certifications: extra.authorCerts as string[] | undefined,
      linkedin: extra.authorLinkedin as string | undefined,
    })]
  },
}

// ─── DETECTOR: Statistical ───
export const statisticalDetector: Detector = {
  name: "statistical",
  priority: 11,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    // Strip HTML tags first for clean text analysis
    const cleanText = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    const results: JsonLd[] = []
    // Match: "X% ... (Source, YEAR)" or "X% ... по данным Source"
    const statRegex = /(\d+(?:[.,]\d+)?)\s*%(?:\s+([^.]{10,150}?(?:\([^)]*\d{4}[^)]*\)|по данным\s+[^.]+)))/gi
    let m: RegExpExecArray | null
    let count = 0
    while ((m = statRegex.exec(cleanText)) !== null && count < 3) {
      const value = Number.parseFloat(m[1].replace(",", "."))
      const text = m[2].trim().replace(/\s+/g, " ")
      if (value > 0 && value <= 100 && text.length > 10 && text.length < 200) {
        results.push(lib.createStatisticalVariable(text.slice(0, 80), value, "percent", text.slice(0, 120)))
        count++
      }
    }
    return results.length > 0 ? results : null
  },
}

// ─── DETECTOR: CaseStudy ───
export const casestudyDetector: Detector = {
  name: "casestudy",
  priority: 9,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const hasCase = /кейс|case\s*study|внедрен|миграц/i.test(html)
    if (!hasCase) return null

    const clientMatch = html.match(/(?:клиент|заказчик|компани[яи]|customer|client)[:\s]*"?([А-ЯA-Z][^"<,\n]{3,50})/i)
    const problemMatch = html.match(/(?:проблем[аы]|problem)[:\s]([^.<\n]{15,150})/i)
    const resultMatch = html.match(/(?:результат|result|итог|экономия|сократили|увеличили)[:\s]*([^.<\n]{10,150})/i)

    if (!clientMatch && !problemMatch) return null

    return [lib.createCaseStudy(
      "Кейс внедрения",
      clientMatch?.[1]?.trim() || "Клиент",
      problemMatch?.[1]?.trim() || "Оптимизация процесса",
      "Решение было внедрено",
      resultMatch?.[1]?.trim() || "Достигнут положительный результат",
    )]
  },
}

// ─── DETECTOR: Product (for shop pages) ───
export const productDetector: Detector = {
  name: "product",
  priority: 1,
  detect(_html: string, ctx: PageContext): JsonLd[] | null {
    if (!ctx.product) return null

    const schemas: JsonLd[] = []
    schemas.push(lib.createProduct(ctx))

    if (ctx.product.specs?.length) {
      schemas.push(...lib.createPropertyValues(ctx.product.specs))
    }

    if (ctx.product.reviews?.length) {
      const rating = lib.createAggregateRating(ctx.product.reviews)
      if (rating["@type"]) schemas.push(rating)
    }

    if (ctx.product.faq?.length) {
      const faq = lib.createFAQPage(ctx.product.faq)
      if (faq["@type"]) schemas.push(faq)
    }

    return schemas.length > 0 ? schemas : null
  },
}

// ─── DETECTOR: ImageObject ───
export const imageobjectDetector: Detector = {
  name: "imageobject",
  priority: 12,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const results: JsonLd[] = []
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"[^>]*>/gi
    let m: RegExpExecArray | null
    let count = 0
    while ((m = imgRegex.exec(html)) !== null && count < 3) {
      const src = m[1]
      const alt = m[2] || "Изображение"
      if (src && alt.length > 5 && src.startsWith("http")) {
        const caption = html.substring(Math.max(0, m.index - 200), m.index).match(/<figcaption[^>]*>([^<]+)<\/figcaption>/i)?.[1]
        results.push(lib.createImageObject(alt.slice(0, 80), src, alt.slice(0, 120), caption?.trim()))
        count++
      }
    }
    return results.length > 0 ? results : null
  },
}

// ─── DETECTOR: PlanAction (Roadmap) ───
export const planactionDetector: Detector = {
  name: "planaction",
  priority: 14,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const phases: { phase: string; period: string; actions: string; results: string }[] = []
    // Match: "Phase I:", "Q1-Q2 2025", "Этап 1:", followed by text
    const phaseRegex = /(?:Phase\s+|Этап\s+|Q[1-4]\s*[-–]\s*Q[1-4]\s*)(\d{4})?[:\s]*([^<]{10,80})/gi
    let m: RegExpExecArray | null
    while ((m = phaseRegex.exec(html)) !== null) {
      const name = m[2]?.trim() || m[0].trim()
      if (name.length > 5) {
        phases.push({ phase: name, period: m[1] || "2025-2026", actions: name, results: "Результат запланирован" })
      }
    }
    if (phases.length >= 2) {
      return [lib.createPlanAction("Roadmap", phases)]
    }
    return null
  },
}

// ─── DETECTOR: Standalone Reviews ───
export const reviewDetector: Detector = {
  name: "review",
  priority: 8,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const reviews: { author: string; rating: number; text: string; date: string }[] = []
    // Pattern: ★★★★★ + name + text
    const starRegex = /(★{1,5})\s*☆{0,4}/g
    const starMatches = [...html.matchAll(starRegex)]
    for (const sm of starMatches) {
      const rating = sm[1].length
      const after = html.substring(sm.index + sm[0].length, sm.index + sm[0].length + 400)
      const nameMatch = after.match(/([А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+)/)
      const textMatch = after.match(/[^.?!]{20,150}[.!?]/)
      if (nameMatch && textMatch) {
        reviews.push({ author: nameMatch[1], rating, text: textMatch[0].trim(), date: new Date().toISOString().slice(0, 10) })
      }
    }
    if (reviews.length >= 1) {
      const rating = lib.createAggregateRating(reviews)
      if (rating["@type"]) return [rating]
    }
    return null
  },
}

// ─── DETECTOR: WebApplication (Calculator/Tool) ───
export const webappDetector: Detector = {
  name: "webapp",
  priority: 15,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const hasCalculator = /калькулятор|calculator|вычислит|расчёт|конфигуратор/i.test(html)
    if (!hasCalculator) return null
    const nameMatch = html.match(/<h[12][^>]*>([^<]*калькулятор[^<]*|[^<]*calculator[^<]*)<\/h[12]>/i)
    return [{
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: nameMatch?.[1]?.trim() || "Калькулятор",
      applicationCategory: "UtilityApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
      operatingSystem: "Web",
    }]
  },
}

// ─── DETECTOR: ScholarlyArticle + Citations (Sources) ───
export const citationDetector: Detector = {
  name: "citation",
  priority: 16,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const sources: { text: string; url?: string }[] = []
    // Match: "[Source Name, YEAR]" or "(Author, YEAR)" patterns
    const citeRegex = /\[([^\]]{5,80})\]/g
    let m: RegExpExecArray | null
    let count = 0
    while ((m = citeRegex.exec(html)) !== null && count < 5) {
      const text = m[1].replace(/<[^>]+>/g, "").trim()
      if (/\d{4}/.test(text) && text.length > 10) {
        sources.push({ text })
        count++
      }
    }
    // Match: "According to [Source]" or "по данным [Source]"
    if (sources.length < 2) {
      const dataRegex = /(?:согласно|по данным|according to|based on)\s+([^.<]{10,80})/gi
      while ((m = dataRegex.exec(html)) !== null) {
        sources.push({ text: m[1].trim() })
      }
    }
    if (sources.length >= 2) return [lib.createCitations(sources)]
    return null
  },
}

// ─── DETECTOR: Methodology ("How We Know") ───
export const methodologyDetector: Detector = {
  name: "methodology",
  priority: 17,
  detect(html: string, _ctx: PageContext): JsonLd[] | null {
    const hasMethodology = /методолог|methodology|как мы |how we |источник|первичный опыт/i.test(html)
    if (!hasMethodology) return null
    // Extract methodology text
    const methMatch = html.match(/(?:методология|methodology|как мы (?:это |проверя|созда|исследу))[:\s]+([^.<]{30,300})/i)
    if (!methMatch) return null
    return [{
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      name: _ctx.title,
      methodology: methMatch[1].replace(/<[^>]+>/g, "").trim(),
      inLanguage: _ctx.locale || "ru",
    }]
  },
}

// ─── ALL DETECTORS (ordered by priority) ───
export const allDetectors: Detector[] = [
  faqDetector,
  productDetector,
  howtoDetector,
  itemlistDetector,
  qapageDetector,
  personDetector,
  definedtermDetector,
  reviewDetector,
  casestudyDetector,
  tableDetector,
  statisticalDetector,
  imageobjectDetector,
  videoDetector,
  planactionDetector,
  webappDetector,
  citationDetector,
  methodologyDetector,
]

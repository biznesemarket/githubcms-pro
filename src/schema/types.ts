import type { Article } from "../content/articles"

export type JsonLd = Record<string, unknown>

export interface PageContext {
  url: string
  path: string
  title: string
  description: string
  html: string
  type?: "website" | "article" | "product"
  image?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  locale?: string
  article?: Article
  product?: {
    id: string
    name: string
    price: number
    currency?: string
    image?: string
    description?: string
    specs?: { name: string; value: string }[]
    reviews?: { author: string; rating: number; text: string; date: string }[]
    faq?: { question: string; answer: string }[]
  }
}

export interface DetectorResult {
  type: string
  schemas: JsonLd[]
}

export interface Detector {
  name: string
  priority: number
  detect(html: string, context: PageContext): JsonLd[] | null
}

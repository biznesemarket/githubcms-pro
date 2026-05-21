import { useHead, useServerSeoMeta } from "@unhead/vue";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { siteConfig } from "../site.config";
import { generateSchema } from "../schema";
import type { Article } from "../content/articles";

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  robots?: string;
  locale?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  article?: Article;
}

function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, siteConfig.url).toString();
}

export function useSeo(input: MaybeRefOrGetter<SeoInput>) {
  const resolved = computed(() => {
    const value = toValue(input);
    const title = value.title;
    const description = value.description;
    const canonical = absoluteUrl(value.path);
    const image = value.image ?? siteConfig.defaultImage;
    const type = value.type ?? "website";

    // Merge: user-provided jsonLd + always append Organization + LocalBusiness
    const userJsonLd = value.jsonLd ?? generateSchema({
      url: canonical,
      path: value.path,
      title: value.title,
      description: value.description,
      html: "",
      type,
      image,
      publishedTime: value.publishedTime,
      modifiedTime: value.modifiedTime,
      tags: value.tags,
      article: value.article,
    });
    const merged = Array.isArray(userJsonLd) ? userJsonLd : [userJsonLd];

    return { ...value, title, description, canonical, image, type, jsonLd: merged };
  });

  useHead({
    title: () => resolved.value.title,
    link: [{ rel: "canonical", href: () => resolved.value.canonical }],
  });

  useServerSeoMeta({
    description: () => resolved.value.description,
    robots: () => resolved.value.robots ?? "index,follow",
    ogSiteName: siteConfig.name,
    ogLocale: () => resolved.value.locale ?? siteConfig.locale ?? "ru",
    ogType: () => resolved.value.type,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogUrl: () => resolved.value.canonical,
    ogImage: () => resolved.value.image,
    twitterCard: "summary_large_image",
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => resolved.value.image,
    articlePublishedTime: () => resolved.value.publishedTime,
    articleModifiedTime: () => resolved.value.modifiedTime,
  });
}

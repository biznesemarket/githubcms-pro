import type { RouteRecordRaw } from "vue-router";
import { articles } from "./content/articles";
import { pages } from "./content/pages";
import ArticlePage from "./pages/ArticlePage.vue";
import BlogIndex from "./pages/BlogIndex.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import HomePage from "./pages/HomePage.vue";
import PageView from "./pages/PageView.vue";
import TagPage from "./pages/TagPage.vue";
import TemplatesPage from "./pages/TemplatesPage.vue";
import TemplatePage from "./pages/TemplatePage.vue";
import { slugify } from "./utils/slug";

const isPro = import.meta.env.VITE_EDITION === "pro";
const freeTemplateSlugs = ["purple-geo-lite"];
const proTemplateSlugs = [
  "purple-geo-lite",
  "purple-geo",
  "tech-azure",
  "emerald-green",
  "crimson-bold",
  "amber-warm",
  "indigo-deep",
  "rose-elegant",
  "ocean-breeze",
  "sunset-orange",
  "midnight-noir",
  "spring-garden",
  "arctic-frost",
  "golden-hour",
  "cyber-neon",
  "monaco-sky",
  "velvet-night",
  "forest-trail",
  "arctic-dusk",
  "coral-reef",
  "steel-grey",
  "mint-fresh",
  "chocolate-luxe",
  "graphite-mono",
  "sakura-pink",
  "violet-dusk",
  "lemon-zest",
  "storm-cloud",
  "peach-blossom",
  "deep-ocean",
];
const templateSlugs = isPro ? proTemplateSlugs : freeTemplateSlugs;
const templateListPages = isPro ? 3 : 1;

const uniqueCategories = [
  ...new Set(articles.map((a) => slugify(a.frontmatter.category))),
];

const uniqueTags = [
  ...new Set(articles.flatMap((a) => a.frontmatter.tags.map((t) => slugify(t)))),
];

export const routes: RouteRecordRaw[] = [
  // ── COMMON routes (Free + Pro) ──
  { path: "/", component: HomePage },
  { path: "/home/1/", redirect: "/" },
  { path: "/blog/", component: BlogIndex },
  ...Array.from({ length: Math.max(0, Math.ceil(articles.length / 5) - 1) }, (_, i) => ({
    path: `/blog/page/${i + 2}/`, component: BlogIndex, props: { page: i + 2 },
  })),
  ...articles.map(article => ({
    path: `/blog/${article.frontmatter.slug}/`, component: ArticlePage, props: { slug: article.frontmatter.slug },
  })),
  ...uniqueCategories.map(slug => ({
    path: `/category/${slug}/`, component: CategoryPage, props: { slug },
  })),
  ...uniqueTags.map(slug => ({
    path: `/tag/${slug}/`, component: TagPage, props: { slug },
  })),
  ...pages.map(page => ({
    path: `/${page.frontmatter.slug}/`, component: PageView, props: { slug: page.frontmatter.slug },
  })),
  { path: "/templates/", component: TemplatesPage },
  ...Array.from({ length: templateListPages - 1 }, (_, i) => ({
    path: `/templates/page/${i + 2}/`, component: TemplatesPage, props: { page: i + 2 },
  })),
  ...templateSlugs.map(slug => ({
    path: `/templates/${slug}/`, component: TemplatePage, props: { slug },
  })),

  // ── PRO-only routes ──
  ...(isPro ? [
    // Home variants
    { path: "/home/2/", component: () => import("./pages/HomeVariant2.vue") },
    { path: "/home/3/", component: () => import("./pages/HomeVariant3.vue") },
    { path: "/home/4/", component: () => import("./pages/HomeVariant4.vue") },
    { path: "/home/5/", component: () => import("./pages/HomeVariant5.vue") },
    // Sections
    { path: "/section-geo/", component: () => import("./pages/RazdelPage.vue"), props: { section: "1" } },
    { path: "/section-devops/", component: () => import("./pages/RazdelPage.vue"), props: { section: "2" } },
    { path: "/section-content/", component: () => import("./pages/RazdelPage.vue"), props: { section: "3" } },
    ...["geo-rukovodstvo","json-ld-gajd","e-e-a-t-signaly","featured-snippets","seo-vs-geo"].map(s => ({
      path: `/section-geo/${s}/`, component: () => import("./pages/SectionArticlePage.vue"), props: { section: "1", slug: s },
    })),
    ...["deploj-obzor","vps-i-nginx","github-actions","bezopasnost","monitoring"].map(s => ({
      path: `/section-devops/${s}/`, component: () => import("./pages/SectionArticlePage.vue"), props: { section: "2", slug: s },
    })),
    ...["markdown-obzor","yaml-frontmatter","prompt-shablony","ai-kontent","migracija-s-wordpress"].map(s => ({
      path: `/section-content/${s}/`, component: () => import("./pages/SectionArticlePage.vue"), props: { section: "3", slug: s },
    })),
    // Payment
    { path: "/payment/success/", component: () => import("./pages/PaymentSuccess.vue") },
    // Shop
    { path: "/shop/", component: () => import("./pages/ShopPage.vue") },
    ...["shop-section-1","shop-section-2","shop-section-3","shop-section-4","shop-section-5"].map((s, i) => ({
      path: `/shop/${s}/`, component: () => import("./pages/ShopSectionPage.vue"), props: { section: String(i + 1) },
    })),
    ...([
      ["galaxy-s25-ultra","macbook-air-m4","ipad-pro-m4","airpods-pro-3","watch-ultra-2","power-bank-20000"],
      ["lg-side-by-side","bosch-washing","xiaomi-x10","samsung-microwave","electrolux-stove","bosch-dishwasher"],
      ["sofa-milan","table-loft","ergo-chair","wardrobe-premium","bed-oslo","dresser-scandi"],
      ["kettler-tr1","trek-bike","salomon-tent","nike-zoom","protein-on","garmin-venu"],
      ["svetocopy-paper","parker-jotter","desk-organizer","hp-laserjet","epson-projector","rexel-shredder"],
    ] as const).flatMap((slugs, si) =>
      slugs.map(slug => ({
        path: `/shop/shop-section-${si + 1}/${slug}/`, component: () => import("./pages/ShopProductPage.vue"), props: { section: String(si + 1), slug },
      }))
    ),
  ] : []),
  // ── ACCOUNT (Pro-only demo portal) ──
  ...(isPro ? [
    { path: "/account/", component: () => import("./pages/AccountPage.vue") },
    { path: "/account/plan/", component: () => import("./pages/AccountPlan.vue") },
    { path: "/account/downloads/", component: () => import("./pages/AccountDownloads.vue") },
  ] : []),
];

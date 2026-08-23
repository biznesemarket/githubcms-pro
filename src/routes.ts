import type { RouteRecordRaw } from "vue-router";
import { articles } from "./content/articles.ts";
import { pages } from "./content/pages.ts";
import { siteTree } from "./content/site-tree.ts";
import ArticlePage from "./pages/ArticlePage.vue";
import BlogIndex from "./pages/BlogIndex.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";
import PageView from "./pages/PageView.vue";
import TagPage from "./pages/TagPage.vue";
import TemplatesPage from "./pages/TemplatesPage.vue";
import TemplatePage from "./pages/TemplatePage.vue";
import { slugify } from "./utils/slug.ts";

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

// Non-section content folders — excluded from dynamic section route generation
const NON_SECTION = new Set(["home", "about", "contact", "blog", "shop", "templates", "payment", "privacy"]);

// Build section routes dynamically from site-tree
function buildSectionRoutes(): RouteRecordRaw[] {
  const sectionRoutes: RouteRecordRaw[] = [];
  const articleSections = siteTree.sections.filter(
    (s) => !NON_SECTION.has(s.id) && s.pages.length > 0,
  );
  for (const section of articleSections) {
    const indexSlug = section.pages.find((p) => p.isIndex)?.slug ?? section.id;
    sectionRoutes.push({
      path: section.path,
      component: PageView,
      props: { slug: indexSlug },
    });
    for (const page of section.pages) {
      if (page.isIndex) continue;
      sectionRoutes.push({
        path: `${section.path}${page.slug}/`,
        component: PageView,
        props: { slug: page.slug },
      });
    }
  }
  return sectionRoutes;
}

// Build shop routes dynamically from pages (folder-based content)
function buildShopRoutes(): RouteRecordRaw[] {
  const shopRoutes: RouteRecordRaw[] = [];

  shopRoutes.push({
    path: "/shop/",
    component: () => import("./pages/ShopPage.vue"),
  });

  const shopSections = pages.filter(
    (p) => (p as any).frontmatter?.layout === "section" && (p as any).frontmatter?.section === "shop",
  );
  for (const sec of shopSections) {
    shopRoutes.push({
      path: `/shop/${sec.frontmatter.slug}/`,
      component: () => import("./pages/ShopSectionPage.vue"),
      props: { section: sec.frontmatter.slug },
    });
  }

  const products = pages.filter(
    (p) => (p as any).frontmatter?.layout === "product",
  );
  for (const prod of products) {
    const sec = (prod as any).frontmatter?.section || "";
    shopRoutes.push({
      path: `/shop/${sec}/${prod.frontmatter.slug}/`,
      component: () => import("./pages/ShopProductPage.vue"),
      props: { section: sec, slug: prod.frontmatter.slug },
    });
  }

  return shopRoutes;
}

export const routes: RouteRecordRaw[] = [
  // ── COMMON routes (Free + Pro) ──
  { path: "/", component: PageView, props: { slug: "home-variant-1" } },
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
  ...pages
    .filter(page => (page as any).frontmatter?.layout !== "product" && (page as any).frontmatter?.layout !== "shop")
    .map(page => ({
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
    { path: "/home/2/", component: PageView, props: { slug: "home-variant-2" } },
    { path: "/home/3/", component: PageView, props: { slug: "home-variant-3" } },
    { path: "/home/4/", component: PageView, props: { slug: "home-variant-4" } },
    { path: "/home/5/", component: PageView, props: { slug: "home-variant-5" } },
    // Sections — generated dynamically from site-tree
    ...buildSectionRoutes(),
    // Payment
    { path: "/payment/success/", component: () => import("./pages/PaymentSuccess.vue") },
    // Shop — generated dynamically from folder-based content
    ...buildShopRoutes(),
  ] : []),
  // Catch-all 404
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

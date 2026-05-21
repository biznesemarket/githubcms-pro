<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useSeo } from "../composables/useSeo";
import { processHeadings } from "../composables/useToc";
import { generateSchema } from "../schema";
import { t } from "../i18n";
import { slugify } from "../utils/slug";
import { findArticleBySlug } from "../content/articles";
import { siteConfig } from "../site.config";
import PageBanner from "../components/PageBanner.vue";
import AppAccordion from "../components/AppAccordion.vue";
import AppAccordionItem from "../components/AppAccordionItem.vue";
import RelatedArticles from "../components/RelatedArticles.vue";

const progress = ref(0);
let rafId = 0;

function onScroll() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    rafId = 0;
  });
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  if (rafId) cancelAnimationFrame(rafId);
});

const props = defineProps<{
  slug: string;
}>();

const article = computed(() => findArticleBySlug(props.slug));

useSeo(() => {
  const currentArticle = article.value;
  if (!currentArticle) {
    return {
      title: t.article.notFound,
      description: "",
      path: `/blog/${props.slug}/`,
      type: "article",
    };
  }

  return {
    title: currentArticle.frontmatter.title,
    description: currentArticle.frontmatter.description,
    path: `/blog/${currentArticle.frontmatter.slug}/`,
    type: "article",
    image: currentArticle.frontmatter.cover_image,
    publishedTime: currentArticle.frontmatter.date,
    modifiedTime: currentArticle.frontmatter.updated,
    tags: currentArticle.frontmatter.tags,
    jsonLd: generateSchema({
      url: `${siteConfig.url}/blog/${currentArticle.frontmatter.slug}/`,
      path: `/blog/${currentArticle.frontmatter.slug}/`,
      title: currentArticle.frontmatter.title,
      description: currentArticle.frontmatter.description,
      html: currentArticle.html,
      type: "article",
      image: currentArticle.frontmatter.cover_image,
      publishedTime: currentArticle.frontmatter.date,
      modifiedTime: currentArticle.frontmatter.updated,
      tags: currentArticle.frontmatter.tags,
      article: currentArticle,
    }),
  };
});

const blocks = computed(() => article.value?.blocks ?? {});

const blockOrder = ["hero", "answer-first", "key-facts", "featured-snippet", "faq", "cta", "schema-hints"];

const orderedBlocks = computed(() => {
  return blockOrder.filter((name) => name in blocks.value).map((name) => ({
    name,
    html: blocks.value[name],
  }));
});

const breadcrumbItems = computed(() => {
  if (!article.value) return [];
  const items = [
    { name: t.breadcrumb.homeCap, url: "/" },
    { name: t.breadcrumb.blog, url: "/blog/" },
  ];
  const cat = article.value.frontmatter.category;
  if (cat) {
    items.push({ name: cat, url: `/category/${slugify(cat)}/` });
  }
  items.push({ name: article.value.frontmatter.title, url: "" });
  return items;
});

const processedHtml = computed(() => {
  if (!article.value) return { html: "", toc: [] as ReturnType<typeof processHeadings>["toc"] };
  return processHeadings(article.value.html);
});

const htmlWithIds = computed(() => processedHtml.value.html);
const tocItems = computed(() => processedHtml.value.toc);
</script>

<template>
  <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  <template v-if="article">
    <PageBanner :pageTitle="article.frontmatter.title" />

    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li v-for="(item, idx) in breadcrumbItems" :key="idx">
          <template v-if="item.url">
            <RouterLink :to="item.url">{{ item.name }}</RouterLink>
            <span class="bc-sep">/</span>
          </template>
          <span v-else class="bc-current">{{ item.name }}</span>
        </li>
      </ol>
    </nav>

    <main class="page">
      <div class="article-meta">
        <span>{{ article.frontmatter.date }}</span>
        <span v-if="article.frontmatter.author" class="meta-sep">{{ t.article.by }} {{ article.frontmatter.author }}</span>
        <span class="meta-sep">{{ article.readingTime }} {{ t.article.minRead }}</span>
        <RouterLink
          v-if="article.frontmatter.category"
          :to="`/category/${slugify(article.frontmatter.category)}/`"
          class="meta-link"
        >{{ article.frontmatter.category }}</RouterLink>
        <RouterLink
          v-for="tag in article.frontmatter.tags"
          :key="tag"
          :to="`/tag/${slugify(tag)}/`"
          class="meta-link meta-tag"
        >{{ tag }}</RouterLink>
      </div>

      <nav v-if="tocItems.length > 0" class="toc">
        <h2>{{ t.article.tableOfContents }}</h2>
        <ul>
          <li v-for="item in tocItems" :key="item.id" :class="`toc-level-${item.level}`">
            <a :href="`#${item.id}`">{{ item.text }}</a>
          </li>
        </ul>
      </nav>

      <article class="article">
        <div v-html="htmlWithIds"></div>
      </article>

      <template v-for="block in orderedBlocks" :key="block.name">
        <section v-if="block.name === 'answer-first'" class="block block-answer">
          <div class="block-answer-inner" v-html="block.html"></div>
        </section>

        <section v-else-if="block.name === 'key-facts'" class="block block-facts">
          <div v-html="block.html"></div>
        </section>

        <section v-else-if="block.name === 'faq'" class="block block-faq">
          <h2 id="faq">{{ t.article.faq }}</h2>
          <AppAccordion>
            <AppAccordionItem
              v-for="(item, idx) in article.faqItems"
              :key="idx"
            >
              <template #trigger>
                <strong>{{ item.question }}</strong>
              </template>
              <template #content>
                <div v-html="item.answer"></div>
              </template>
            </AppAccordionItem>
          </AppAccordion>
        </section>

        <section v-else-if="block.name === 'cta'" class="block block-cta">
          <div v-html="block.html"></div>
        </section>

        <section v-else-if="block.name === 'hero'" class="block block-hero">
          <div v-html="block.html"></div>
        </section>

        <section v-else class="block">
          <div v-html="block.html"></div>
        </section>
      </template>

      <RelatedArticles :current="article" />
    </main>
  </template>

  <template v-else>
    <PageBanner pageTitle="Article not found" />
    <main class="page">
      <p>The requested Markdown document is not available.</p>
      <RouterLink to="/">Back to articles</RouterLink>
    </main>
  </template>
</template>

<style scoped>
.progress-bar {
  background: var(--color-accent);
  height: 3px;
  left: 0;
  position: fixed;
  top: 0;
  transition: width 0.1s linear;
  z-index: 2000;
}

.breadcrumbs {
  background: var(--color-bg-muted);
  border-bottom: 1px solid var(--color-border);
  padding: 10px 0;
}

.breadcrumbs ol {
  list-style: none;
  margin: 0 auto;
  max-width: 960px;
  padding: 0 20px;
}

.breadcrumbs li {
  display: inline;
  font-size: 13px;
}

.breadcrumbs a {
  color: var(--color-accent);
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.bc-sep {
  color: var(--color-text-muted);
  margin: 0 6px;
}

.bc-current {
  color: var(--color-text-secondary);
}

.article-meta {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 24px;
}

.meta-sep {
  margin-left: 12px;
}

.meta-tag {
  background: var(--color-tag-bg);
  border-radius: 4px;
  color: var(--color-text-secondary);
  display: inline-block;
  font-size: 12px;
  margin-left: 6px;
  padding: 2px 8px;
  text-decoration: none;
}

.meta-tag:hover {
  background: var(--color-accent);
  color: #fff;
}

.meta-link {
  color: var(--color-accent);
  margin-left: 12px;
  text-decoration: none;
}

.meta-link:hover {
  text-decoration: underline;
}

.block {
  margin-bottom: 32px;
}

.block-answer {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  border-radius: 12px;
  color: var(--color-surface);
  padding: 24px 28px;
}

.block-answer-inner p {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}

.block-facts {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px 28px;
}

.block-facts :deep(h2) {
  border-bottom: 2px solid var(--color-accent);
  font-size: 22px;
  margin: 0 0 16px;
  padding-bottom: 8px;
}

.block-faq {
  background: var(--color-faq-bg);
  border: 1px solid var(--color-faq-border);
  border-radius: 12px;
  padding: 24px 28px;
}

.block-faq :deep(h2) {
  font-size: 22px;
  margin: 0 0 16px;
}

.block-cta {
  background: linear-gradient(135deg, var(--color-text), #2d3748);
  border-radius: 12px;
  color: var(--color-surface);
  padding: 24px 28px;
}

.block-cta :deep(h2) {
  font-size: 22px;
  margin: 0 0 12px;
}

.block-cta :deep(a) {
  color: #60a5fa;
}

.block-hero {
  margin-bottom: 32px;
}

.block-hero :deep(p) {
  font-size: 18px;
  color: var(--color-text-secondary);
}

.article :deep(h1),
.article :deep(h2),
.article :deep(h3) {
  line-height: 1.3;
  margin-top: 24px;
}

.article :deep(img) {
  height: auto;
  max-width: 100%;
}

.toc {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 32px;
  padding: 20px 24px;
}

.toc h2 {
  font-size: 16px;
  margin: 0 0 12px;
}

.toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc li {
  margin-bottom: 4px;
}

.toc a {
  color: var(--color-accent);
  font-size: 14px;
  text-decoration: none;
}

.toc a:hover {
  text-decoration: underline;
}

.toc-level-3 a {
  padding-left: 16px;
}
</style>

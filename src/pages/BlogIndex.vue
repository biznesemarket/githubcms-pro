<script setup lang="ts">
import { computed, ref } from "vue";
import { useSeo } from "../composables/useSeo";
import { articles } from "../content/articles";
import { siteConfig } from "../site.config";
import PageBanner from "../components/PageBanner.vue";
import { slugify } from "../utils/slug";
import { t } from "../i18n";
import blogHeroRu from "/content/ru/blog/blog-hero.md?raw";
import blogHeroEn from "/content/en/blog/blog-hero.md?raw";

const PER_PAGE = 10;

const props = withDefaults(defineProps<{
  page?: number;
}>(), {
  page: 1,
});

const totalPages = computed(() => Math.max(1, Math.ceil(articles.length / PER_PAGE)));

const pageArticles = computed(() => {
  const start = (props.page - 1) * PER_PAGE;
  return articles.slice(start, start + PER_PAGE);
});

const pageTitle = computed(() =>
  props.page > 1 ? `Blog - Page ${props.page}` : "Blog",
);

const pagePath = computed(() =>
  props.page > 1 ? `/blog/page/${props.page}/` : "/blog/",
);

useSeo(() => ({
  title: pageTitle.value,
  description: `Articles and guides from ${siteConfig.name}${props.page > 1 ? ` (page ${props.page})` : ""}`,
  path: pagePath.value,
  type: "website",
}));

const pageNumbers = computed(() => {
  if (totalPages.value <= 1) return [];
  const pages: number[] = [];
  const start = Math.max(1, props.page - 2);
  const end = Math.min(totalPages.value, props.page + 2);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const viewMode = ref<"grid" | "list" | "compact">("grid");

const blogHeroHtml = computed(() => {
  const raw = siteConfig.locale === "ru" ? blogHeroRu : blogHeroEn;
  const parts = raw.split("---\n");
  return parts.length >= 3 ? parts.slice(2).join("---\n") : raw;
});
</script>

<template>
    <PageBanner :pageTitle="pageTitle" />

    <main class="page">
        <div v-if="page === 1" class="blog-hero-wrapper" v-html="blogHeroHtml"></div>
        <div class="blog-toolbar" v-if="articles.length > 0">
          <p class="page-info" v-if="totalPages > 1">Page {{ page }} of {{ totalPages }} ({{ articles.length }} articles)</p>
          <div class="view-toggle">
            <button :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'" title="Grid">⊞</button>
            <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'" title="List">☰</button>
            <button :class="{ active: viewMode === 'compact' }" @click="viewMode = 'compact'" title="Compact">≡</button>
          </div>
        </div>
        <div :class="['article-list', viewMode]" v-if="articles.length > 0">
          <article v-for="item in pageArticles" :key="item.frontmatter.slug" class="article-card">
            <img
              :src="(item.frontmatter as any).cover_image || (item.frontmatter as any).image || `https://pixinlink.ru/api/v1/400x300/${encodeURIComponent(item.frontmatter.slug)}`"
              :alt="item.frontmatter.title"
              class="article-thumb"
              loading="lazy"
            >
            <div class="article-body">
            <h2>
              <RouterLink :to="`/blog/${item.frontmatter.slug}/`">
                {{ item.frontmatter.title }}
              </RouterLink>
            </h2>
            <p class="card-desc">{{ item.frontmatter.description }}</p>
            <div class="card-meta">
              <span>{{ item.frontmatter.date }}</span>
              <span class="meta-sep">{{ item.readingTime }} {{ t.blog.minRead }}</span>
            <RouterLink
              v-if="item.frontmatter.category"
              :to="`/category/${slugify(item.frontmatter.category)}/`"
              class="meta-link"
            >{{ item.frontmatter.category }}</RouterLink>
            <RouterLink
              v-for="tag in item.frontmatter.tags"
              :key="tag"
              :to="`/tag/${slugify(tag)}/`"
              class="meta-link meta-tag"
            >{{ tag }}</RouterLink>
          </div>
          </div>
        </article>
      </div>
      <p v-else>{{ t.blog.noArticles }}</p>

    <nav v-if="totalPages > 1" class="pagination" :aria-label="t.blog.paginationLabel">
      <RouterLink
        v-if="page > 1"
        :to="page === 2 ? '/blog/' : `/blog/page/${page - 1}/`"
        class="page-link"
      >{{ t.blog.previous }}</RouterLink>
      <span v-else class="page-link disabled">{{ t.blog.previous }}</span>

      <RouterLink
        v-if="pageNumbers[0] > 1"
        to="/blog/"
        class="page-num"
      >1</RouterLink>
      <span v-if="pageNumbers[0] > 2" class="page-dots">...</span>

      <RouterLink
        v-for="n in pageNumbers"
        :key="n"
        :to="n === 1 ? '/blog/' : `/blog/page/${n}/`"
        class="page-num"
        :class="{ active: n === page }"
      >{{ n }}</RouterLink>

      <span v-if="pageNumbers[pageNumbers.length - 1] < totalPages - 1" class="page-dots">...</span>
      <RouterLink
        v-if="pageNumbers[pageNumbers.length - 1] < totalPages"
        :to="`/blog/page/${totalPages}/`"
        class="page-num"
      >{{ totalPages }}</RouterLink>

      <RouterLink
        v-if="page < totalPages"
        :to="`/blog/page/${page + 1}/`"
        class="page-link"
      >{{ t.blog.next }}</RouterLink>
      <span v-else class="page-link disabled">{{ t.blog.next }}</span>
    </nav>
  </main>
</template>

<style scoped>
.blog-hero-wrapper :deep(.blog-hero) {
  background: linear-gradient(135deg, #1a0a2e, #2d1060);
  border-radius: 12px;
  color: #fff;
  margin-bottom: 24px;
  overflow: hidden;
  padding: 40px;
}

.blog-hero-wrapper :deep(.blog-hero-inner) {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.blog-hero-wrapper :deep(.blog-hero-text) {
  flex: 1;
}

.blog-hero-wrapper :deep(.blog-hero-badge) {
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  border-radius: 20px;
  color: #c4b5fd;
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 16px;
  padding: 4px 14px;
  text-transform: uppercase;
}

.blog-hero-wrapper :deep(.blog-hero-title) {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 12px;
}

.blog-hero-wrapper :deep(.blog-hero-desc) {
  color: rgba(255,255,255,0.75);
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 24px;
  max-width: 600px;
}

.blog-hero-wrapper :deep(.blog-hero-stats) {
  display: flex;
  gap: 24px;
}

.blog-hero-wrapper :deep(.blog-hero-stat) {
  text-align: center;
}

.blog-hero-wrapper :deep(.blog-hero-stat-num) {
  color: #c4b5fd;
  display: block;
  font-size: 28px;
  font-weight: 800;
}

.blog-hero-wrapper :deep(.blog-hero-stat-label) {
  color: rgba(255,255,255,0.5);
  display: block;
  font-size: 12px;
  margin-top: 2px;
  text-transform: uppercase;
}

.blog-hero-wrapper :deep(.blog-hero-visual) {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.blog-hero-wrapper :deep(.blog-hero-card) {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 16px 20px;
  width: 260px;
}

.blog-hero-wrapper :deep(.blog-hero-card-img) {
  font-size: 20px;
  margin-bottom: 6px;
}

.blog-hero-wrapper :deep(.blog-hero-card-title) {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

.blog-hero-wrapper :deep(.blog-hero-card-desc) {
  color: rgba(255,255,255,0.55);
  font-size: 12px;
  line-height: 1.5;
}
.blog-toolbar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.page-info {
  color: var(--color-text-muted);
  font-size: 13px;
  margin: 0;
}

.view-toggle {
  display: flex;
  gap: 4px;
}

.view-toggle button {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 16px;
  padding: 4px 10px;
}

.view-toggle button:hover {
  color: var(--color-text);
}

.view-toggle button.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

/* === Grid mode === */
.article-list.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
}

.article-list.grid .article-card {
  flex-direction: column;
}

.article-list.grid .article-thumb {
  height: 180px;
  width: 100%;
}

.article-list.grid .article-body {
  padding: 16px;
}

.article-list.grid .article-card h2 {
  font-size: 16px;
}

/* === Compact mode === */
.article-list.compact .article-card {
  margin-bottom: 0;
  padding: 10px 0;
}

.article-list.compact .article-thumb {
  display: none;
}

.article-list.compact .article-body {
  padding: 0 0 0 10px;
}

.article-list.compact .article-card h2 {
  font-size: 15px;
  margin: 0;
}

.article-list.compact .card-desc {
  display: none;
}

.article-list.compact .card-meta {
  font-size: 12px;
}
.article-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  display: flex;
  margin-bottom: 16px;
  overflow: hidden;
  padding: 0;
}

.article-thumb {
  flex-shrink: 0;
  height: 120px;
  object-fit: cover;
  width: 180px;
}

.article-body {
  padding: 16px 20px;
  flex: 1;
  min-width: 0;
}

.article-card h2 {
  font-size: 18px;
  margin: 0 0 6px;
}

.article-card h2 a {
  color: var(--color-text);
  text-decoration: none;
}

.article-card h2 a:hover {
  color: var(--color-accent);
}

.card-desc {
  color: var(--color-text-secondary);
  margin: 0 0 12px;
}

.card-meta {
  color: var(--color-text-muted);
  font-size: 13px;
}

.meta-sep {
  margin-left: 12px;
}

.meta-link {
  color: var(--color-accent);
  margin-left: 12px;
  text-decoration: none;
}

.meta-link:hover {
  text-decoration: underline;
}

.meta-tag {
  background: var(--color-tag-bg);
  border-radius: 4px;
  color: var(--color-text-secondary);
  display: inline-block;
  font-size: 12px;
  margin-left: 6px;
  padding: 1px 6px;
  text-decoration: none;
}

.meta-tag:hover {
  background: var(--color-accent);
  color: #fff;
}

.pagination {
  align-items: center;
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 32px;
}

.page-link {
  color: var(--color-accent);
  font-size: 14px;
  padding: 6px 12px;
  text-decoration: none;
}

.page-link:hover {
  text-decoration: underline;
}

.page-link.disabled {
  color: var(--color-text-muted);
  cursor: default;
  opacity: 0.4;
}

.page-num {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text);
  font-size: 14px;
  min-width: 36px;
  padding: 6px 0;
  text-align: center;
  text-decoration: none;
}

.page-num:hover {
  border-color: var(--color-accent);
}

.page-num.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.page-dots {
  color: var(--color-text-muted);
  padding: 0 4px;
}
</style>

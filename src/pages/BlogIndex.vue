<script setup lang="ts">
import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { articles } from "../content/articles";
import { siteConfig } from "../site.config";
import PageBanner from "../components/PageBanner.vue";
import { slugify } from "../utils/slug";
import { t } from "../i18n";

const PER_PAGE = 5;

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
</script>

<template>
  <PageBanner :pageTitle="pageTitle" />

  <main class="page">
      <p class="page-info" v-if="totalPages > 1">
        Page {{ page }} of {{ totalPages }} ({{ articles.length }} articles)
      </p>

      <section>
        <div class="article-list" v-if="articles.length > 0">
          <article v-for="item in pageArticles" :key="item.frontmatter.slug" class="article-card">
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
        </article>
      </div>
      <p v-else>{{ t.blog.noArticles }}</p>
    </section>

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
.page-info {
  color: var(--color-text-muted);
  font-size: 13px;
  margin-bottom: 16px;
}

.article-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 24px;
}

.article-card h2 {
  font-size: 20px;
  margin: 0 0 8px;
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

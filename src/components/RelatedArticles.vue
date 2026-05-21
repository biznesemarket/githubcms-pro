<script setup lang="ts">
import { computed } from "vue";
import { articles } from "../content/articles";
import type { Article } from "../content/articles";

const props = defineProps<{
  current: Article;
  max?: number;
}>();

const maxItems = props.max ?? 3;

const related = computed(() => {
  const currentTags = new Set(props.current.frontmatter.tags);
  if (currentTags.size === 0) return [];

  return articles
    .filter((a) => a.frontmatter.slug !== props.current.frontmatter.slug)
    .map((a) => ({
      article: a,
      score: a.frontmatter.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)
    .map((x) => x.article);
});
</script>

<template>
  <section v-if="related.length > 0" class="related-articles">
    <h2>Related Articles</h2>
    <div class="related-grid">
      <article v-for="item in related" :key="item.frontmatter.slug" class="related-card">
        <h3>
          <RouterLink :to="`/blog/${item.frontmatter.slug}/`">
            {{ item.frontmatter.title }}
          </RouterLink>
        </h3>
        <p>{{ item.frontmatter.description }}</p>
        <div class="related-meta">
          <span>{{ item.frontmatter.date }}</span>
          <span class="meta-sep">{{ item.readingTime }} min read</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.related-articles {
  border-top: 1px solid var(--color-border);
  margin-top: 48px;
  padding-top: 32px;
}

.related-articles h2 {
  font-size: 20px;
  margin: 0 0 16px;
}

.related-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.related-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
}

.related-card h3 {
  font-size: 16px;
  margin: 0 0 6px;
}

.related-card h3 a {
  color: var(--color-text);
  text-decoration: none;
}

.related-card h3 a:hover {
  color: var(--color-accent);
}

.related-card p {
  color: var(--color-text-secondary);
  font-size: 13px;
  margin: 0 0 8px;
}

.related-meta {
  color: var(--color-text-muted);
  font-size: 12px;
}

.meta-sep {
  margin-left: 8px;
}
</style>

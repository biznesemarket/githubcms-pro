<script setup lang="ts">
import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { articles } from "../content/articles";
import { siteConfig } from "../site.config";
import PageBanner from "../components/PageBanner.vue";
import { slugify } from "../utils/slug";
import { t } from "../i18n";

const props = defineProps<{
  slug: string;
}>();

const tagArticles = computed(() =>
  articles.filter((a) =>
    a.frontmatter.tags.some((t) => slugify(t) === props.slug),
  ),
);

const tagName = computed(() => {
  const article = tagArticles.value[0];
  const tag = article?.frontmatter.tags.find(
    (t) => slugify(t) === props.slug,
  );
  return tag || props.slug;
});

useSeo(() => ({
  title: `#${tagName.value}`,
  description: `Articles tagged "${tagName.value}" from ${siteConfig.name}`,
  path: `/tag/${props.slug}/`,
  type: "website",
}));
</script>

<template>
  <PageBanner :pageTitle="`#${tagName}`" />

  <main class="page">
    <p v-if="tagArticles.length === 0">{{ t.tag.noArticles }}</p>

    <section v-else>
      <div class="article-list">
        <article v-for="item in tagArticles" :key="item.frontmatter.slug" class="article-card">
          <h2>
            <RouterLink :to="`/blog/${item.frontmatter.slug}/`">
              {{ item.frontmatter.title }}
            </RouterLink>
          </h2>
          <p class="card-desc">{{ item.frontmatter.description }}</p>
          <div class="card-meta">
            <span>{{ item.frontmatter.date }}</span>
            <span class="meta-sep">{{ item.readingTime }} min read</span>
            <span v-if="item.frontmatter.category" class="meta-tag">{{ item.frontmatter.category }}</span>
          </div>
        </article>
      </div>
    </section>

    <p class="back-link">
      <RouterLink to="/blog/">{{ t.tag.allArticles }}</RouterLink>
    </p>
  </main>
</template>

<style scoped>
.article-card {
  background: #ffffff;
  border: 1px solid #d8dde8;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 24px;
}

.article-card h2 {
  font-size: 20px;
  margin: 0 0 8px;
}

.article-card h2 a {
  color: #19202a;
  text-decoration: none;
}

.article-card h2 a:hover {
  color: #1d4ed8;
}

.card-desc {
  color: #555;
  margin: 0 0 12px;
}

.card-meta {
  color: #888;
  font-size: 13px;
}

.meta-sep {
  margin-left: 12px;
}

.meta-tag {
  background: #e8edf2;
  border-radius: 4px;
  display: inline-block;
  margin-left: 12px;
  padding: 2px 8px;
}

.back-link {
  margin-top: 32px;
}
</style>

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

const categoryArticles = computed(() =>
  articles.filter((a) => slugify(a.frontmatter.category) === props.slug),
);

const categoryName = computed(() => {
  const article = categoryArticles.value[0];
  return article ? article.frontmatter.category : props.slug;
});

useSeo(() => ({
  title: categoryName.value,
  description: `Articles in category "${categoryName.value}" from ${siteConfig.name}`,
  path: `/category/${props.slug}/`,
  type: "website",
}));
</script>

<template>
  <PageBanner :pageTitle="categoryName" />

  <main class="page">
    <p v-if="categoryArticles.length === 0">{{ t.category.noArticles }}</p>

    <section v-else>
      <div class="article-list">
        <article v-for="item in categoryArticles" :key="item.frontmatter.slug" class="article-card">
          <h2>
            <RouterLink :to="`/blog/${item.frontmatter.slug}/`">
              {{ item.frontmatter.title }}
            </RouterLink>
          </h2>
          <p class="card-desc">{{ item.frontmatter.description }}</p>
          <div class="card-meta">
            <span>{{ item.frontmatter.date }}</span>
            <span class="meta-sep">{{ item.readingTime }} min read</span>
          </div>
        </article>
      </div>
    </section>

    <p class="back-link">
      <RouterLink to="/blog/">{{ t.category.allArticles }}</RouterLink>
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

.back-link {
  margin-top: 32px;
}
</style>

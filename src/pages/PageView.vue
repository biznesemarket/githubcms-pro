<script setup lang="ts">
import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { findPageBySlug } from "../content/pages";
import PageBanner from "../components/PageBanner.vue";
import { t } from "../i18n";

const props = defineProps<{
  slug: string;
}>();

const page = computed(() => findPageBySlug(props.slug));

const isRawHtml = computed(() => {
  const h = page.value?.html?.trim() ?? "";
  return h.startsWith("<section") || h.startsWith("<div class=") || h.length > 5000;
});

useSeo(() => {
  const currentPage = page.value;
  if (!currentPage) {
    return {
      title: t.pageView.notFound,
      description: "",
      path: `/${props.slug}/`,
      type: "website",
    };
  }
  return {
    title: currentPage.frontmatter.title,
    description: currentPage.frontmatter.description,
    path: `/${currentPage.frontmatter.slug}/`,
    type: "website",
  };
});
</script>

<template>
  <template v-if="page">
    <template v-if="isRawHtml">
      <main v-html="page.html" />
    </template>
    <template v-else>
      <PageBanner :pageTitle="page.frontmatter.title" />
      <main class="page">
        <article class="article">
          <div v-html="page.html"></div>
        </article>
      </main>
    </template>
  </template>
  <template v-else>
    <PageBanner :pageTitle="t.pageView.notFound" />
    <main class="page">
      <p>{{ t.pageView.notFound }}</p>
      <RouterLink to="/">{{ t.pageView.backToHome }}</RouterLink>
    </main>
  </template>
</template>

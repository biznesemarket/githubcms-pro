<script setup lang="ts">
import { ref, computed, watch, onServerPrefetch, onMounted } from "vue";
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import { t } from "../i18n";
import { sectionIdToSlug } from "../utils/section-slug";
import { generateSchema } from "../schema";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";

const props = defineProps<{ section: string; slug: string }>();

const html = ref("");
const title = ref("");
const description = ref("");
const notFound = ref(false);
const ready = ref(false);
const loadedSlug = ref("");

const isRawHtml = computed(() => {
  const h = html.value.trim();
  if (!h) return true; // avoid showing else-block before content loads
  return h.startsWith("<section") || h.startsWith("<!--") || h.length > 2000;
});

const sectionName = computed(() => {
  const sec = t.razdel.sections[Number(props.section) as keyof typeof t.razdel.sections];
  return sec?.title ?? `Раздел ${props.section}`;
});

const breadcrumbItems = computed(() => {
  const items = [
    { name: t.breadcrumb.homeCap, url: "/" },
    { name: sectionName.value, url: `/${sectionIdToSlug(props.section)}/` },
  ];
  if (title.value) items.push({ name: title.value });
  return items;
});

async function loadArticle() {
  if (ready.value && loadedSlug.value === props.slug) return;
  ready.value = false;
  notFound.value = false;
  loadedSlug.value = props.slug;
  try {
    const res = await fetch(`/content/sections/${props.slug}.json`);
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    title.value = data.title;
    description.value = data.description;
    html.value = data.html;
    ready.value = true;
  } catch {
    if (typeof window !== "undefined") {
      notFound.value = true;
      ready.value = true;
    }
  }
}

onServerPrefetch(() => loadArticle());
onMounted(() => { loadArticle(); });
watch(() => props.slug, () => { loadArticle(); });

useSeo(() => {
  const path = `/${sectionIdToSlug(props.section)}/${props.slug}/`;
  if (!ready.value) {
    return { title: (typeof document !== "undefined" ? document.title : siteConfig.name) || siteConfig.name, description: "", path };
  }
  if (notFound.value) return { title: t.sectionArticle.notFound, description: "", path };

  const jsonLd = generateSchema({
    url: new URL(path, siteConfig.url).toString(),
    path,
    title: title.value,
    description: description.value,
    html: html.value,
    type: "article",
    publishedTime: "2026-05-11",
    tags: [],
    locale: siteConfig.locale,
  });

  return { title: `${title.value} | ${siteConfig.name}`, description: description.value, path, type: "article", jsonLd };
});
</script>

<template>
  <main v-if="notFound" class="py-5 text-center"><h2>{{ t.sectionArticle.notFound }}</h2></main>
  <main v-else>
    <BreadcrumbNav :items="breadcrumbItems" />
    <template v-if="isRawHtml">
      <div v-if="ready" v-html="html" />
    </template>
    <template v-else>
      <section class="py-4" style="background:var(--color-bg-muted)">
        <div class="container">
          <p class="text-uppercase mb-1 fw-bold" style="font-size:11px;letter-spacing:2px;color:var(--color-accent)">{{ sectionName }}</p>
          <h1 class="fw-bold mb-2" style="font-size:34px">{{ title || props.slug.replace(/-/g, ' ') }}</h1>
          <p style="font-size:15px;color:var(--color-text-muted)">{{ description || '&nbsp;' }}</p>
        </div>
      </section>
      <template v-if="!ready"><div style="height:200px" /></template>
      <section v-else><div class="container"><article class="article-content" v-html="html" /></div></section>
    </template>
  </main>
</template>

<style scoped>
</style>

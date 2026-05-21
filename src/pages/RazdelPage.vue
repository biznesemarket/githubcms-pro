<script setup lang="ts">
import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import { schemaLibrary } from "../schema";
import { t } from "../i18n";
import { sectionIdToSlug } from "../utils/section-slug";
import { generateSchema } from "../schema";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";

const props = defineProps<{ section: string }>();

const sectionNum = computed(() => Number.parseInt(props.section));

const breadcrumbItems = computed(() => [
  { name: t.breadcrumb.homeCap, url: "/" },
  { name: sectionData.value?.title ?? `Раздел ${props.section}` },
]);

const sectionData = computed(() => {
  return t.razdel.sections[sectionNum.value as keyof typeof t.razdel.sections];
});

const icons: Record<number, { icon: string; articleIcons: string[] }> = {
  1: { icon: "◆", articleIcons: ["◈", "◉", "◈", "◉", "◈"] },
  2: { icon: "⚡", articleIcons: ["▣", "⬢", "▣", "⬢", "▣"] },
  3: { icon: "◈", articleIcons: ["◈", "◉", "◈", "◉", "◈"] },
};

const sectionLinks: Record<number, string[]> = {
  1: ["/section-geo/geo-rukovodstvo/", "/section-geo/json-ld-gajd/", "/section-geo/e-e-a-t-signaly/", "/section-geo/featured-snippets/", "/section-geo/seo-vs-geo/"],
  2: ["/section-devops/deploj-obzor/", "/section-devops/vps-i-nginx/", "/section-devops/github-actions/", "/section-devops/bezopasnost/", "/section-devops/monitoring/"],
  3: ["/section-content/markdown-obzor/", "/section-content/yaml-frontmatter/", "/section-content/prompt-shablony/", "/section-content/ai-kontent/", "/section-content/migracija-s-wordpress/"],
};

const articlesWithLinks = computed(() => {
  const sec = sectionData.value;
  if (!sec) return [];
  const links = sectionLinks[sectionNum.value] ?? [];
  const articleIcons = icons[sectionNum.value]?.articleIcons ?? [];
  return sec.articles.map((a, i) => ({ ...a, link: links[i] ?? "#", icon: articleIcons[i] ?? "◆" }));
});

useSeo(() => {
  const path = `/${sectionIdToSlug(props.section)}/`;
  const sec = sectionData.value;
  if (!sec) return { title: siteConfig.name, description: siteConfig.description, path, type: "website" };
  const items = sec.articles.map(a => ({ name: a.title, description: a.desc }));
  const schemaJsonLd = generateSchema({
    url: new URL(path, siteConfig.url).toString(),
    path,
    title: sec.title,
    description: sec.desc,
    html: "",
    type: "website",
  });
  return {
    title: `${sec.title} | ${siteConfig.name}`,
    description: sec.desc,
    path,
    type: "website",
    jsonLd: [...schemaJsonLd, schemaLibrary.createItemList(items)],
  };
});
</script>

<template>
<main>
  <BreadcrumbNav :items="breadcrumbItems" />
  <section class="py-5" style="background:linear-gradient(135deg,rgba(124,58,237,0.06),var(--color-bg-muted),var(--color-surface))">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <p class="text-uppercase mb-2 fw-bold" style="font-size:12px;letter-spacing:3px;color:var(--color-accent)">{{ t.razdel.sectionLabel }} {{ section }}</p>
          <h1 class="fw-bold mb-3" style="font-size:40px;line-height:1.2">{{ sectionData.heroText }}</h1>
          <p class="lead mb-0" style="font-size:17px;line-height:1.7;color:var(--color-text-muted);max-width:650px">{{ sectionData.desc }}</p>
        </div>
        <div class="col-lg-4 text-center mt-4 mt-lg-0">
          <div class="d-inline-block p-4 rounded-4" style="background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))">
            <span style="font-size:48px;color:white">{{ icons[sectionNum]?.icon ?? "◆" }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-4">
    <div class="container">
      <div class="row"><div class="col-lg-10">
        <p style="font-size:15px;line-height:1.8;color:var(--color-text-muted)">{{ sectionData.longDesc }}</p>
      </div></div>
    </div>
  </section>
  <section class="py-3">
    <div class="container">
      <div class="row"><div class="col-lg-10">
        <h2 class="fw-bold mb-0" style="font-size:28px">{{ t.razdel.articlesTitle }}</h2>
        <p class="text-muted mt-2" style="font-size:15px">{{ t.razdel.articlesDesc }}</p>
      </div></div>
    </div>
  </section>
  <section class="pb-5">
    <div class="container">
      <div class="row g-4">
        <div v-for="a in articlesWithLinks" :key="a.link" class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden;transition:transform 0.2s">
            <div style="height:160px;background:linear-gradient(135deg,var(--color-accent),#6d28d9);display:flex;align-items:center;justify-content:center">
              <span style="font-size:40px;color:white;opacity:0.9">{{ a.icon }}</span>
            </div>
            <div class="card-body p-4 d-flex flex-column">
              <h4 class="fw-bold mb-2" style="font-size:17px">{{ a.title }}</h4>
              <p class="mb-3 flex-grow-1" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">{{ a.desc }}</p>
              <RouterLink :to="a.link" class="btn btn-outline-primary btn-sm mt-auto" style="border-radius:8px">{{ t.razdel.readArticle }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="py-3" style="background:var(--color-bg-muted)">
    <div class="container">
      <div class="row"><div class="col-lg-10">
        <p style="font-size:13px;color:var(--color-text-muted)"><i>◆</i> {{ t.razdel.footerNote }}</p>
      </div></div>
    </div>
  </section>
</main>
</template>

<style scoped>
</style>

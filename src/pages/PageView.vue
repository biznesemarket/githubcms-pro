<script setup lang="ts">
import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { findPageBySlug } from "../content/pages";
import { siteTree } from "../content/site-tree";
import { sectionNav } from "../content/section-nav";
import PageBanner from "../components/PageBanner.vue";
import { t } from "../i18n";

const props = defineProps<{
  slug: string;
}>();

const page = computed(() => findPageBySlug(props.slug));

// Strict contract: raw HTML rendering only when frontmatter.raw_html === true.
const isRawHtml = computed(() => page.value?.frontmatter?.raw_html === true);

const renderedHtml = computed(() => {
  if (!page.value) return "";
  return isRawHtml.value ? (page.value.rawHtml ?? page.value.html) : page.value.html;
});

// Dynamic article cards: find section that contains this page
const sectionArticles = computed(() => {
  if (!page.value) return [];
  const slug = page.value.frontmatter.slug;
  const sec = siteTree.sections.find(
    (s) => s.pages.some((p) => p.slug === slug),
  );
  if (!sec) return [];
  return sec.pages
    .filter((p) => !p.isIndex && p.slug !== slug)
    .map((p) => ({
      slug: p.slug,
      // Top-level sections (home, about, contact, privacy) serve their pages
      // at `/{slug}/`; content sections (section-geo, ...) serve them nested
      // under `${sec.path}${slug}/`.
      link: sec.path === `/${sec.id}/` && ["home", "about", "contact", "privacy", "shop"].includes(sec.id)
        ? `/${p.slug}/`
        : `${sec.path}${p.slug}/`,
      title: sectionNav[sec.id]?.articles?.[p.slug] ?? p.slug,
    }));
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
    path: currentPage.isIndex ? "/" : `/${currentPage.frontmatter.slug}/`,
    type: "website",
  };
});
</script>

<template>
  <template v-if="page">
    <template v-if="isRawHtml">
      <main>
        <article v-html="renderedHtml" />
        <section v-if="sectionArticles.length > 0" class="py-5" style="background:var(--color-bg-muted)">
          <div class="container">
            <div class="row g-4">
              <div v-for="a in sectionArticles" :key="a.slug" class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden;transition:transform 0.2s">
                  <div style="height:160px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));display:flex;align-items:center;justify-content:center">
                    <span style="font-size:40px;color:white;opacity:0.9">&#9670;</span>
                  </div>
                  <div class="card-body p-4 d-flex flex-column">
                    <h4 class="fw-bold mb-3" style="font-size:17px">{{ a.title }}</h4>
                    <RouterLink :to="a.link" class="btn btn-outline-primary btn-sm mt-auto" style="border-radius:8px">Читать статью →</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </template>
    <template v-else>
      <PageBanner :pageTitle="page.frontmatter.title" />
      <main class="page">
        <article class="article">
          <div v-html="renderedHtml"></div>
        </article>
        <section v-if="sectionArticles.length > 0" class="mt-5">
          <div class="row g-4">
            <div v-for="a in sectionArticles" :key="a.slug" class="col-md-6 col-lg-4">
              <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden;transition:transform 0.2s">
                <div style="height:160px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));display:flex;align-items:center;justify-content:center">
                  <span style="font-size:40px;color:white;opacity:0.9">&#9670;</span>
                </div>
                <div class="card-body p-4 d-flex flex-column">
                  <h4 class="fw-bold mb-3" style="font-size:17px">{{ a.title }}</h4>
                  <RouterLink :to="a.link" class="btn btn-outline-primary btn-sm mt-auto" style="border-radius:8px">Читать статью →</RouterLink>
                </div>
              </div>
            </div>
          </div>
        </section>
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

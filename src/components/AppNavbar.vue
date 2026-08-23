<script setup lang="ts">
import { ref, computed } from "vue";
import { siteConfig } from "../site.config";
import { t } from "../i18n";
import { siteTree } from "../content/site-tree";
import { sectionNav } from "../content/section-nav";

const isRu = siteConfig.locale === "ru";
const menuOpen = ref(false);

const NON_SECTION = new Set(["home", "about", "contact", "blog", "shop", "templates", "payment", "privacy"]);

const dropdownSections = computed(() =>
  siteTree.sections.filter((s) =>
    !NON_SECTION.has(s.id) && s.dropdown && s.pages.length > 0,
  ),
);

function articleLabel(sectionId: string, slug: string): string {
  return sectionNav[sectionId]?.articles?.[slug] ?? slug;
}
</script>

<template>
  <header class="app-navbar">
    <div v-if="siteConfig.isFree" class="demo-banner">
      ⚡ {{ t.nav.demoFreeBanner }}
      <a :href="isRu ? 'https://githubcms.ru' : 'https://githubcms.com'">{{ t.nav.demoFreeLink }}</a>
    </div>
    <div class="container">
      <nav class="navbar navbar-expand-md">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/images/logo-40x40.png" alt="" width="32" height="32" style="border-radius:4px">
          {{ siteConfig.name }}
        </RouterLink>

        <button class="navbar-toggler" type="button" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
          <span class="navbar-toggler-icon" />
        </button>

        <div class="navbar-collapse" :class="{ show: menuOpen }">
          <ul class="navbar-nav ms-auto">
            <li v-if="siteConfig.isFree" class="nav-item"><RouterLink class="nav-link" to="/">{{ t.nav.home }}</RouterLink></li>
            <li v-if="siteConfig.isFree" class="nav-item"><RouterLink class="nav-link" to="/about/">{{ t.nav.about }}</RouterLink></li>
            <li v-if="siteConfig.isPro" class="nav-item dropdown">
              <RouterLink class="nav-link" to="/">{{ t.nav.home }}</RouterLink>
              <ul class="dropdown-menu">
                <li><RouterLink class="dropdown-item" to="/">{{ t.nav.home1 }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/home/2/">{{ t.nav.home2 }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/home/3/">{{ t.nav.home3 }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/home/4/">{{ t.nav.home4 }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/home/5/">{{ t.nav.home5 }}</RouterLink></li>
              </ul>
            </li>
            <li v-if="siteConfig.isPro" class="nav-item dropdown">
              <RouterLink class="nav-link" to="/about/">{{ t.nav.about }}</RouterLink>
              <ul class="dropdown-menu">
                <li><RouterLink class="dropdown-item" to="/about/">{{ t.nav.aboutOverview }}</RouterLink></li>
                <li><hr class="dropdown-divider"></li>
                <li><RouterLink class="dropdown-item" to="/about-guide/">{{ t.nav.aboutGuide }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-mission/">{{ t.nav.aboutMission }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-careers/">{{ t.nav.aboutCareers }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-history/">{{ t.nav.aboutHistory }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-reviews/">{{ t.nav.aboutReviews }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-certificates/">{{ t.nav.aboutCertificates }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-press/">{{ t.nav.aboutPress }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/about-partners/">{{ t.nav.aboutPartners }}</RouterLink></li>
              </ul>
            </li>
            <template v-if="siteConfig.isPro">
            <li v-for="section in dropdownSections" :key="section.id" class="nav-item dropdown">
              <RouterLink class="nav-link" :to="section.path">{{ section.title }}</RouterLink>
              <ul class="dropdown-menu">
                <li v-for="page in section.pages.filter(p => !p.isIndex)" :key="page.slug">
                  <RouterLink class="dropdown-item" :to="`${section.path}${page.slug}/`">
                    {{ articleLabel(section.id, page.slug) }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <RouterLink class="nav-link" to="/shop/">{{ t.nav.shop }}</RouterLink>
              <ul class="dropdown-menu">
                <li><RouterLink class="dropdown-item" to="/shop/shop-section-1/">{{ t.shop.sections[0].title }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/shop/shop-section-2/">{{ t.shop.sections[1].title }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/shop/shop-section-3/">{{ t.shop.sections[2].title }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/shop/shop-section-4/">{{ t.shop.sections[3].title }}</RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/shop/shop-section-5/">{{ t.shop.sections[4].title }}</RouterLink></li>
              </ul>
            </li>
            </template>
            <li class="nav-item"><RouterLink class="nav-link" to="/blog/">{{ t.nav.blog }}</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/contact/">{{ t.nav.contact }}</RouterLink></li>
            <li class="nav-item"><RouterLink class="nav-link" to="/templates/">{{ t.nav.templates }}</RouterLink></li>
          </ul>
          <div class="lang-switch-group">
            <a v-if="isRu" class="lang-btn active">RU</a>
            <a v-else :href="siteConfig.ruDomain" class="lang-btn" rel="noopener noreferrer">RU</a>
            <a v-if="!isRu" class="lang-btn active">EN</a>
            <a v-else :href="siteConfig.enDomain" class="lang-btn" rel="noopener noreferrer">EN</a>
          </div>
        </div>
      </nav>
    </div>

  </header>
</template>

<style scoped>
.app-navbar { background: var(--color-surface); border-bottom: 1px solid var(--color-border); position: sticky; top: 0; z-index: 1000; }
.navbar { padding: 12px 0; }
.navbar-brand { color: var(--color-text); font-size: 20px; font-weight: 700; text-decoration: none; }
.lang-switch-group { display: inline-flex; border: 1px solid var(--color-border); border-radius: 6px; margin-left: 6px; overflow: hidden; }
.lang-btn { color: var(--color-text-muted); cursor: pointer; font-size: 12px; font-weight: 600; padding: 4px 10px; text-decoration: none; }
.lang-btn:hover { background: var(--color-tag-bg); color: var(--color-accent); }
.lang-btn.active { background: var(--color-accent); color: #fff; }

@media (max-width: 767px) {
  .navbar-collapse { display: none; }
  .navbar-collapse.show { display: block; }
}
</style>

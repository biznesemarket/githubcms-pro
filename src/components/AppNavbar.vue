<script setup lang="ts">
import { ref, onMounted } from "vue";
import { siteConfig } from "../site.config";
import { t } from "../i18n";
import { useAuth } from "../composables/useAuth";

const { user, isLoggedIn, login, logout } = useAuth()

const isRu = siteConfig.locale === "ru";
const menuOpen = ref(false);
const isDark = ref(false);
const showLogin = ref(false);
const loginName = ref("");
const loginEmail = ref("");

function toggleTheme() {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute("data-theme", isDark.value ? "dark" : "");
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

function doLogin() {
  if (!loginName.value.trim()) return
  login(loginName.value.trim(), loginEmail.value.trim() || loginName.value.trim().toLowerCase().replace(/\s/g, ".") + "@githubcms.com")
  showLogin.value = false
  loginName.value = ""
  loginEmail.value = ""
}

function doLogout() {
  logout()
  if (window.location.pathname.startsWith("/account")) {
    window.location.href = "/"
  }
}

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    isDark.value = true;
    document.documentElement.setAttribute("data-theme", "dark");
  }
});
</script>

<template>
  <header class="app-navbar">
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
            <li class="nav-item dropdown"><RouterLink class="nav-link" to="/">{{ t.nav.home }}</RouterLink><ul class="dropdown-menu"><li><RouterLink class="dropdown-item" to="/">{{ t.nav.home1 }}</RouterLink></li><template v-if="siteConfig.isPro"><li><RouterLink class="dropdown-item" to="/home/2/">{{ t.nav.home2 }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/home/3/">{{ t.nav.home3 }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/home/4/">{{ t.nav.home4 }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/home/5/">{{ t.nav.home5 }}</RouterLink></li></template></ul></li>
            <li class="nav-item dropdown"><RouterLink class="nav-link" to="/about/">{{ t.nav.about }}</RouterLink><ul class="dropdown-menu"><li><RouterLink class="dropdown-item" to="/about/">{{ t.nav.aboutOverview }}</RouterLink></li><li><hr class="dropdown-divider"></li><li><RouterLink class="dropdown-item" to="/about-guide/">{{ t.nav.aboutGuide }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-mission/">{{ t.nav.aboutMission }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-careers/">{{ t.nav.aboutCareers }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-history/">{{ t.nav.aboutHistory }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-reviews/">{{ t.nav.aboutReviews }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-certificates/">{{ t.nav.aboutCertificates }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-press/">{{ t.nav.aboutPress }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/about-partners/">{{ t.nav.aboutPartners }}</RouterLink></li></ul></li>
            <template v-if="siteConfig.isPro">
            <li class="nav-item dropdown"><RouterLink class="nav-link" to="/section-geo/">{{ t.nav.section1 }}</RouterLink><ul class="dropdown-menu"><li><RouterLink class="dropdown-item" to="/section-geo/geo-rukovodstvo/">{{ t.nav.section1Articles["geo-rukovodstvo"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-geo/json-ld-gajd/">{{ t.nav.section1Articles["json-ld-gajd"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-geo/e-e-a-t-signaly/">{{ t.nav.section1Articles["e-e-a-t-signaly"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-geo/featured-snippets/">{{ t.nav.section1Articles["featured-snippets"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-geo/seo-vs-geo/">{{ t.nav.section1Articles["seo-vs-geo"] }}</RouterLink></li></ul></li>
            <li class="nav-item dropdown"><RouterLink class="nav-link" to="/section-devops/">{{ t.nav.section2 }}</RouterLink><ul class="dropdown-menu"><li><RouterLink class="dropdown-item" to="/section-devops/deploj-obzor/">{{ t.nav.section2Articles["deploj-obzor"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-devops/vps-i-nginx/">{{ t.nav.section2Articles["vps-i-nginx"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-devops/github-actions/">{{ t.nav.section2Articles["github-actions"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-devops/bezopasnost/">{{ t.nav.section2Articles.bezopasnost }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-devops/monitoring/">{{ t.nav.section2Articles.monitoring }}</RouterLink></li></ul></li>
            <li class="nav-item dropdown"><RouterLink class="nav-link" to="/section-content/">{{ t.nav.section3 }}</RouterLink><ul class="dropdown-menu"><li><RouterLink class="dropdown-item" to="/section-content/markdown-obzor/">{{ t.nav.section3Articles["markdown-obzor"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-content/yaml-frontmatter/">{{ t.nav.section3Articles["yaml-frontmatter"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-content/prompt-shablony/">{{ t.nav.section3Articles["prompt-shablony"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-content/ai-kontent/">{{ t.nav.section3Articles["ai-kontent"] }}</RouterLink></li><li><RouterLink class="dropdown-item" to="/section-content/migracija-s-wordpress/">{{ t.nav.section3Articles["migracija-s-wordpress"] }}</RouterLink></li></ul></li>
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
          <button class="theme-toggle" type="button" :aria-label="isDark ? t.nav.themeLight : t.nav.themeDark" @click="toggleTheme">
            {{ isDark ? '☀' : '☾' }}
          </button>

          <!-- SIGN IN / ACCOUNT -->
          <div class="nav-auth">
            <button v-if="!isLoggedIn" class="btn-signin" @click="showLogin = true">{{ t.nav.signIn }}</button>
            <div v-else class="nav-user">
              <template v-if="siteConfig.isPro">
                <RouterLink to="/account/" class="nav-avatar-link" :title="user?.name">
                  <span class="nav-avatar">{{ user?.avatar }}</span>
                </RouterLink>
              </template>
              <template v-else>
                <span class="nav-avatar" :title="user?.name">{{ user?.avatar }}</span>
              </template>
              <button class="btn-signout" @click="doLogout" :title="t.nav.signOut">✕</button>
            </div>
          </div>

          <div class="lang-switch-group">
            <a v-if="isRu" class="lang-btn active">RU</a>
            <a v-else :href="siteConfig.ruDomain" class="lang-btn">RU</a>
            <a v-if="!isRu" class="lang-btn active">EN</a>
            <a v-else :href="siteConfig.enDomain" class="lang-btn">EN</a>
          </div>
        </div>
      </nav>
    </div>

    <!-- LOGIN MODAL -->
    <Teleport to="body">
      <div v-if="showLogin" class="login-overlay" @click.self="showLogin = false">
        <div class="login-modal">
          <button class="login-close" @click="showLogin = false">✕</button>
          <h2 class="login-title">{{ t.nav.signIn }}</h2>
          <p class="login-desc">Enter your name to access the account dashboard.</p>
          <form @submit.prevent="doLogin" class="login-form">
            <label class="login-label">Name</label>
            <input v-model="loginName" class="login-input" type="text" placeholder="John Doe" autofocus>
            <label class="login-label">Email (optional)</label>
            <input v-model="loginEmail" class="login-input" type="email" placeholder="john@example.com">
            <button type="submit" class="login-submit" :disabled="!loginName.trim()">{{ t.nav.signIn }}</button>
          </form>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<style scoped>
.app-navbar { background: var(--color-surface); border-bottom: 1px solid var(--color-border); position: sticky; top: 0; z-index: 1000; }
.navbar { padding: 12px 0; }
.navbar-brand { color: var(--color-text); font-size: 20px; font-weight: 700; text-decoration: none; }
.theme-toggle { background: none; border: 1px solid var(--color-border); border-radius: 6px; color: var(--color-text); cursor: pointer; font-size: 16px; margin-left: 8px; padding: 4px 10px; }
.theme-toggle:hover { background: var(--color-tag-bg); }
.lang-switch-group { display: inline-flex; border: 1px solid var(--color-border); border-radius: 6px; margin-left: 6px; overflow: hidden; }
.lang-btn { color: var(--color-text-muted); cursor: pointer; font-size: 12px; font-weight: 600; padding: 4px 10px; text-decoration: none; }
.lang-btn:hover { background: var(--color-tag-bg); color: var(--color-accent); }
.lang-btn.active { background: var(--color-accent); color: #fff; }

/* SIGN IN */
.nav-auth { display: inline-flex; align-items: center; margin-left: 8px; }
.btn-signin { background: var(--color-accent); color: #fff; border: none; border-radius: 6px; padding: 5px 14px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.btn-signin:hover { opacity: 0.85; }
.nav-user { display: flex; align-items: center; gap: 6px; }
.nav-avatar-link { text-decoration: none; }
.nav-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg,var(--color-accent),#3FB950); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px; color: #fff; cursor: pointer; }
.btn-signout { background: none; border: none; color: var(--color-text-muted); font-size: 10px; cursor: pointer; padding: 2px 4px; }
.btn-signout:hover { color: #FF7B72; }

/* LOGIN MODAL */
.login-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 2000; display: flex; align-items: center; justify-content: center; }
.login-modal { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; padding: 32px; width: 380px; max-width: 90vw; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
.login-close { position: absolute; top: 12px; right: 14px; background: none; border: none; font-size: 18px; cursor: pointer; color: var(--color-text-muted); }
.login-title { font-size: 22px; font-weight: 700; margin: 0 0 6px; }
.login-desc { font-size: 13px; color: var(--color-text-muted); margin: 0 0 20px; }
.login-form { display: flex; flex-direction: column; gap: 12px; }
.login-label { font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.login-input { padding: 10px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-size: 14px; background: var(--color-bg); color: var(--color-text); outline: none; }
.login-input:focus { border-color: var(--color-accent); }
.login-submit { background: var(--color-accent); color: #fff; border: none; border-radius: 8px; padding: 12px; font-size: 15px; font-weight: 600; cursor: pointer; }
.login-submit:disabled { opacity: 0.4; cursor: default; }
.login-submit:not(:disabled):hover { opacity: 0.85; }

@media (max-width: 767px) {
  .navbar-collapse { display: none; }
  .navbar-collapse.show { display: block; }
  .nav-auth { margin-left: 0; margin-top: 8px; }
}
</style>

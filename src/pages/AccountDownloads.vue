<script setup lang="ts">
import { useSeo } from "../composables/useSeo"
import { siteConfig } from "../site.config"
import { generateSchema } from "../schema"

const versions = [
  { version: "v2.4.1", date: "May 17, 2026", type: "Stable", size: "18.8 MB", notes: "Image slider + EN shop localization" },
  { version: "v2.4.0", date: "May 1, 2026", type: "Stable", size: "18.5 MB", notes: "Tinkoff payment integration, 30 EN templates" },
  { version: "v2.3.5", date: "Apr 15, 2026", type: "Patch", size: "18.2 MB", notes: "Security fixes, npm audit clean" },
  { version: "v2.3.0", date: "Mar 28, 2026", type: "Stable", size: "18.0 MB", notes: "Dual-domain nginx, hreflang support" },
  { version: "v2.2.0", date: "Mar 10, 2026", type: "Stable", size: "17.5 MB", notes: "Shop demo with 30 products" },
]
const templatesDl = [
  { name: "Purple GEO", version: "v1.2.0", purchased: "May 15, 2026", size: "628 KB" },
  { name: "Tech Azure", version: "v1.0.0", purchased: "May 10, 2026", size: "480 KB" },
  { name: "Midnight Noir", version: "v1.1.0", purchased: "Apr 20, 2026", size: "350 KB" },
]

useSeo({
  title: "Downloads | My Account | " + siteConfig.name,
  description: "Download GitHubCMS releases and purchased templates.",
  path: "/account/downloads/",
  type: "website",
  jsonLd: generateSchema({ url: siteConfig.url, path: "/account/downloads/", title: "Downloads", description: "GitHubCMS downloads", html: "", type: "website" }),
})
</script>

<template>
<main class="account-portal">
  <div class="ac-topbar"><span class="ac-breadcrumb">My Account / <RouterLink to="/account/" class="ac-breadcrumb-link">Dashboard</RouterLink> / Downloads</span></div>
  <div class="ac-content">
    <h1 class="ac-h1">📦 My Downloads</h1>

    <section class="ac-card">
      <h2 class="ac-h2">GitHubCMS Pro — Latest Version</h2>
      <div class="ac-dl-hero">
        <div><span class="ac-version-big">{{ versions[0].version }}</span><span class="ac-badge-pro ac-badge-inline">PRO</span></div>
        <p class="ac-dl-meta">Released {{ versions[0].date }} · {{ versions[0].size }} · {{ versions[0].type }}</p>
        <p class="ac-dl-notes">{{ versions[0].notes }}</p>
        <button class="ac-btn-dl">⬇ Download GitHubCMS Pro {{ versions[0].version }}</button>
      </div>
    </section>

    <section class="ac-card">
      <h2 class="ac-h2">Previous Versions</h2>
      <table class="ac-table">
        <thead><tr><th>Version</th><th>Date</th><th>Type</th><th>Size</th><th></th></tr></thead>
        <tbody>
          <tr v-for="v in versions.slice(1)" :key="v.version">
            <td class="ac-ver">{{ v.version }}</td><td>{{ v.date }}</td><td><span :class="v.type==='Stable'?'ac-tag-green':'ac-tag-blue'">{{ v.type }}</span></td><td>{{ v.size }}</td>
            <td><a href="#" class="ac-dl-btn">⬇ Download</a></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="ac-card">
      <h2 class="ac-h2">Purchased Templates</h2>
      <div class="ac-tpl-grid">
        <div v-for="t in templatesDl" :key="t.name" class="ac-tpl-card">
          <strong>{{ t.name }}</strong>
          <small>{{ t.version }} · Purchased {{ t.purchased }} · {{ t.size }}</small>
          <div class="ac-tpl-actions"><a href="#" class="ac-dl-btn">⬇ Download</a><a href="#" class="ac-dl-btn">📄 Docs</a></div>
        </div>
      </div>
      <div v-if="!templatesDl.length" class="ac-empty"><span>🎨</span><p>No templates purchased yet. <RouterLink to="/templates/">Browse Marketplace →</RouterLink></p></div>
    </section>
  </div>
</main>
</template>

<style scoped>
.account-portal { background: #0D1117; color: #E6EDF3; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
.ac-topbar { display: flex; align-items: center; height: 56px; padding: 0 24px; border-bottom: 1px solid #30363D; background: #161B22; }
.ac-breadcrumb { font-size: 14px; color: #8B949E; }
.ac-breadcrumb-link { color: #58A6FF; text-decoration: none; }
.ac-content { padding: 32px; max-width: 900px; }
.ac-h1 { font-size: 28px; font-weight: 700; margin: 0 0 24px; }
.ac-h2 { font-size: 18px; font-weight: 600; margin: 0 0 16px; }
.ac-card { background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px; }
.ac-dl-hero { padding: 8px 0; }
.ac-version-big { font-size: 28px; font-weight: 800; color: #58A6FF; }
.ac-badge-pro { background: linear-gradient(135deg,#F9B234,#F5820A); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 2px 8px; border-radius: 4px; }
.ac-badge-inline { margin-left: 10px; vertical-align: super; }
.ac-dl-meta { font-size: 13px; color: #8B949E; margin: 8px 0; }
.ac-dl-notes { font-size: 13px; color: #E6EDF3; margin-bottom: 16px; }
.ac-btn-dl { background: #238636; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
.ac-btn-dl:hover { background: #2EA043; }
.ac-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.ac-table th { text-align: left; padding: 10px 12px; border-bottom: 1px solid #30363D; color: #8B949E; font-weight: 600; font-size: 12px; }
.ac-table td { padding: 10px 12px; border-bottom: 1px solid #21262D; }
.ac-ver { color: #58A6FF; font-weight: 600; }
.ac-tag-green { background: #1B4332; color: #3FB950; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.ac-tag-blue { background: #1C3B5E; color: #58A6FF; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
.ac-dl-btn { color: #58A6FF; text-decoration: none; font-size: 12px; }
.ac-tpl-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
.ac-tpl-card { background: #0D1117; border: 1px solid #30363D; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 8px; }
.ac-tpl-card strong { font-size: 14px; }
.ac-tpl-card small { font-size: 12px; color: #8B949E; }
.ac-tpl-actions { display: flex; gap: 12px; }
.ac-empty { text-align: center; padding: 40px; color: #8B949E; }
.ac-empty span { font-size: 40px; display: block; margin-bottom: 8px; }
@media (max-width: 640px) { .ac-content { padding: 16px; } .ac-tpl-grid { grid-template-columns: 1fr; } }
</style>

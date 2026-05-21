<script setup lang="ts">
import { useSeo } from "../composables/useSeo"
import { siteConfig } from "../site.config"
import { generateSchema } from "../schema"

const currentPlan = "pro" as const
const isPro = currentPlan === "pro"

useSeo({
  title: "My Plan | My Account | " + siteConfig.name,
  description: "Manage your GitHubCMS plan and subscription.",
  path: "/account/plan/",
  type: "website",
  jsonLd: generateSchema({ url: siteConfig.url, path: "/account/plan/", title: "My Plan", description: "GitHubCMS plan management", html: "", type: "website" }),
})
</script>

<template>
<main class="account-portal">
  <div class="ac-topbar"><span class="ac-breadcrumb">My Account / <RouterLink to="/account/" class="ac-breadcrumb-link">Dashboard</RouterLink> / My Plan</span></div>
  <div class="ac-content">
    <h1 class="ac-h1">⚡ My Plan</h1>

    <section class="ac-card ac-plan-current">
      <div class="ac-plan-header">
        <span class="ac-plan-badge" :class="isPro?'ac-badge-pro':'ac-badge-free'">{{ isPro ? 'PRO' : 'FREE' }}</span>
        <h2 class="ac-h2">GitHubCMS {{ isPro ? 'Pro' : 'Free' }}</h2>
        <p class="ac-plan-price">{{ isPro ? '$29/month' : 'Free forever' }}</p>
      </div>
      <div class="ac-plan-details">
        <div class="ac-plan-detail"><strong>Plan type:</strong> {{ isPro ? 'Commercial' : 'Personal' }}</div>
        <div class="ac-plan-detail"><strong>Next billing:</strong> {{ isPro ? 'June 17, 2026' : 'N/A' }}</div>
        <div class="ac-plan-detail"><strong>Templates access:</strong> {{ isPro ? 'All 30+ Pro templates' : '1 free template' }}</div>
        <div class="ac-plan-detail"><strong>Support:</strong> {{ isPro ? 'Priority — 24h response' : 'Standard — 72h response' }}</div>
        <div class="ac-plan-detail"><strong>License:</strong> {{ isPro ? 'Commercial — unlimited sites' : 'Personal — 1 site' }}</div>
      </div>
      <div class="ac-plan-actions" v-if="!isPro">
        <button class="ac-btn-upgrade">⚡ Upgrade to Pro — from $29/mo</button>
      </div>
    </section>

    <section class="ac-card">
      <h2 class="ac-h2">Plan Comparison</h2>
      <table class="ac-compare">
        <thead><tr><th>Feature</th><th class="ac-compare-free">Free</th><th class="ac-compare-pro">Pro</th></tr></thead>
        <tbody>
          <tr><td>GitHubCMS core</td><td>✅</td><td>✅</td></tr>
          <tr><td>Markdown CMS</td><td>✅</td><td>✅</td></tr>
          <tr><td>JSON-LD auto-generation</td><td>✅</td><td>✅</td></tr>
          <tr><td>Vite SSG build</td><td>✅</td><td>✅</td></tr>
          <tr><td>Templates</td><td>1 free</td><td>30+ Pro</td></tr>
          <tr><td>Priority support</td><td>❌</td><td>✅</td></tr>
          <tr><td>Commercial license</td><td>❌</td><td>✅</td></tr>
          <tr><td>API access</td><td>❌</td><td>✅</td></tr>
          <tr><td>Template marketplace</td><td>❌</td><td>✅</td></tr>
          <tr><td>Unlimited downloads</td><td>✅</td><td>✅</td></tr>
        </tbody>
      </table>
    </section>
  </div>
</main>
</template>

<style scoped>
.account-portal { background: #0D1117; color: #E6EDF3; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
.ac-topbar { display: flex; align-items: center; height: 56px; padding: 0 24px; border-bottom: 1px solid #30363D; background: #161B22; }
.ac-breadcrumb { font-size: 14px; color: #8B949E; }
.ac-breadcrumb-link { color: #58A6FF; text-decoration: none; }
.ac-content { padding: 32px; max-width: 800px; }
.ac-h1 { font-size: 28px; font-weight: 700; margin: 0 0 24px; }
.ac-h2 { font-size: 18px; font-weight: 600; margin: 0 0 16px; }
.ac-card { background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px; }
.ac-plan-current { border-color: #58A6FF; }
.ac-plan-header { margin-bottom: 20px; }
.ac-badge-pro { background: linear-gradient(135deg,#F9B234,#F5820A); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 2px 8px; border-radius: 4px; }
.ac-badge-free { background: #30363D; color: #8B949E; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
.ac-plan-price { font-size: 24px; font-weight: 700; color: #3FB950; margin-top: 8px; }
.ac-plan-details { margin-top: 16px; }
.ac-plan-detail { padding: 8px 0; border-bottom: 1px solid #21262D; font-size: 13px; }
.ac-plan-detail strong { color: #8B949E; }
.ac-plan-actions { margin-top: 20px; }
.ac-btn-upgrade { background: linear-gradient(135deg,#F9B234,#F5820A); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
.ac-compare { width: 100%; border-collapse: collapse; font-size: 13px; }
.ac-compare th { padding: 10px 12px; border-bottom: 1px solid #30363D; color: #8B949E; font-weight: 600; font-size: 12px; }
.ac-compare td { padding: 10px 12px; border-bottom: 1px solid #21262D; }
.ac-compare-free { background: rgba(139,148,158,0.05); }
.ac-compare-pro { background: rgba(88,166,255,0.06); color: #58A6FF; }
@media (max-width: 640px) { .ac-content { padding: 16px; } }
</style>

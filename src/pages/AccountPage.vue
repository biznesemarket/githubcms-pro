<script setup lang="ts">
import { computed } from "vue"
import { useSeo } from "../composables/useSeo"
import { siteConfig } from "../site.config"
import { generateSchema } from "../schema"
import { useAuth } from "../composables/useAuth"

const { user, isLoggedIn, demoUser } = useAuth()

const currentUser = computed(() => user.value || demoUser)
const isPro = computed(() => currentUser.value.plan === "pro")
const stats = { version: "v2.4.1", templates: 5, supportTickets: 0, downloadCount: 47 }
const recentDownloads = [
  { product: "GitHubCMS Pro", version: "v2.4.1", date: "2026-05-17", status: "Ready" },
  { product: "Purple GEO Template", version: "v1.2.0", date: "2026-05-15", status: "Ready" },
  { product: "GitHubCMS Pro", version: "v2.3.5", date: "2026-05-10", status: "Ready" },
]
const changelog = [
  { date: "2026-05-15", version: "v2.4.1", title: "Image slider + EN shop localization" },
  { date: "2026-05-01", version: "v2.4.0", title: "Tinkoff payment integration" },
  { date: "2026-04-15", version: "v2.3.5", title: "30 EN template descriptions" },
]

useSeo({
  title: "My Account | " + siteConfig.name,
  description: "GitHubCMS Account Portal — Manage your downloads, templates, licenses, and billing.",
  path: "/account/",
  type: "website",
  jsonLd: generateSchema({ url: siteConfig.url, path: "/account/", title: "My Account", description: "GitHubCMS Account Portal", html: "", type: "website" }),
})
</script>

<template>
<main class="account-portal">
  <!-- TOP BAR -->
  <div class="ac-topbar">
    <span class="ac-breadcrumb">My Account / Dashboard</span>
    <div class="ac-topbar-right">
      <span class="ac-bell">🔔</span>
      <div class="ac-avatar">{{ currentUser.avatar }}</div>
    </div>
  </div>

  <div class="ac-layout">
    <!-- SIDEBAR -->
    <aside class="ac-sidebar">
      <div class="ac-sidebar-user">
      <div class="ac-sidebar-avatar">{{ currentUser.avatar }}</div>
      <div class="ac-sidebar-name">{{ currentUser.name }}</div>
      <div class="ac-sidebar-email">{{ currentUser.email }}</div>
      <span class="ac-badge" :class="isPro ? 'ac-badge-pro' : 'ac-badge-free'">{{ isPro ? 'PRO' : 'FREE' }}</span>
      </div>
      <nav class="ac-nav">
        <span class="ac-nav-section">Overview</span>
        <RouterLink to="/account/" class="ac-nav-item active">🏠 Dashboard</RouterLink>
        <RouterLink to="/account/plan/" class="ac-nav-item">⚡ My Plan</RouterLink>
        <span class="ac-nav-section">Product</span>
        <RouterLink to="/account/downloads/" class="ac-nav-item">📦 Downloads</RouterLink>
        <span class="ac-nav-item locked">🎨 My Templates <span class="ac-lock">🔒</span></span>
        <span class="ac-nav-item locked">🔑 Licenses <span class="ac-lock">🔒</span></span>
        <span class="ac-nav-section">Billing</span>
        <span class="ac-nav-item locked">💳 Billing & Subscription <span class="ac-lock">🔒</span></span>
        <span class="ac-nav-section">Account</span>
        <span class="ac-nav-item locked">👤 Profile <span class="ac-lock">🔒</span></span>
        <span class="ac-nav-section">Help</span>
        <span class="ac-nav-item locked">💬 Support <span class="ac-lock">🔒</span></span>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <div class="ac-main">
      <!-- WELCOME BANNER -->
      <section class="ac-hero">
        <div class="ac-hero-text">
          <h1 class="ac-hero-title">Welcome back, {{ currentUser.name }}!</h1>
          <p class="ac-hero-sub">Last login: {{ new Date().toLocaleDateString() }} · {{ isLoggedIn ? 'Signed in' : 'Demo mode' }}</p>
          <span class="ac-badge" :class="isPro ? 'ac-badge-pro' : 'ac-badge-free'">{{ isPro ? 'PRO' : 'FREE' }}</span>
          <span v-if="!isLoggedIn" class="ac-github-link">Demo mode — sign in to personalize</span>
        </div>
        <div v-if="!isPro" class="ac-upgrade-btn">⚡ Upgrade to Pro</div>
      </section>

      <!-- STATS CARDS -->
      <section class="ac-stats">
        <div class="ac-stat-card"><div class="ac-stat-icon">⚡</div><div class="ac-stat-value">{{ isPro ? 'Pro' : 'Free' }}</div><div class="ac-stat-label">My Plan</div><RouterLink to="/account/plan/" class="ac-stat-link">Manage plan →</RouterLink></div>
        <div class="ac-stat-card"><div class="ac-stat-icon">📦</div><div class="ac-stat-value">{{ stats.version }}</div><div class="ac-stat-label">GitHubCMS Version</div><a href="#" class="ac-stat-link">{{ isPro ? 'Download →' : 'Details →' }}</a></div>
        <div class="ac-stat-card"><div class="ac-stat-icon">🎨</div><div class="ac-stat-value">{{ stats.templates }} templates</div><div class="ac-stat-label">{{ isPro ? 'Purchased' : '1 included' }}</div><span class="ac-stat-link muted">My templates →</span></div>
        <div class="ac-stat-card"><div class="ac-stat-icon">💬</div><div class="ac-stat-value">{{ stats.supportTickets === 0 ? 'No open tickets' : stats.supportTickets + ' open' }}</div><div class="ac-stat-label">{{ isPro ? 'Priority Support' : 'Standard Support' }}</div><span class="ac-stat-link muted">Open ticket →</span></div>
      </section>

      <!-- QUICK ACTIONS -->
      <section class="ac-actions">
        <h2 class="ac-h2">Quick Actions</h2>
        <div class="ac-actions-grid">
          <div class="ac-action-card"><span>⬇</span><strong>Download GitHubCMS</strong><small>{{ stats.version }} — latest stable</small></div>
          <RouterLink to="/templates/" class="ac-action-card"><span>🎨</span><strong>Browse Templates</strong><small>30+ templates available</small></RouterLink>
          <div class="ac-action-card"><span>📚</span><strong>Documentation</strong><small>Guides and API reference</small></div>
          <div class="ac-action-card"><span>💬</span><strong>Support</strong><small>Get help with your setup</small></div>
          <div class="ac-action-card"><span>👤</span><strong>Profile Settings</strong><small>Update your info</small></div>
          <div class="ac-action-card"><span>📊</span><strong>Activity Log</strong><small>{{ stats.downloadCount }} total downloads</small></div>
        </div>
      </section>

      <!-- RECENT DOWNLOADS -->
      <section class="ac-table-section">
        <h2 class="ac-h2">Recent Downloads</h2>
        <table class="ac-table" v-if="recentDownloads.length">
          <thead><tr><th>Product</th><th>Version</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr v-for="d in recentDownloads" :key="d.product + d.date">
              <td>{{ d.product }}</td><td>{{ d.version }}</td><td>{{ d.date }}</td><td><span class="ac-status-green">✅ {{ d.status }}</span></td>
              <td><a href="#" class="ac-dl-btn">⬇ Download</a></td>
            </tr>
          </tbody>
        </table>
        <div v-else class="ac-empty"><span>📦</span><p>No downloads yet</p></div>
        <RouterLink to="/account/downloads/" class="ac-view-all">View all downloads →</RouterLink>
      </section>

      <!-- UPGRADE BANNER (for FREE) -->
      <section v-if="!isPro" class="ac-upgrade-banner">
        <div class="ac-upgrade-banner-content">
          <h3>⚡ Get Full Access with GitHubCMS Pro</h3>
          <ul>
            <li>All 30+ premium templates</li>
            <li>Priority support — response within 24h</li>
            <li>Commercial license + unlimited sites</li>
            <li>API access + advanced documentation</li>
          </ul>
          <button class="ac-btn-upgrade">Upgrade to Pro — from $29/mo</button>
        </div>
      </section>

      <!-- CHANGELOG -->
      <section>
        <h2 class="ac-h2">What's New</h2>
        <div class="ac-changelog">
          <div v-for="c in changelog" :key="c.version" class="ac-changelog-item">
            <span class="ac-changelog-date">{{ c.date }}</span>
            <span class="ac-changelog-version">{{ c.version }}</span>
            <span class="ac-changelog-title">{{ c.title }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</main>
</template>

<style scoped>
.account-portal { background: #0D1117; color: #E6EDF3; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
.ac-topbar { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 24px; border-bottom: 1px solid #30363D; background: #161B22; }
.ac-breadcrumb { font-size: 14px; color: #8B949E; }
.ac-topbar-right { display: flex; align-items: center; gap: 16px; }
.ac-bell { font-size: 18px; cursor: pointer; }
.ac-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg,#58A6FF,#3FB950); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #fff; }
.ac-layout { display: flex; }
.ac-sidebar { width: 240px; min-height: calc(100vh - 56px); border-right: 1px solid #30363D; background: #161B22; padding: 16px 0; flex-shrink: 0; }
.ac-sidebar-user { padding: 0 16px 16px; border-bottom: 1px solid #30363D; margin-bottom: 8px; text-align: center; }
.ac-sidebar-avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg,#58A6FF,#F9B234); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; color: #fff; margin: 0 auto 8px; }
.ac-sidebar-name { font-weight: 600; font-size: 14px; }
.ac-sidebar-email { font-size: 12px; color: #8B949E; margin-bottom: 8px; }
.ac-badge { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
.ac-badge-pro { background: linear-gradient(135deg,#F9B234,#F5820A); color: #fff; }
.ac-badge-free { background: #30363D; color: #8B949E; }
.ac-nav { padding: 8px 0; }
.ac-nav-section { display: block; padding: 12px 16px 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #8B949E; }
.ac-nav-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 16px; font-size: 13px; color: #8B949E; text-decoration: none; border-left: 3px solid transparent; }
.ac-nav-item:hover { background: #1C2128; color: #E6EDF3; }
.ac-nav-item.active { color: #58A6FF; background: rgba(88,166,255,0.08); border-left-color: #58A6FF; font-weight: 600; }
.ac-nav-item.locked { color: #484F58; cursor: not-allowed; }
.ac-lock { font-size: 11px; }
.ac-main { flex: 1; padding: 24px 32px; overflow-x: hidden; }
.ac-hero { display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg,#161B22,#1C2128); border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 20px; }
.ac-hero-title { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
.ac-hero-sub { font-size: 13px; color: #8B949E; margin: 0 0 8px; }
.ac-github-link { font-size: 12px; color: #58A6FF; margin-left: 12px; }
.ac-upgrade-btn { background: linear-gradient(135deg,#F9B234,#F5820A); color: #fff; font-weight: 600; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 14px; white-space: nowrap; }
.ac-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 24px; }
.ac-stat-card { background: #161B22; border: 1px solid #30363D; border-radius: 12px; padding: 20px; }
.ac-stat-icon { font-size: 24px; margin-bottom: 8px; }
.ac-stat-value { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.ac-stat-label { font-size: 12px; color: #8B949E; margin-bottom: 8px; }
.ac-stat-link { font-size: 12px; color: #58A6FF; text-decoration: none; }
.ac-stat-link.muted { color: #8B949E; cursor: default; }
.ac-h2 { font-size: 20px; font-weight: 600; margin: 0 0 16px; }
.ac-actions-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 24px; }
.ac-action-card { background: #161B22; border: 1px solid #30363D; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 4px; text-decoration: none; color: inherit; cursor: pointer; }
.ac-action-card:hover { border-color: #58A6FF; }
.ac-action-card strong { font-size: 14px; }
.ac-action-card small { font-size: 11px; color: #8B949E; }
.ac-table-section { margin-bottom: 24px; }
.ac-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.ac-table th { text-align: left; padding: 10px 12px; border-bottom: 1px solid #30363D; color: #8B949E; font-weight: 600; font-size: 12px; }
.ac-table td { padding: 10px 12px; border-bottom: 1px solid #21262D; }
.ac-status-green { color: #3FB950; }
.ac-dl-btn { color: #58A6FF; text-decoration: none; font-size: 12px; }
.ac-empty { text-align: center; padding: 40px; color: #8B949E; }
.ac-empty span { font-size: 40px; display: block; margin-bottom: 8px; }
.ac-view-all { display: inline-block; margin-top: 8px; font-size: 13px; color: #58A6FF; text-decoration: none; }
.ac-upgrade-banner { background: linear-gradient(135deg,#1C2128,#161B22); border: 1px solid #30363D; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
.ac-upgrade-banner h3 { font-size: 18px; font-weight: 700; margin: 0 0 12px; }
.ac-upgrade-banner ul { margin: 0 0 16px; padding-left: 20px; font-size: 13px; line-height: 1.8; color: #8B949E; }
.ac-btn-upgrade { background: linear-gradient(135deg,#F9B234,#F5820A); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
.ac-changelog { font-size: 13px; }
.ac-changelog-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid #21262D; }
.ac-changelog-date { color: #8B949E; min-width: 90px; }
.ac-changelog-version { color: #58A6FF; min-width: 70px; font-weight: 600; }
.ac-changelog-title { color: #E6EDF3; }
@media (max-width: 1024px) { .ac-sidebar { display: none; } .ac-stats { grid-template-columns: repeat(2,1fr); } .ac-actions-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 640px) { .ac-stats { grid-template-columns: 1fr; } .ac-actions-grid { grid-template-columns: 1fr; } .ac-hero { flex-direction: column; gap: 12px; } .ac-main { padding: 16px; } }
</style>

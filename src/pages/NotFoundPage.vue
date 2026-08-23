<script setup lang="ts">
import { useSeo } from "../composables/useSeo";
import { t } from "../i18n";
import PageBanner from "../components/PageBanner.vue";

useSeo(() => ({
  title: "404 — " + t.pageView.notFound,
  description: "",
  path: "/404/",
  type: "website",
}));
</script>

<template>
  <PageBanner :pageTitle="'404'" />
  <main class="page">
    <div class="container py-5 text-center">
      <div style="font-size:6rem;font-weight:800;color:#7c3aed;line-height:1">404</div>
      <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem">{{ t.pageView.notFound }}</h2>
      <p style="color:#5a3e85;max-width:450px;margin:0 auto 1.5rem;font-size:1rem">
        {{ t.notFound.description }}
      </p>
      <RouterLink to="/" class="btn" style="background:#7c3aed;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">
        {{ t.pageView.backToHome }}
      </RouterLink>
    </div>
  </main>
</template>

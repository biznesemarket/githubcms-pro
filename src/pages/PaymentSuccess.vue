<script setup lang="ts">
import { useRoute } from "vue-router";
import { useSeo } from "../composables/useSeo";
import PageBanner from "../components/PageBanner.vue";
import { t } from "../i18n";

const route = useRoute();
const orderId = (route.query.order as string) || "";

useSeo({
  title: t.payment.title,
  description: t.payment.desc,
  path: "/payment/success/",
  type: "website",
});
</script>

<template>
  <PageBanner :pageTitle="t.payment.title" />
  <main class="page text-center">
    <div class="block block-answer mb-4">
      <h3>{{ t.payment.thankYou }}</h3>
      <p v-if="orderId">{{ t.payment.order }} {{ orderId }}</p>
    </div>
    <p>{{ t.payment.emailInstructions }}</p>
    <RouterLink to="/templates/" class="btn btn-primary btn-lg mt-3">{{ t.payment.backToTemplates }}</RouterLink>
  </main>
</template>

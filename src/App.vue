<script setup lang="ts">
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";
import BackToTop from "./components/BackToTop.vue";
import CookieConsent from "./components/CookieConsent.vue";
</script>

<template>
  <AppNavbar />
  <RouterView />
  <AppFooter />
  <BackToTop />
  <CookieConsent />
</template>

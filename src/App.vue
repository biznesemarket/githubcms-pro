<script setup lang="ts">
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";
import BackToTop from "./components/BackToTop.vue";
</script>

<template>
  <AppNavbar />
  <RouterView />
  <AppFooter />
  <BackToTop />
</template>

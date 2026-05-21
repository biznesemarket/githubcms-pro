<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <button
    v-show="visible"
    class="back-to-top"
    type="button"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    ↑
  </button>
</template>

<style scoped>
.back-to-top {
  background: var(--color-accent);
  border: none;
  border-radius: 8px;
  bottom: 24px;
  color: #fff;
  cursor: pointer;
  font-size: 20px;
  height: 40px;
  opacity: 0.9;
  position: fixed;
  right: 24px;
  transition: opacity 0.2s, transform 0.2s;
  width: 40px;
  z-index: 1000;
}

.back-to-top:hover {
  opacity: 1;
  transform: translateY(-2px);
}
</style>

<script setup lang="ts">
import { provide, reactive } from "vue";

const state = reactive({
  count: 0,
  active: null as number | null,
});

provide("accordion", state);
</script>

<template>
  <div class="app-accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ items: { name: string; url?: string }[] }>()
</script>

<template>
  <nav class="bc-nav" aria-label="Хлебные крошки">
    <div class="container">
      <ol class="bc-list">
        <li v-for="(item, idx) in items" :key="idx" class="bc-item">
          <template v-if="item.url">
            <RouterLink :to="item.url" class="bc-link">{{ item.name }}</RouterLink>
            <span class="bc-sep">/</span>
          </template>
          <span v-else class="bc-current">{{ item.name }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<style scoped>
.bc-nav { background: var(--color-bg-muted); border-bottom: 1px solid var(--color-border); padding: 8px 0; }
.bc-list { display: flex; flex-wrap: wrap; font-size: 13px; list-style: none; margin: 0; padding: 0; }
.bc-item { display: flex; align-items: center; }
.bc-link { color: var(--color-accent); text-decoration: none; white-space: nowrap; }
.bc-link:hover { text-decoration: underline; }
.bc-sep { color: var(--color-text-muted); margin: 0 8px; opacity: 0.5; }
.bc-current { color: var(--color-text-muted); white-space: nowrap; }
</style>

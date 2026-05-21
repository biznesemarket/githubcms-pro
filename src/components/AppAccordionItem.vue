<script setup lang="ts">
import { inject, computed, onBeforeMount } from "vue";

interface AccordionState {
  count: number;
  active: number | null;
}

const accordion = inject<AccordionState>("accordion")!;
let index: number;

onBeforeMount(() => {
  index = accordion.count++;
});

const visible = computed(() => accordion.active === index);

function toggle() {
  accordion.active = visible.value ? null : index;
}

function onEnter(el: Element) {
  (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + "px";
}

function onAfterEnter(el: Element) {
  (el as HTMLElement).style.height = "";
}

function onBeforeLeave(el: Element) {
  (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + "px";
}
</script>

<template>
  <div class="app-accordion-item">
    <button
      class="app-accordion-trigger"
      :class="{ active: visible }"
      type="button"
      @click="toggle"
    >
      <slot name="trigger" />
    </button>

    <transition
      name="accordion"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
    >
      <div v-show="visible" class="app-accordion-content">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.app-accordion-trigger {
  background: none;
  border: none;
  cursor: pointer;
  display: block;
  font: inherit;
  padding: 0;
  text-align: left;
  width: 100%;
}

.app-accordion-content {
  overflow: hidden;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease;
}
</style>

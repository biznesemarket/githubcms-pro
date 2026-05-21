<script setup lang="ts">
import { ref } from "vue"

const props = withDefaults(defineProps<{ images: string[]; alt?: string }>(), { alt: "" })

const activeIndex = ref(0)
const hasMultiple = props.images.length > 1

function prev() { activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length }
function next() { activeIndex.value = (activeIndex.value + 1) % props.images.length }
function goTo(i: number) { activeIndex.value = i }
</script>

<template>
  <div class="img-slider">
    <div class="slider-main">
      <button v-if="hasMultiple" class="slider-arrow slider-prev" @click="prev" aria-label="Previous">‹</button>
      <div class="slider-viewport">
        <img
          v-for="(src, i) in images" :key="i" :src="src" :alt="alt + ' — view ' + (i + 1)"
          class="slider-img" :class="{ active: i === activeIndex }" loading="lazy"
        >
      </div>
      <button v-if="hasMultiple" class="slider-arrow slider-next" @click="next" aria-label="Next">›</button>
    </div>
    <div v-if="hasMultiple" class="slider-thumbs">
      <button v-for="(src, i) in images" :key="i" class="slider-thumb" :class="{ active: i === activeIndex }" @click="goTo(i)">
        <img :src="src" :alt="alt + ' thumbnail ' + (i + 1)" loading="lazy">
      </button>
    </div>
  </div>
</template>

<style scoped>
.img-slider { max-width: 600px; }
.slider-main { position: relative; border-radius: 14px; overflow: hidden; background: var(--color-bg-muted); }
.slider-viewport { display: flex; align-items: center; justify-content: center; aspect-ratio: 4/3; }
.slider-img { width: 100%; height: 100%; object-fit: cover; display: none; }
.slider-img.active { display: block; }
.slider-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; background: rgba(0,0,0,0.45); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
.slider-main:hover .slider-arrow { opacity: 1; }
.slider-prev { left: 10px; }
.slider-next { right: 10px; }
.slider-thumbs { display: flex; gap: 8px; margin-top: 10px; overflow-x: auto; padding-bottom: 4px; }
.slider-thumb { flex-shrink: 0; width: 68px; height: 51px; border-radius: 8px; overflow: hidden; border: 2px solid transparent; cursor: pointer; padding: 0; background: none; opacity: 0.55; transition: all 0.2s; }
.slider-thumb:hover { opacity: 0.8; }
.slider-thumb.active { opacity: 1; border-color: var(--color-accent); }
.slider-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>

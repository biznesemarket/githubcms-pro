<script setup lang="ts">
import { ref, onMounted } from "vue"
import { t } from "../i18n"

const STORAGE_KEY = "githubcms_cookie_consent"
const visible = ref(false)

function accept() {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, "1")
  visible.value = false
}

onMounted(() => {
  if (typeof window === "undefined") return
  if (!localStorage.getItem(STORAGE_KEY)) {
    visible.value = true
  }
})
</script>

<template>
  <Transition name="cookie">
    <aside v-if="visible" class="cookie-banner">
      <p class="cookie-banner-text">
        {{ t.cookie.text }}
        <RouterLink to="/privacy/" class="cookie-banner-link">{{ t.footer.privacy }}</RouterLink>.
      </p>
      <button class="cookie-banner-btn" @click="accept">{{ t.cookie.accept }}</button>
    </aside>
  </Transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 680px;
  width: calc(100% - 48px);
  padding: 16px 24px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  font-size: 13px;
  line-height: 1.6;
}

.cookie-banner-text {
  margin: 0;
  flex: 1;
  color: var(--color-text);
}

.cookie-banner-link {
  color: var(--color-accent);
  text-decoration: underline;
  white-space: nowrap;
}

.cookie-banner-btn {
  flex-shrink: 0;
  background: var(--color-accent);
  color: #fff;
  border: none;
  padding: 8px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.cookie-banner-btn:hover {
  opacity: 0.85;
}

.cookie-enter-active {
  transition: all 0.4s ease-out;
}

.cookie-leave-active {
  transition: all 0.25s ease-in;
}

.cookie-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(16px);
}

.cookie-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}

@media (max-width: 640px) {
  .cookie-banner {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    bottom: 12px;
    width: calc(100% - 24px);
    padding: 14px 16px;
    text-align: center;
  }

  .cookie-banner-btn {
    align-self: center;
    width: 100%;
  }
}
</style>

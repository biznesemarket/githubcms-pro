<script setup lang="ts">
import { siteConfig } from "../site.config";
import { t } from "../i18n";
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5>{{ siteConfig.name }}</h5>
          <p class="footer-desc">{{ siteConfig.description }}</p>
          <div class="footer-social" v-if="siteConfig.socialLinks.length">
            <a
              v-for="link in siteConfig.socialLinks"
              :key="link"
              :href="link"
              :title="link"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
            >{{ link.replace('https://', '').split('/')[0] }}</a>
          </div>
        </div>
        <div class="col-md-3">
          <h6>{{ t.footer.pages }}</h6>
          <ul class="footer-links">
            <li><RouterLink to="/">{{ t.footer.home }}</RouterLink></li>
            <li><RouterLink to="/about/">{{ t.footer.about }}</RouterLink></li>
            <li><RouterLink to="/blog/">{{ t.footer.blog }}</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h6>{{ t.footer.more }}</h6>
          <ul class="footer-links">
            <li><RouterLink to="/contact/">{{ t.footer.contact }}</RouterLink></li>
            <li><RouterLink to="/templates/">{{ t.footer.templates }}</RouterLink></li>
            <li><a href="/rss.xml">{{ t.footer.rss }}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} {{ siteConfig.name }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--color-text);
  color: var(--color-bg);
  padding: 48px 0 24px;
}

.app-footer a {
  color: var(--color-bg);
  opacity: 0.8;
  text-decoration: none;
}

.app-footer a:hover {
  opacity: 1;
}

.footer-desc {
  opacity: 0.6;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 32px;
  padding-top: 16px;
}

.footer-bottom p {
  margin: 0;
  opacity: 0.4;
}

.footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
}

.social-link {
  font-size: 13px;
  padding: 2px 0;
}
</style>

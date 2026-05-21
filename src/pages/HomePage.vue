<script setup lang="ts">
import { generateSchema } from "../schema";
import { useSeo } from "../composables/useSeo";
import { articles } from "../content/articles";
import { siteConfig } from "../site.config";
import { slugify } from "../utils/slug";
import { t } from "../i18n";

useSeo({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  type: "website",
  jsonLd: generateSchema({
    url: siteConfig.url,
    path: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    html: "",
    type: "website",
  }),
});
</script>

<template>
  <main>
  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <p class="hero-label">{{ t.home.label }}</p>
          <h1 class="hero-title">{{ t.home.title }}</h1>
          <p class="hero-subtitle">{{ t.home.subtitle }}</p>
          <div class="hero-badges">
            <span class="badge"><i>◆</i> {{ t.home.badgeAiReady }}</span>
            <span class="badge"><i>◆</i> {{ t.home.badgeSitemap }}</span>
            <span class="badge"><i>◆</i> {{ t.home.badgeSchemaOrg }}</span>
            <span class="badge"><i>◆</i> {{ t.home.badgeNoDb }}</span>
          </div>
          <div class="hero-cta">
            <a href="https://github.com/hubcms-dot/githubcms" class="btn btn-primary btn-lg">{{ t.home.ctaStart }}</a>
            <a href="/blog/" class="btn btn-outline ms-3">{{ t.home.ctaGuide }}</a>
          </div>
        </div>
        <div class="col-lg-5 text-center mt-4 mt-lg-0">
          <div class="hero-stat-card">
            <div class="hero-stat-number">≤200ms</div>
            <div class="hero-stat-label">{{ t.home.statTtfbLabel }}</div>
          </div>
          <div class="hero-stat-card mt-3">
            <div class="hero-stat-number">50+</div>
            <div class="hero-stat-label">{{ t.home.statPagesLabel }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ANSWER-FIRST -->
  <section class="block block-answer">
    <div class="container">
      <p class="block-answer-text">{{ t.home.answerFirst }}</p>
    </div>
  </section>

  <!-- KEY FACTS -->
  <section class="section">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <h2 class="section-title">{{ t.home.keyFactsTitle }}</h2>
          <p class="section-desc">{{ t.home.keyFactsDesc }}</p>
        </div>
        <div class="col-lg-7">
          <div class="facts-grid">
            <div class="fact-card">
              <div class="fact-number">0</div>
              <div class="fact-text">{{ t.home.fact0 }}</div>
            </div>
            <div class="fact-card">
              <div class="fact-number">100%</div>
              <div class="fact-text">{{ t.home.fact100pct }}</div>
            </div>
            <div class="fact-card">
              <div class="fact-number">51</div>
              <div class="fact-text">{{ t.home.fact51 }}</div>
            </div>
            <div class="fact-card">
              <div class="fact-number">68KB</div>
              <div class="fact-text">{{ t.home.fact68kb }}</div>
            </div>
            <div class="fact-card">
              <div class="fact-number">10</div>
              <div class="fact-text">{{ t.home.fact10 }}</div>
            </div>
            <div class="fact-card">
              <div class="fact-number">2.8s</div>
              <div class="fact-text">{{ t.home.fact28s }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED SNIPPET + DEFINITION -->
  <section class="section bg-muted">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <h3 class="fs-title">{{ t.home.whatIsTitle }}</h3>
          <div class="featured-snippet">
            <p>{{ t.home.whatIsText }}</p>
          </div>
        </div>
        <div class="col-lg-6">
          <h3 class="fs-title">{{ t.home.comparisonTitle }}</h3>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead><tr><th>{{ t.home.comparisonParam }}</th><th>{{ t.home.comparisonWordPress }}</th><th>{{ siteConfig.name }}</th></tr></thead>
              <tbody>
                <tr><td>{{ t.home.comparisonRowDb }}</td><td>{{ t.home.comparisonRowDbWp }}</td><td><strong>{{ t.home.comparisonRowDbCms }}</strong></td></tr>
                <tr><td>{{ t.home.comparisonRowSpeed }}</td><td>{{ t.home.comparisonRowSpeedWp }}</td><td><strong>{{ t.home.comparisonRowSpeedCms }}</strong></td></tr>
                <tr><td>{{ t.home.comparisonRowJsonLd }}</td><td>{{ t.home.comparisonRowJsonLdWp }}</td><td><strong>{{ t.home.comparisonRowJsonLdCms }}</strong></td></tr>
                <tr><td>{{ t.home.comparisonRowVersion }}</td><td>{{ t.home.comparisonRowVersionWp }}</td><td><strong>{{ t.home.comparisonRowVersionCms }}</strong></td></tr>
                <tr><td>{{ t.home.comparisonRowHosting }}</td><td>{{ t.home.comparisonRowHostingWp }}</td><td><strong>{{ t.home.comparisonRowHostingCms }}</strong></td></tr>
                <tr><td>{{ t.home.comparisonRowSecurity }}</td><td>{{ t.home.comparisonRowSecurityWp }}</td><td><strong>{{ t.home.comparisonRowSecurityCms }}</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section">
    <div class="container">
      <h2 class="section-title text-center mb-5">{{ t.home.howItWorksTitle }}</h2>
      <div class="row">
        <div class="col-md-3">
          <div class="step-card">
            <div class="step-number">1</div>
            <h4>{{ t.home.step1Title }}</h4>
            <p>{{ t.home.step1Desc }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="step-card">
            <div class="step-number">2</div>
            <h4>{{ t.home.step2Title }}</h4>
            <p>{{ t.home.step2Desc }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="step-card">
            <div class="step-number">3</div>
            <h4>{{ t.home.step3Title }}</h4>
            <p>{{ t.home.step3Desc }}</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="step-card">
            <div class="step-number">4</div>
            <h4>{{ t.home.step4Title }}</h4>
            <p>{{ t.home.step4Desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LATEST ARTICLES -->
  <section class="section bg-muted">
    <div class="container">
      <h2 class="section-title mb-4">{{ t.home.latestArticles }}</h2>
      <div class="row">
        <div v-for="item in articles.slice(0, 6)" :key="item.frontmatter.slug" class="col-md-6 col-lg-4 mb-3">
          <div class="article-card">
            <h3>
              <RouterLink :to="`/blog/${item.frontmatter.slug}/`">
                {{ item.frontmatter.title }}
              </RouterLink>
            </h3>
            <p class="card-desc">{{ item.frontmatter.description }}</p>
            <div class="card-meta">
              <span>{{ item.frontmatter.date }}</span>
              <span class="meta-sep">{{ item.readingTime }} min read</span>
              <RouterLink
                v-if="item.frontmatter.category"
                :to="`/category/${slugify(item.frontmatter.category)}/`"
                class="meta-link"
              >{{ item.frontmatter.category }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <RouterLink to="/blog/" class="btn btn-primary">{{ t.home.allArticles }}</RouterLink>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="block block-cta text-center">
    <div class="container">
      <h2 class="cta-title">{{ t.home.ctaTitle }}</h2>
      <p class="cta-desc">{{ t.home.ctaDesc }}</p>
      <div class="cta-buttons">
        <a href="https://github.com/hubcms-dot/githubcms" class="btn btn-light btn-lg me-3">{{ t.home.ctaRepo }}</a>
        <RouterLink to="/blog/deploy-vps-nginx-ssl/" class="btn btn-outline-light btn-lg">{{ t.home.ctaDeployGuide }}</RouterLink>
      </div>
    </div>
  </section>
  </main>
</template>

<style scoped>
/* HERO */
.hero {
  background: linear-gradient(135deg, var(--color-text) 0%, #2d3748 100%);
  color: #fff;
  padding: 80px 0 60px;
}
.hero-label {
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.8;
}
.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.15;
  margin: 12px 0 16px;
}
.hero-subtitle {
  color: rgba(255,255,255,0.8);
  font-size: 17px;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 600px;
}
.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}
.hero-badges .badge {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  color: rgba(255,255,255,0.9);
  font-size: 13px;
  padding: 6px 16px;
}
.hero-badges .badge i {
  color: var(--color-accent);
  margin-right: 6px;
}
.hero-cta {
  display: flex;
  align-items: center;
}
.hero-cta .btn-outline {
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
}
.hero-cta .btn-outline:hover {
  background: rgba(255,255,255,0.1);
}
.hero-stat-card {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 20px;
  text-align: left;
}
.hero-stat-number {
  color: var(--color-accent);
  font-size: 36px;
  font-weight: 700;
}
.hero-stat-label {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
}

/* ANSWER BLOCK */
.block-answer {
  background: var(--color-answer-bg);
  color: var(--color-answer-text);
  padding: 40px 0;
}
.block-answer-text {
  font-size: 19px;
  font-weight: 600;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 800px;
}

/* SECTIONS */
.section {
  padding: 64px 0;
}
.bg-muted { background: var(--color-bg-muted); }
.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}
.section-desc {
  color: var(--color-text-secondary);
  font-size: 15px;
}

/* FACTS GRID */
.facts-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
}
.fact-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 20px;
}
.fact-number {
  color: var(--color-accent);
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 4px;
}
.fact-text {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.4;
}

/* FEATURED SNIPPET */
.fs-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}
.featured-snippet {
  background: var(--color-surface);
  border-left: 4px solid var(--color-accent);
  border-radius: 0 8px 8px 0;
  padding: 20px;
}
.featured-snippet p {
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

/* STEPS */
.step-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 24px;
  height: 100%;
}
.step-number {
  background: var(--color-accent);
  border-radius: 50%;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  height: 40px;
  margin-bottom: 12px;
  width: 40px;
}
.step-card h4 {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
}
.step-card p {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

/* ARTICLES */
.article-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  height: 100%;
  padding: 20px;
}
.article-card h3 {
  font-size: 16px;
  margin: 0 0 6px;
}
.article-card h3 a {
  color: var(--color-text);
  text-decoration: none;
}
.article-card h3 a:hover {
  color: var(--color-accent);
}
.card-desc {
  color: var(--color-text-secondary);
  font-size: 13px;
  margin: 0 0 8px;
}
.card-meta {
  color: var(--color-text-muted);
  font-size: 12px;
}
.meta-sep { margin-left: 10px; }
.meta-link { color: var(--color-accent); margin-left: 10px; text-decoration: none; }
.meta-link:hover { text-decoration: underline; }

/* CTA */
.block-cta {
  background: var(--color-cta-bg);
  color: var(--color-cta-text);
  padding: 64px 0;
}
.cta-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}
.cta-desc {
  font-size: 16px;
  margin-bottom: 24px;
  opacity: 0.8;
}
.cta-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}
.btn-outline-light {
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  color: #fff;
  padding: 12px 24px;
  text-decoration: none;
}
.btn-outline-light:hover {
  background: rgba(255,255,255,0.1);
}
</style>

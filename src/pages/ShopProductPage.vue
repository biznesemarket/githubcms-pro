<script setup lang="ts">
import { computed } from "vue"
import { useSeo } from "../composables/useSeo"
import { siteConfig } from "../site.config"
import { generateSchema } from "../schema"
import { pages } from "../content/pages"
import BreadcrumbNav from "../components/BreadcrumbNav.vue"
import ImageSlider from "../components/ImageSlider.vue"
import { t } from "../i18n"
import { loadTinkoffScript, openPayment } from "../composables/usePayment"

const props = defineProps<{ section: string; slug: string }>()

const product = computed(() => {
  const p = (pages as any).find((p: any) => p.frontmatter?.layout === "product" && p.frontmatter?.slug === props.slug)
  if (!p) return undefined
  const fm = p.frontmatter || {}
  return {
    id: fm.id || "",
    slug: fm.slug,
    name: fm.title || "",
    origin: fm.origin || "",
    sectionSlug: fm.section || "",
    sectionTitle: fm.section_title || "",
    templateStyle: fm.template_style || 1,
    price: fm.price || 0,
    img: fm.image || "",
    desc: fm.description || "",
    ldesc: p.html || "",
    cat: fm.category || "",
    tags: fm.tags || [],
    specs: fm.specs || [],
    bens: fm.benefits || [],
    htu: fm.howto || [],
    faq: fm.faq || [],
    revs: (fm.reviews || []).map((r: any) => ({ author: r.author, r: r.rating, text: r.text, date: r.date })),
  }
})
const productName = computed(() => product.value?.name || "")
const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n)
const priceFormatted = computed(() => product.value ? product.value.price.toLocaleString("ru-RU") + ' ₽' : '')

function variantImages(img: string): string[] {
  const m = img.match(/\/api\/v1\/(\d+x\d+)\/(.+)$/);
  if (!m) return [img];
  const [_, dims, base] = m;
  return [
    img,
    `https://pixinlink.ru/api/v1/${dims}/${base}-right-view`,
    `https://pixinlink.ru/api/v1/${dims}/${base}-left-view`,
  ];
}

const productImages = computed(() => product.value ? variantImages(product.value.img) : [])

const breadcrumbItems = computed(() => [
  { name: t.breadcrumb.home, url: "/" },
  { name: t.breadcrumb.shop, url: "/shop/" },
  { name: product.value?.sectionTitle ?? "", url: "/shop/" + (product.value?.sectionSlug ?? "") + "/" },
  { name: productName.value || "" },
])

useSeo(() => {
  const p = product.value
  if (!p) return { title: siteConfig.name, description: siteConfig.description, path: '/shop/' }
  const path = '/shop/' + p.sectionSlug + '/' + p.slug + '/'
  const jsonLd = generateSchema({
    url: new URL(path, siteConfig.url).toString(), path, title: p.name, description: p.desc, html: "", type: "product", image: p.img,
    product: { id: p.id, name: p.name, price: p.price, currency: "RUB", image: p.img, description: p.ldesc,
      specs: p.specs.map((s: { n: string; v: string }) => ({ name: s.n, value: s.v })),
      reviews: p.revs?.map((r: { author: string; r: number; text: string; date: string }) => ({ author: r.author, rating: r.r, text: r.text, date: r.date })),
      faq: p.faq?.map((f: { q: string; a: string }) => ({ question: f.q, answer: f.a })),
    },
  })
  return { title: p.name + ' | ' + siteConfig.name, description: p.desc, path, type: 'website', image: p.img, jsonLd }
})

const isStyle = (s: number) => product.value?.templateStyle === s

function buyProduct() {
  const p = product.value
  if (!p) return
  if (!siteConfig.tinkoffTerminalKey) {
    alert(t.shop.paymentDesc)
    return
  }
  loadTinkoffScript().then(() => {
    openPayment({
      terminalKey: siteConfig.tinkoffTerminalKey,
      amount: p.price * 100,
      orderId: `shop-${p.slug}-${Date.now()}`,
      description: `${p.name} (${p.id})`,
    })
  }).catch(() => {
    alert(t.shop.paymentDesc)
  })
}
</script>

<template>
  <main v-if="!product" class="py-5 text-center"><h2>{{ t.shop.productNotFound }}</h2></main>
  <main v-else>
    <BreadcrumbNav :items="breadcrumbItems" />
    <!-- === UNIFIED PRODUCT LAYOUT === -->
    <section class="hero-section" :class="'hero-style-' + product.templateStyle">
      <div class="container" :class="product.templateStyle === 5 ? '' : 'py-4'">
        <div class="hero-inner" :class="'hero-layout-' + product.templateStyle">
          <div class="hero-image"><ImageSlider :images="productImages" :alt="product.name" /></div>
          <div class="hero-info">
            <p class="hero-sku">{{ t.shop.sku }} {{ product.id }}<span v-if="product.origin"> · {{ t.countryOfOrigin }}: {{ product.origin }}</span></p>
            <h1 class="hero-name">{{ productName }}</h1>
            <p class="hero-desc">{{ isStyle(5) ? product.desc : product.ldesc }}</p>
            <div class="hero-price-row">
              <span class="hero-price">{{ priceFormatted }}</span>
              <span v-if="isStyle(1)||isStyle(4)" class="hero-stock">{{ t.shop.inStock }}</span>
            </div>
            <button class="hero-buy-btn" @click="buyProduct">{{ t.shop.pay }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Specs table -->
    <section class="specs-section" :class="'specs-style-' + product.templateStyle">
      <div class="container"><h2 class="section-h2">{{ t.shop.specifications }}</h2>
        <div class="specs-content">
          <div v-if="isStyle(5)" class="specs-grid-compact">
            <div v-for="s in product.specs" :key="s.n" class="spec-item-compact"><span>{{ s.n }}</span><span>{{ s.v }}</span></div>
          </div>
          <table v-else class="specs-table" :class="{ 'table-striped': isStyle(1), 'table-sm': isStyle(2)||isStyle(4) }">
            <tbody><tr v-for="s in product.specs" :key="s.n"><td>{{ s.n }}</td><td>{{ s.v }}</td></tr></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Description -->
    <section v-if="!isStyle(5)" class="desc-section" :class="{ 'bg-style-2': isStyle(2), 'dark-bg': isStyle(3) }">
      <div class="container"><h2 class="section-h2">{{ t.shop.description }}</h2><p class="desc-text">{{ product.ldesc }}</p></div>
    </section>

    <!-- Benefits -->
    <section v-if="product.bens.length && (isStyle(2)||isStyle(4))" class="bens-section" :class="{ 'bg-style-2': isStyle(2) }">
      <div class="container"><h2 class="section-h2">{{ isStyle(2) ? t.shop.benefits : t.shop.description }}</h2>
        <div class="row g-3"><div v-for="b in product.bens" :key="b.title" class="col-md-4"><div class="ben-card"><span class="ben-icon">{{ b.icon }}</span><h5>{{ b.title }}</h5><p>{{ b.d }}</p></div></div></div>
      </div>
    </section>

    <!-- How to use -->
    <section v-if="product.htu.length && isStyle(1)" class="howto-section bg-style-2">
      <div class="container"><h2 class="section-h2">{{ t.shop.howToUse }}</h2>
        <div class="row g-4"><div v-for="s in product.htu" :key="s.s" class="col-md-6"><div class="step-row"><div class="step-badge">{{ s.s }}</div><div><h5>{{ s.t }}</h5><p>{{ s.d }}</p></div></div></div></div>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="product.faq.length" class="faq-section" :class="{ 'bg-style-2': isStyle(1)||isStyle(5), 'dark-bg': isStyle(3) }">
      <div class="container"><h2 class="section-h2">{{ t.shop.faq }}</h2>
        <div class="faq-grid"><div v-for="f in product.faq" :key="f.q" class="faq-card" :class="'faq-' + product.templateStyle"><strong>{{ f.q }}</strong><p>{{ f.a }}</p></div></div>
      </div>
    </section>

    <!-- Reviews -->
    <section v-if="product.revs.length" class="reviews-section" :class="{ 'bg-style-2': isStyle(1)||isStyle(2), 'dark-bg': isStyle(3) }">
      <div class="container"><h2 class="section-h2">{{ t.shop.reviews }}</h2>
        <div class="row g-3"><div v-for="r in product.revs" :key="r.author" class="col-md-4"><div class="review-card"><div class="review-stars">{{ stars(r.r) }}</div><p class="review-text">{{ r.text }}</p><small>{{ r.author }} · {{ r.date }}</small></div></div></div>
      </div>
    </section>

    <!-- Delivery -->
    <section v-if="isStyle(1)||isStyle(3)||isStyle(4)" class="delivery-section" :class="{ 'dark-bg-alt': isStyle(3) }">
      <div class="container"><div class="row g-4 text-center">
        <div class="col-md-4"><div class="delivery-item"><span>🚚</span><h5>{{ t.shop.delivery }}</h5><p>{{ t.shop.deliveryDesc }}</p></div></div>
        <div class="col-md-4"><div class="delivery-item"><span>💳</span><h5>{{ t.shop.payment }}</h5><p>{{ t.shop.paymentDesc }}</p></div></div>
        <div class="col-md-4"><div class="delivery-item"><span>🔄</span><h5>{{ t.shop.return }}</h5><p>{{ t.shop.returnDesc }}</p></div></div>
      </div></div>
    </section>

    <!-- Delivery compact for styles 2,5 -->
    <section v-if="isStyle(2)||isStyle(5)" class="delivery-compact bg-style-2"><div class="container"><div class="d-flex flex-wrap justify-content-center gap-4 text-center" style="font-size:13px"><div>🚚 {{ t.shop.deliveryCompact }}</div><div>💳 {{ t.shop.paymentCompact }}</div><div>🔄 {{ t.shop.returnCompact }}</div></div></div></section>

    <!-- SHOP INFO: Delivery / Returns / Security -->
    <section class="shop-info-section bg-style-2 py-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="shop-info-card">
              <h5>🚚 {{ t.shop.delivery }}</h5>
              <p>{{ t.deliveryFull }}</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="shop-info-card">
              <h5>🔄 {{ t.shop.return }}</h5>
              <p>{{ t.returnFull }}</p>
              <p class="shop-info-steps">{{ t.returnSteps }}</p>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="shop-info-card">
              <h5>🔒 {{ t.securityTitle }}</h5>
              <p>{{ t.securityDesc }} <RouterLink to="/privacy/" style="color:var(--color-accent)">{{ t.footer.privacy }}</RouterLink>.</p>
              <p class="shop-info-steps">{{ t.exportNotice }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Legal footer strip -->
    <section class="shop-legal-strip">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span class="shop-legal-text">{{ t.shopLegal }}</span>
          <RouterLink to="/contact/" class="shop-legal-link">{{ t.shopSupport }}</RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section" :class="'cta-style-' + product.templateStyle">
      <div class="container"><div class="cta-inner"><p class="cta-name">{{ productName }} — {{ priceFormatted }}</p><a href="#" class="cta-buy-btn" @click.prevent="buyProduct">{{ t.shop.pay }}</a><p v-if="isStyle(1)||isStyle(3)||isStyle(5)" class="cta-sku">{{ t.shop.sku }} {{ product.id }}{{ isStyle(1)||isStyle(5) ? ' | ' + product.sectionTitle : '' }}</p></div></div>
    </section>
  </main>
</template>

<style scoped>
/* === HERO STYLES === */
.hero-section { color: #fff; min-height: 300px; }
.hero-style-1 { background: var(--color-bg); color: var(--color-text); padding: 48px 0; }
.hero-style-2 { background: var(--color-bg-muted); color: var(--color-text); padding: 32px 0; }
.hero-style-3 { background: linear-gradient(135deg,#0f0720,#2d1060,#1a0a2e); padding: 48px 0; }
.hero-style-4 { background: var(--color-surface); color: var(--color-text); padding: 40px 0; }
.hero-style-5 { background: linear-gradient(135deg,#0f0720,#2d1060); padding: 36px 0; }
.hero-inner { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; }
.hero-layout-2 { flex-direction: row-reverse; }
.hero-layout-4 { flex-direction: row-reverse; }
.hero-image { flex: 0 0 45%; min-width: 300px; }
.hero-image :deep(.img-slider) { max-width: 100%; }
.hero-info { flex: 1; min-width: 280px; }
.hero-sku { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; margin: 0; }
.hero-name { font-size: 32px; font-weight: 800; margin: 8px 0; line-height: 1.2; }
.hero-desc { font-size: 15px; opacity: 0.85; line-height: 1.7; margin: 12px 0; }
.hero-price-row { display: flex; align-items: center; gap: 16px; margin: 16px 0; }
.hero-price { font-size: 28px; font-weight: 800; color: var(--color-accent); }
.hero-stock { font-size: 13px; padding: 4px 12px; border-radius: 20px; background: rgba(25,135,84,0.15); color: #198754; }
.hero-buy-btn { display: inline-block; padding: 12px 40px; font-size: 16px; font-weight: 700; border: none; border-radius: 12px; background: linear-gradient(135deg,var(--color-accent),var(--color-accent-hover)); color: #fff; cursor: pointer; }

/* === SECTIONS === */
.section-h2 { font-size: 26px; font-weight: 800; margin-bottom: 20px; }
.specs-section { padding: 48px 0; }
.specs-content { max-width: 700px; }
.specs-table { width: 100%; border-collapse: collapse; }
.specs-table td { padding: 12px 16px; border-bottom: 1px solid var(--color-border); font-size: 14px; }
.specs-table td:first-child { font-weight: 600; width: 40%; color: var(--color-text-muted); }
.specs-table.table-striped tr:nth-child(even) { background: var(--color-bg-muted); }
.specs-table.table-sm td { padding: 8px 12px; font-size: 13px; }
.specs-grid-compact { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.spec-item-compact { display: flex; justify-content: space-between; padding: 8px 12px; background: var(--color-bg-muted); border-radius: 8px; font-size: 13px; }
.spec-item-compact span:first-child { color: var(--color-text-muted); }
.desc-section { padding: 48px 0; }
.desc-text { font-size: 15px; line-height: 1.8; color: var(--color-text-muted); max-width: 750px; }
.bens-section { padding: 48px 0; }
.ben-card { text-align: center; padding: 24px 16px; }
.ben-icon { font-size: 36px; display: block; margin-bottom: 8px; }
.ben-card h5 { font-size: 16px; margin: 0 0 4px; }
.ben-card p { font-size: 13px; color: var(--color-text-muted); margin: 0; }
.howto-section { padding: 48px 0; }
.step-row { display: flex; gap: 16px; align-items: flex-start; }
.step-badge { flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; background: var(--color-accent); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
.step-row h5 { font-size: 15px; margin: 0 0 4px; }
.step-row p { font-size: 13px; color: var(--color-text-muted); margin: 0; }
.faq-section { padding: 48px 0; }
.faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.faq-card { padding: 20px; border-radius: 12px; background: var(--color-surface); border: 1px solid var(--color-border); }
.faq-card strong { display: block; font-size: 15px; margin-bottom: 6px; }
.faq-card p { font-size: 13px; color: var(--color-text-muted); margin: 0; }
.faq-3 strong, .faq-5 strong { color: var(--color-accent); }
.reviews-section { padding: 48px 0; }
.review-card { padding: 20px; border-radius: 12px; background: var(--color-surface); border: 1px solid var(--color-border); }
.review-stars { color: #f59e0b; font-size: 16px; margin-bottom: 8px; }
.review-text { font-size: 14px; line-height: 1.6; margin-bottom: 8px; }
.review-card small { font-size: 12px; color: var(--color-text-muted); }
.delivery-section { padding: 48px 0; }
.delivery-item { padding: 16px; }
.delivery-item span { font-size: 28px; display: block; margin-bottom: 8px; }
.delivery-item h5 { font-size: 16px; margin: 0 0 4px; }
.delivery-item p { font-size: 13px; color: var(--color-text-muted); margin: 0; }
.delivery-compact { padding: 16px 0; }
.cta-section { padding: 24px 0; border-top: 1px solid var(--color-border); position: sticky; bottom: 0; background: var(--color-surface); z-index: 100; }
.cta-inner { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.cta-name { font-size: 16px; font-weight: 600; margin: 0; flex: 1; min-width: 200px; }
.cta-buy-btn { display: inline-block; padding: 10px 32px; font-size: 15px; font-weight: 700; border-radius: 10px; background: linear-gradient(135deg,var(--color-accent),var(--color-accent-hover)); color: #fff; text-decoration: none; }
.cta-sku { font-size: 12px; opacity: 0.5; margin: 0; width: 100%; }
.bg-style-2 { background: var(--color-bg-muted); }
.dark-bg { background: #0a0414; color: #fff; }
.dark-bg .desc-text, .dark-bg p, .dark-bg small { color: rgba(255,255,255,0.7) !important; }
.dark-bg h2 { color: #fff; }
.dark-bg-alt { background: #0f0720; }
.hero-style-3 .hero-sku, .hero-style-5 .hero-sku { opacity: 0.5; color: #c4b5fd; }
.hero-style-3 .hero-name, .hero-style-5 .hero-name { color: #fff; }
.hero-style-3 .hero-desc, .hero-style-5 .hero-desc { color: rgba(255,255,255,0.75); }
.hero-style-3 .hero-buy-btn, .hero-style-5 .hero-buy-btn { background: #c4b5fd; color: #0f0720; }
@media (max-width: 768px) {
  .hero-inner { flex-direction: column; }
  .hero-image { flex: unset; width: 100%; min-width: unset; }
  .faq-grid { grid-template-columns: 1fr; }
  .cta-inner { flex-direction: column; text-align: center; }
}
.shop-info-card { padding: 20px; border-radius: 12px; background: var(--color-surface); border: 1px solid var(--color-border); height: 100%; }
.shop-info-card h5 { font-size: 15px; margin: 0 0 8px; }
.shop-info-card p { font-size: 13px; color: var(--color-text-muted); line-height: 1.6; margin: 0; }
.shop-info-steps { font-size: 12px !important; color: var(--color-text-muted); margin-top: 10px !important; padding-top: 10px; border-top: 1px dashed var(--color-border); }
.shop-legal-strip { padding: 12px 0; background: var(--color-bg-muted); border-top: 1px solid var(--color-border); font-size: 12px; }
.shop-legal-text { color: var(--color-text-muted); }
.shop-legal-link { color: var(--color-accent); text-decoration: none; font-weight: 600; white-space: nowrap; }
.shop-legal-link:hover { text-decoration: underline; }
</style>

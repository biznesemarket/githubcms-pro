<script setup lang="ts">
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import { t } from "../i18n";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";

const shopSections = t.shop.sections as readonly { slug: string; title: string; desc: string; icon: string; image: string }[];

useSeo(() => ({
  title: `${t.shop.seoTitle} | ${siteConfig.name}`,
  description: t.shop.seoDescription,
  path: "/shop/",
  type: "website",
}));
</script>

<template>
<main>
  <BreadcrumbNav :items="[{ name: t.breadcrumb.home, url: '/' }, { name: t.breadcrumb.shop }]" />
  <!-- HERO -->
  <section class="py-5 text-white" style="background:linear-gradient(135deg,#0f0720,#2d1060,#4c1d95);min-height:320px">
    <div class="container">
      <div class="row align-items-center" style="min-height:280px">
        <div class="col-lg-7">
          <p class="text-uppercase mb-2 fw-bold opacity-75" style="font-size:12px;letter-spacing:3px;color:#c4b5fd">{{ t.nav.shop }}</p>
          <h1 class="fw-bold mb-3" style="font-size:40px;line-height:1.2">{{ t.shop.heroTitle }}</h1>
          <p class="lead opacity-85" style="max-width:540px;font-size:17px">{{ t.shop.heroDesc }}</p>
        </div>
        <div class="col-lg-5 text-center mt-4 mt-lg-0">
          <div class="d-inline-block p-4 rounded-4" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px)">
            <span style="font-size:48px">🛒</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- DESCRIPTION -->
  <section class="py-4" style="background:var(--color-bg-muted)">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <p style="font-size:15px;line-height:1.8;color:var(--color-text-muted)">
            {{ t.shop.longDescription }}
          </p>
        </div>
        <div class="col-lg-4">
          <div class="row g-3">
            <div class="col-6">
              <div class="rounded-3 p-3 text-center" style="background:var(--color-surface);border:1px solid var(--color-border)">
                <div class="fw-bold" style="font-size:22px;color:var(--color-accent)">5</div>
                <div class="small" style="color:var(--color-text-muted);font-size:12px">{{ t.shop.sectionsLabel }}</div>
              </div>
            </div>
            <div class="col-6">
              <div class="rounded-3 p-3 text-center" style="background:var(--color-surface);border:1px solid var(--color-border)">
                <div class="fw-bold" style="font-size:22px;color:var(--color-accent)">30</div>
                <div class="small" style="color:var(--color-text-muted);font-size:12px">{{ t.shop.productsLabel }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECTIONS GRID -->
  <section id="sections" class="py-4">
    <div class="container">
      <h2 class="fw-bold mb-1" style="font-size:28px">{{ t.shop.sectionsHeading }}</h2>
      <p class="text-muted mb-4" style="font-size:15px">{{ t.shop.sectionsDesc }}</p>
      <div class="row g-4">
        <div v-for="section in shopSections" :key="section.slug" class="col-md-6 col-lg-4">
          <RouterLink :to="`/shop/${section.slug}/`" class="text-decoration-none">
            <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden;transition:transform 0.2s">
              <img :src="section.image" :alt="section.title" style="height:180px;object-fit:cover;width:100%" loading="lazy">
              <div class="card-body d-flex flex-column p-4">
                <div class="mb-2" style="font-size:28px">{{ section.icon }}</div>
                <h4 class="fw-bold mb-2" style="font-size:17px;color:var(--color-text)">{{ section.title }}</h4>
                <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">{{ section.desc }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- DELIVERY INFO -->
  <section class="py-4" style="background:var(--color-bg-muted)">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="d-flex"><span class="me-3" style="font-size:28px">🚚</span><div><h5 class="fw-bold mb-1" style="font-size:15px">{{ t.shop.delivery }}</h5><p class="mb-0" style="font-size:13px;color:var(--color-text-muted)">{{ t.shop.deliveryDesc }}</p></div></div>
        </div>
        <div class="col-md-4">
          <div class="d-flex"><span class="me-3" style="font-size:28px">💳</span><div><h5 class="fw-bold mb-1" style="font-size:15px">{{ t.shop.payment }}</h5><p class="mb-0" style="font-size:13px;color:var(--color-text-muted)">{{ t.shop.paymentDesc }}</p></div></div>
        </div>
        <div class="col-md-4">
          <div class="d-flex"><span class="me-3" style="font-size:28px">🔄</span><div><h5 class="fw-bold mb-1" style="font-size:15px">{{ t.shop.return }}</h5><p class="mb-0" style="font-size:13px;color:var(--color-text-muted)">{{ t.shop.returnDesc }}</p></div></div>
        </div>
      </div>
    </div>
  </section>

  <!-- PAYMENT & SECURITY -->
  <section class="py-4">
    <div class="container">
      <div class="text-center mb-3">
        <h2 class="fw-bold" style="font-size:22px">{{ t.paymentSecurityTitle }}</h2>
        <p class="text-muted mx-auto" style="font-size:14px;max-width:650px">{{ t.paymentSecurityDesc }}</p>
      </div>
      <div class="d-flex flex-wrap justify-content-center align-items-center gap-4 py-2">
        <a :href="t.tbankLink" target="_blank" rel="noopener noreferrer" class="payment-bank-logo">T-Bank</a>
        <span class="payment-card-logo">Visa</span>
        <span class="payment-card-logo">Mastercard</span>
        <span class="payment-card-logo">МИР</span>
        <span class="payment-card-logo">T-Pay</span>
      </div>
      <p class="text-center mt-3" style="font-size:12px;color:var(--color-text-muted)">
        {{ t.securityDesc }} <RouterLink to="/privacy/" style="color:var(--color-accent)">{{ t.footer.privacy }}</RouterLink>.
      </p>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-4 text-center text-white" style="background:linear-gradient(135deg,#0f0720,#2d1060)">
    <div class="container py-3">
      <h2 class="fw-bold mb-2" style="font-size:26px">{{ t.shop.needHelp }}</h2>
      <p class="mb-3 opacity-85">{{ t.shop.needHelpDesc }}</p>
      <RouterLink to="/contact/" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent)">{{ t.shop.contactUs }}</RouterLink>
    </div>
  </section>
</main>
</template>

<style scoped>
.payment-bank-logo {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  border-radius: 8px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-weight: 700;
  font-size: 14px;
  color: var(--color-text);
  text-decoration: none;
  transition: background 0.2s;
}
.payment-bank-logo:hover { background: var(--color-bg-muted); }
.payment-card-logo {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 8px;
  background: var(--color-bg-muted);
  font-weight: 600;
  font-size: 12px;
  color: var(--color-text-muted);
}
</style>

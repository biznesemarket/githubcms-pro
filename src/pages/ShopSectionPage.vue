<script setup lang="ts">
import { computed } from "vue";
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import { t } from "../i18n";
import { products as allProducts } from "../content/products";

const props = defineProps<{ section: string }>();
const sectionNum = computed(() => Number.parseInt(props.section));

const sectionData = computed(() => (t.shop as any).sectionDetails?.[sectionNum.value] as { title: string; heroSubtitle: string; description: string; icon: string; categories: string[] } | undefined);

const sectionProducts = computed(() =>
  allProducts.filter(p => p.sectionId === sectionNum.value)
    .map(p => ({ name: p.name, desc: p.desc, price: p.price, image: p.img, slug: p.slug }))
);

const breadcrumbItems = computed(() => [
  { name: t.breadcrumb.home, url: "/" },
  { name: t.breadcrumb.shop, url: "/shop/" },
  { name: sectionData.value?.title ?? "" },
]);

useSeo(() => {
  const sec = sectionData.value;
  const path = `/shop/shop-section-${props.section}/`;
  if (!sec) return { title: siteConfig.name, description: siteConfig.description, path, type: "website" };
  return { title: `${sec.title} | ${siteConfig.name}`, description: sec.heroSubtitle, path, type: "website" };
});
</script>

<template>
<main>
  <BreadcrumbNav :items="breadcrumbItems" />
  <section class="py-5 text-white" style="background:linear-gradient(135deg,#0f0720,#2d1060,#1a0a2e);min-height:300px"><div class="container"><div class="row align-items-center"><div class="col-lg-7"><p class="text-uppercase mb-2 opacity-75" style="font-size:12px;letter-spacing:3px;color:#c4b5fd">{{ t.nav.shop }} / {{ sectionData?.title }}</p><h1 class="fw-bold mb-3" style="font-size:36px">{{ sectionData?.title }}</h1><p class="lead opacity-85" style="max-width:500px;font-size:16px">{{ sectionData?.heroSubtitle }}</p></div><div class="col-lg-5 text-center mt-4 mt-lg-0"><span style="font-size:72px">{{ sectionData?.icon }}</span></div></div></div></section>
  <section class="py-4"><div class="container"><div class="row"><div class="col-lg-8"><p style="font-size:15px;line-height:1.8;color:var(--color-text-muted)">{{ sectionData?.description }}</p></div></div></div></section>
  <section class="py-2"><div class="container"><div class="d-flex flex-wrap gap-2"><span v-for="cat in sectionData?.categories" :key="cat" class="badge p-2" style="background:var(--color-bg-muted);color:var(--color-text);font-size:13px">{{ cat }}</span></div></div></section>
  <section class="py-4"><div class="container"><h2 class="fw-bold mb-4" style="font-size:26px">{{ t.shop.sectionProducts }}</h2><div class="row g-4">
    <div v-for="p in sectionProducts" :key="p.slug" class="col-md-6 col-lg-4"><div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden"><img :src="p.image" :alt="p.name" class="card-img-top" style="height:200px;object-fit:cover" loading="lazy"><div class="card-body d-flex flex-column p-3"><h5 class="fw-bold mb-1" style="font-size:16px">{{ p.name }}</h5><p class="mb-2" style="font-size:13px;color:var(--color-text-muted)">{{ p.desc }}</p><div class="d-flex justify-content-between align-items-center mt-auto"><span class="fw-bold" style="font-size:18px;color:var(--color-accent)">{{ p.price.toLocaleString("ru-RU") }} ₽</span><RouterLink :to="'/shop/shop-section-' + props.section + '/' + p.slug + '/'" class="btn btn-primary btn-sm" style="border-radius:8px">{{ t.shop.buy }}</RouterLink></div></div></div></div>
  </div></div></section>
  <section class="py-4" style="background:var(--color-bg-muted)"><div class="container"><div class="row g-4"><div class="col-md-4"><div class="d-flex"><span class="me-3" style="font-size:28px">🚚</span><div><h5 class="fw-bold mb-1" style="font-size:15px">{{ t.shop.delivery }}</h5><p class="mb-0" style="font-size:13px;color:var(--color-text-muted)">{{ t.shop.deliveryDesc }}</p></div></div></div><div class="col-md-4"><div class="d-flex"><span class="me-3" style="font-size:28px">💳</span><div><h5 class="fw-bold mb-1" style="font-size:15px">{{ t.shop.payment }}</h5><p class="mb-0" style="font-size:13px;color:var(--color-text-muted)">{{ t.shop.paymentDesc }}</p></div></div></div><div class="col-md-4"><div class="d-flex"><span class="me-3" style="font-size:28px">🔄</span><div><h5 class="fw-bold mb-1" style="font-size:15px">{{ t.shop.return }}</h5><p class="mb-0" style="font-size:13px;color:var(--color-text-muted)">{{ t.shop.returnDesc }}</p></div></div></div></div></div></section>
  <section class="py-4 text-center text-white" style="background:linear-gradient(135deg,#0f0720,#2d1060)"><div class="container py-3"><h2 class="fw-bold mb-2" style="font-size:26px">{{ t.shop.needHelp }}</h2><p class="mb-3 opacity-85">{{ t.shop.needHelpDesc }}</p><RouterLink to="/contact/" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent)">{{ t.shop.contactUs }}</RouterLink></div></section>
</main>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useSeo } from "../composables/useSeo"
import { siteConfig } from "../site.config"
import { loadTinkoffScript, openPayment } from "../composables/usePayment"
import PageBanner from "../components/PageBanner.vue"
import BreadcrumbNav from "../components/BreadcrumbNav.vue"
import { t } from "../i18n"

const props = defineProps<{ page?: number }>()
const currentPage = computed(() => props.page ?? 1)

const pageDescription = computed(() => siteConfig.isPro
  ? "30 шаблонов для GitHub CMS: лендинги, портфолио, блоги, магазины. Установка одной командой."
  : "Free версия GitHub CMS включает Purple GEO Lite. Pro открывает marketplace, расширенные GEO-промпты и платные Template Packs."
)
const sectionTitle = computed(() => siteConfig.isPro ? t.templates.premium : "Free шаблон")
const sectionDesc = computed(() => siteConfig.isPro
  ? t.templates.premiumDesc
  : "В Free-версии доступен один установленный шаблон. Смена шаблона и marketplace доступны после покупки Pro."
)

useSeo(() => ({
  title: t.templates.title,
  description: pageDescription.value,
  path: currentPage.value === 1 ? "/templates/" : `/templates/page/${currentPage.value}/`,
  type: "website",
}))

function buyTemplate(tpl: TemplateMeta) {
  if (!siteConfig.tinkoffTerminalKey) { alert(t.templates.paymentNotReady); return }
  loadTinkoffScript().then(() => {
    openPayment({ terminalKey: siteConfig.tinkoffTerminalKey, amount: 350000, orderId: `tpl-${tpl.slug}-${Date.now()}`, description: `Template: ${tpl.name}` })
  }).catch(() => { alert(t.templates.paymentUnavailable) })
}

interface TemplateMeta { name: string; slug: string; price: string; desc: string; preview: string; features: string[] }

const freeTemplates: TemplateMeta[] = [
  { slug:"purple-geo-lite", name:"Purple GEO Lite", price:"Бесплатно", desc:"Обрезанный Free-шаблон с фирменной фиолетовой визуальной системой, одной главной страницей и базовыми SEO-промптами.", preview:"https://pixinlink.ru/api/v1/600x380/purple-geo-lite-static-site-template", features:["Один базовый дизайн","Базовые SEO-промпты","Vue/Vite SSG","Bootstrap 5","Без смены шаблонов","Без Pro GEO-блоков"] },
]

const proTemplates: TemplateMeta[] = import.meta.env.VITE_EDITION === "pro" ? [
  { slug:"purple-geo", name:"Purple GEO", price:"3 500 ₽", desc:"Мощный GEO-оптимизированный дизайн для коммерческих сайтов. Фиолетовая гамма, Plob-стилистика.", preview:"https://pixinlink.ru/api/v1/600x380/modern-purple-website-template-geo-optimized", features:["Полный CSS (628 строк)","Адаптивная тёмная тема","Plob-стилистика","24-блочный GEO-промпт","Персональные промпты","Bootstrap 5 + печать"] },
  { slug:"tech-azure", name:"Tech Azure", price:"3 500 ₽", desc:"Лазурный технологичный дизайн для SaaS и IT-компаний. Стеклянные карточки, градиенты.", preview:"https://pixinlink.ru/api/v1/600x380/azure-tech-saas-website-template-glass-cards", features:["Стеклянные карточки","Лазурная гамма","SaaS-лендинги","Адаптивная тёмная тема","Bootstrap 5"] },
  { slug:"emerald-green", name:"Emerald Green", price:"3 500 ₽", desc:"Изумрудный дизайн для экологических и wellness-проектов. Природные оттенки, мягкие тени.", preview:"https://pixinlink.ru/api/v1/600x380/emerald-green-eco-website-template-nature", features:["Природная гамма","Мягкие тени","Eco-стилистика","Адаптивная тёмная тема","Bootstrap 5"] },
  { slug:"crimson-bold", name:"Crimson Bold", price:"3 500 ₽", desc:"Яркий смелый дизайн для медиа и развлечений. Красные акценты, крупная типографика.", preview:"https://pixinlink.ru/api/v1/600x380/crimson-bold-website-template-media-entertainment", features:["Крупная типографика","Красные акценты","Медиа-стиль","Тёмная тема"] },
  { slug:"amber-warm", name:"Amber Warm", price:"3 500 ₽", desc:"Тёплый янтарный дизайн для образовательных проектов и блогов. Уютная цветовая гамма.", preview:"https://pixinlink.ru/api/v1/600x380/amber-warm-website-template-education-blog", features:["Тёплая гамма","Образовательный стиль","Карточки с тенями","Адаптивная тёмная тема"] },
  { slug:"indigo-deep", name:"Indigo Deep", price:"3 500 ₽", desc:"Глубокий индиго для финансовых и юридических сайтов. Строгий, профессиональный.", preview:"https://pixinlink.ru/api/v1/600x380/indigo-deep-website-template-finance-legal-professional", features:["Строгий дизайн","Индиго-гамма","Финансовый стиль","Тёмная тема","Bootstrap 5"] },
  { slug:"rose-elegant", name:"Rose Elegant", price:"3 500 ₽", desc:"Элегантный розовый дизайн для бьюти-брендов и fashion-проектов.", preview:"https://pixinlink.ru/api/v1/600x380/rose-elegant-website-template-beauty-fashion", features:["Элегантная типографика","Розовая гамма","Fashion-стиль","Лёгкие тени"] },
  { slug:"ocean-breeze", name:"Ocean Breeze", price:"3 500 ₽", desc:"Свежий морской дизайн для туристических и travel-проектов.", preview:"https://pixinlink.ru/api/v1/600x380/ocean-breeze-website-template-travel-tourism", features:["Морская палитра","Travel-стиль","Воздушные карточки","Адаптивная тёмная тема"] },
  { slug:"sunset-orange", name:"Sunset Orange", price:"3 500 ₽", desc:"Энергичный оранжевый дизайн для спортивных и fitness-проектов.", preview:"https://pixinlink.ru/api/v1/600x380/sunset-orange-website-template-sports-fitness", features:["Энергичный стиль","Оранжевая гамма","Fitness-карточки","Адаптивная тёмная тема"] },
  { slug:"midnight-noir", name:"Midnight Noir", price:"3 500 ₽", desc:"Тёмный минималистичный дизайн для портфолио и креативных студий.", preview:"https://pixinlink.ru/api/v1/600x380/midnight-noir-website-template-portfolio-dark", features:["Полностью тёмная тема","Минимализм","Портфолио-сетка","Монохромная палитра"] },
  { slug:"spring-garden", name:"Spring Garden", price:"3 500 ₽", desc:"Весенний цветочный дизайн для садоводства, флористики и семейных проектов.", preview:"https://pixinlink.ru/api/v1/600x380/spring-garden-website-template-floral-family", features:["Светлая палитра","Цветочные акценты","Семейный стиль","Мягкие переходы"] },
  { slug:"arctic-frost", name:"Arctic Frost", price:"3 500 ₽", desc:"Ледяной минималистичный дизайн для технологических стартапов.", preview:"https://pixinlink.ru/api/v1/600x380/arctic-frost-website-template-tech-startup-minimal", features:["Ледяная палитра","Минимализм","Техно-стиль","Стеклянные элементы"] },
  { slug:"golden-hour", name:"Golden Hour", price:"3 500 ₽", desc:"Золотистый премиум-дизайн для люксовых брендов и ювелирных магазинов.", preview:"https://pixinlink.ru/api/v1/600x380/golden-hour-website-template-luxury-jewelry", features:["Золотая палитра","Премиум-стиль","Люкс-карточки","Элегантные шрифты"] },
  { slug:"cyber-neon", name:"Cyber Neon", price:"3 500 ₽", desc:"Киберпанк-неоновый дизайн для игровых проектов и Web3.", preview:"https://pixinlink.ru/api/v1/600x380/cyber-neon-website-template-gaming-web3", features:["Неоновая палитра","Киберпанк-стиль","Тёмная тема","Неоновые акценты"] },
  { slug:"monaco-sky", name:"Monaco Sky", price:"3 500 ₽", desc:"Небесно-голубой дизайн для авиации и транспортных компаний.", preview:"https://pixinlink.ru/api/v1/600x380/sky-blue-website-template-aviation-transport", features:["Небесная палитра","Авиа-стиль","Чистые линии","Адаптивная тёмная тема"] },
  { slug:"velvet-night", name:"Velvet Night", price:"3 500 ₽", desc:"Бархатный тёмный дизайн для ресторанов, баров и ночных клубов.", preview:"https://pixinlink.ru/api/v1/600x380/velvet-night-website-template-restaurant-bar", features:["Тёмная бархатная палитра","Ресторанный стиль","Акцентные градиенты","Меню-карточки"] },
  { slug:"forest-trail", name:"Forest Trail", price:"3 500 ₽", desc:"Лесной природный дизайн для outdoor-брендов и кемпинга.", preview:"https://pixinlink.ru/api/v1/600x380/forest-trail-website-template-outdoor-camping", features:["Лесная палитра","Outdoor-стиль","Природные текстуры","Земляные оттенки"] },
  { slug:"arctic-dusk", name:"Arctic Dusk", price:"3 500 ₽", desc:"Арктический сумеречный дизайн для скандинавских и минималистичных проектов.", preview:"https://pixinlink.ru/api/v1/600x380/arctic-dusk-website-template-scandinavian-minimal", features:["Сумеречная палитра","Скандинавский стиль","Минимализм","Чистая типографика"] },
  { slug:"coral-reef", name:"Coral Reef", price:"3 500 ₽", desc:"Коралловый яркий дизайн для детских и развлекательных проектов.", preview:"https://pixinlink.ru/api/v1/600x380/coral-reef-website-template-kids-entertainment", features:["Коралловая палитра","Игровой стиль","Крупные карточки","Весёлые акценты"] },
  { slug:"steel-grey", name:"Steel Grey", price:"3 500 ₽", desc:"Стальной промышленный дизайн для B2B и производственных компаний.", preview:"https://pixinlink.ru/api/v1/600x380/steel-grey-website-template-industrial-b2b", features:["Стальная палитра","Промышленный стиль","B2B-карточки","Строгая типографика"] },
  { slug:"mint-fresh", name:"Mint Fresh", price:"3 500 ₽", desc:"Свежий мятный дизайн для медицинских и health-tech проектов.", preview:"https://pixinlink.ru/api/v1/600x380/mint-fresh-website-template-medical-health", features:["Мятная палитра","Медицинский стиль","Чистый дизайн","Доверительные акценты"] },
  { slug:"chocolate-luxe", name:"Chocolate Luxe", price:"3 500 ₽", desc:"Шоколадный премиум-дизайн для кондитерских и кофеен.", preview:"https://pixinlink.ru/api/v1/600x380/chocolate-luxe-website-template-bakery-cafe", features:["Шоколадная палитра","Премиум-стиль","Тёплые оттенки","Карточки меню"] },
  { slug:"graphite-mono", name:"Graphite Mono", price:"3 500 ₽", desc:"Графитовый монохромный дизайн для архитектурных бюро и дизайн-студий.", preview:"https://pixinlink.ru/api/v1/600x380/graphite-monochrome-website-template-architecture-design", features:["Монохромная палитра","Архитектурный стиль","Сетка портфолио","Минимализм"] },
  { slug:"sakura-pink", name:"Sakura Pink", price:"3 500 ₽", desc:"Нежно-розовый дизайн в японском стиле для творческих проектов.", preview:"https://pixinlink.ru/api/v1/600x380/sakura-pink-website-template-japanese-creative", features:["Сакура-палитра","Японский стиль","Нежные акценты","Творческая сетка"] },
  { slug:"violet-dusk", name:"Violet Dusk", price:"3 500 ₽", desc:"Фиолетовый сумеречный дизайн для эзотерических и духовных проектов.", preview:"https://pixinlink.ru/api/v1/600x380/violet-dusk-website-template-spiritual-mystical", features:["Фиолетовая палитра","Мистический стиль","Градиенты","Мягкие тени"] },
  { slug:"lemon-zest", name:"Lemon Zest", price:"3 500 ₽", desc:"Яркий лимонный дизайн для стартапов и креативных агентств.", preview:"https://pixinlink.ru/api/v1/600x380/lemon-zest-website-template-startup-creative", features:["Лимонная палитра","Стартап-стиль","Энергичные акценты","Смелая типографика"] },
  { slug:"storm-cloud", name:"Storm Cloud", price:"3 500 ₽", desc:"Грозовой облачный дизайн для погодных и новостных проектов.", preview:"https://pixinlink.ru/api/v1/600x380/storm-cloud-website-template-weather-news", features:["Облачная палитра","Новостной стиль","Динамичные карточки","Тёмная тема"] },
  { slug:"peach-blossom", name:"Peach Blossom", price:"3 500 ₽", desc:"Персиковый нежный дизайн для свадебных и event-проектов.", preview:"https://pixinlink.ru/api/v1/600x380/peach-blossom-website-template-wedding-event", features:["Персиковая палитра","Свадебный стиль","Нежные акценты","Элегантная типографика"] },
  { slug:"deep-ocean", name:"Deep Ocean", price:"3 500 ₽", desc:"Глубоководный дизайн для дайвинга, морских и научных проектов.", preview:"https://pixinlink.ru/api/v1/600x380/deep-ocean-website-template-diving-marine-science", features:["Океанская палитра","Морской стиль","Глубокие оттенки","Научные карточки"] },
] : []
const allTemplates = [...freeTemplates, ...proTemplates]

const perPage = 10
const visibleTemplates = computed(() => siteConfig.isPro ? allTemplates : freeTemplates)
const totalPages = computed(() => Math.ceil(visibleTemplates.value.length / perPage))
const pageTemplates = computed(() => visibleTemplates.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))
</script>

<template>
  <PageBanner :pageTitle="t.templates.title" />
  <BreadcrumbNav :items="[{ name: 'Главная', url: '/' }, { name: 'Шаблоны' }]" />
  <main class="page">
    <section class="mb-4">
      <h2 class="section-title">{{ sectionTitle }}</h2>
      <p class="section-desc">{{ sectionDesc }}</p>
    </section>

    <div class="row g-4">
      <div v-for="tpl in pageTemplates" :key="tpl.slug" class="col-md-6">
        <div class="template-card">
          <RouterLink :to="'/templates/' + tpl.slug + '/'">
            <img :src="tpl.preview" :alt="tpl.name" class="template-preview" loading="lazy">
          </RouterLink>
          <div class="template-body">
            <h3 class="template-name">
              <RouterLink :to="'/templates/' + tpl.slug + '/'">{{ tpl.name }}</RouterLink>
            </h3>
            <p class="template-desc">{{ tpl.desc }}</p>
            <div class="d-flex justify-content-between align-items-center mt-auto pt-3" style="border-top:1px solid var(--color-border)">
              <span class="template-price">{{ tpl.price }}</span>
              <RouterLink v-if="tpl.price === 'Бесплатно'" :to="'/templates/' + tpl.slug + '/'" class="btn btn-outline-primary btn-sm" style="border-radius:8px">Открыть →</RouterLink>
              <button v-else class="btn btn-outline-primary btn-sm" style="border-radius:8px" @click="buyTemplate(tpl)">Купить →</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <nav v-if="totalPages > 1" class="mt-5 d-flex justify-content-center gap-2">
      <RouterLink v-for="p in totalPages" :key="p" :to="p === 1 ? '/templates/' : '/templates/page/' + p + '/'"
        class="btn btn-sm px-4" :class="p === currentPage ? 'btn-primary' : 'btn-outline'" style="border-radius:8px">
        {{ p }}
      </RouterLink>
    </nav>

    <section v-if="siteConfig.isFree" class="mt-5 pro-lock">
      <h2 class="section-title">Pro marketplace заблокирован</h2>
      <p class="section-desc">Платные шаблоны, расширенные GEO-промпты, дополнительные варианты главной страницы и Template Pack marketplace не входят в Free-дистрибутив.</p>
    </section>

    <section class="mt-5">
      <h2 class="section-title">{{ t.templates.howToCreate }}</h2>
      <div class="row mt-4">
        <div class="col-md-4 mb-3"><div class="step-card"><div class="step-number">1</div><h4>{{ t.templates.step1Title }}</h4><p v-html="t.templates.step1Desc"></p></div></div>
        <div class="col-md-4 mb-3"><div class="step-card"><div class="step-number">2</div><h4>{{ t.templates.step2Title }}</h4><p v-html="t.templates.step2Desc"></p></div></div>
        <div class="col-md-4 mb-3"><div class="step-card"><div class="step-number">3</div><h4>{{ t.templates.step3Title }}</h4><p v-html="t.templates.step3Desc"></p></div></div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.section-title { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
.section-desc { color: var(--color-text-secondary); font-size: 16px; max-width: 700px; }
.template-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 14px; overflow: hidden; transition: all 0.25s ease; }
.template-card:hover { box-shadow: 0 8px 30px rgba(124,58,237,0.12); transform: translateY(-2px); }
.template-preview { width: 100%; height: 220px; object-fit: cover; display: block; }
.template-body { padding: 20px; display: flex; flex-direction: column; min-height: 180px; }
.template-name { font-size: 18px; font-weight: 700; margin: 0 0 6px; }
.template-name a { color: var(--color-text); text-decoration: none; }
.template-name a:hover { color: var(--color-accent); }
.template-desc { color: var(--color-text-secondary); font-size: 13px; line-height: 1.6; margin: 0; flex-grow: 1; }
.template-price { font-size: 18px; font-weight: 700; color: var(--color-accent); }
.step-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 10px; padding: 24px; }
.pro-lock { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 10px; padding: 24px; }
.step-number { background: var(--color-accent); border-radius: 50%; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; height: 36px; margin-bottom: 10px; width: 36px; }
.step-card h4 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.step-card p { font-size: 13px; color: var(--color-text-secondary); margin: 0; }
.btn-outline { border: 1px solid var(--color-border); color: var(--color-text); text-decoration: none; }
.btn-outline:hover { background: var(--color-bg-muted); }
</style>

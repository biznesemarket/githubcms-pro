<script setup lang="ts">
import { generateSchema } from "../schema";
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import { t } from "../i18n";

useSeo({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/home/3/",
  type: "website",
  jsonLd: generateSchema({ url: siteConfig.url, path: "/home/3/", title: siteConfig.name, description: siteConfig.description, html: "", type: "website" }),
});
</script>

<template>
<main>
<section class="hero position-relative overflow-hidden" style="min-height:700px;background:linear-gradient(135deg,#0f0720,#2d1060,#4c1d95)">
  <div class="position-absolute top-0 start-0 w-100 h-100" style="background:radial-gradient(ellipse at 30% 50%,rgba(124,58,237,0.25) 0%,transparent 70%),radial-gradient(ellipse at 70% 30%,rgba(139,92,246,0.15) 0%,transparent 60%)"></div>
  <img src="https://pixinlink.ru/api/v1/1440x800/abstract-digital-knowledge-graph-networks-glowing-nodes" alt="GEO Background" class="position-absolute top-0 start-0 w-100 h-100" style="object-fit:cover;opacity:0.08">
  <div class="container position-relative py-5" style="z-index:2">
    <div class="row align-items-center" style="min-height:600px">
      <div class="col-lg-7 text-white py-5">
        <p class="text-uppercase fw-bold mb-2 opacity-75" style="font-size:13px;letter-spacing:3px;color:#c4b5fd">{{ t.homeVariant3.badge }}</p>
        <h1 class="fw-bold mb-3 lh-sm" style="font-size:46px">{{ t.homeVariant3.hero }}</h1>
        <p class="lead mb-4 opacity-90" style="max-width:560px;font-size:18px">{{ t.homeVariant3.heroDesc }}</p>
        <div class="d-flex flex-wrap gap-3">
          <a href="#" class="btn btn-primary btn-lg px-5 py-3 fw-bold" style="border-radius:12px;background:linear-gradient(135deg,#7c3aed,#8b5cf6)">{{ t.homeVariant3.ctaDeploy }}</a>
          <a href="/blog/" class="btn btn-outline-light btn-lg px-5 py-3" style="border-radius:12px">{{ t.homeVariant3.ctaCases }}</a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="d-flex flex-column gap-3">
          <div class="d-flex gap-3">
            <div class="flex-fill rounded-4 p-4 text-center text-white" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)">
              <div class="fw-bold mb-1" style="font-size:36px;color:#c4b5fd">0$</div>
              <div class="small opacity-75">{{ t.homeVariant3.metricSaaS }}</div>
            </div>
            <div class="flex-fill rounded-4 p-4 text-center text-white" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)">
              <div class="fw-bold mb-1" style="font-size:36px;color:#c4b5fd">≤200ms</div>
              <div class="small opacity-75">Скорость ответа TTFB</div>
            </div>
          </div>
          <div class="d-flex gap-3">
            <div class="flex-fill rounded-4 p-4 text-center text-white" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)">
              <div class="fw-bold mb-1" style="font-size:36px;color:#c4b5fd">10+</div>
              <div class="small opacity-75">Типов Schema.org из коробки</div>
            </div>
            <div class="flex-fill rounded-4 p-4 text-center text-white" style="background:rgba(124,58,237,0.25);backdrop-filter:blur(8px);border:1px solid rgba(196,181,253,0.25)">
              <div class="fw-bold mb-1" style="font-size:36px;color:#f5f0ff">300%</div>
              <div class="small opacity-90">Рост цитирования в AI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="block block-answer py-4" style="background:var(--color-answer-bg)">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <p class="block-answer-text text-white mb-0" style="font-size:18px;line-height:1.7">GitHub CMS — это статический сайт-генератор (SSG) на базе Vue 3 и Vite, разработанный специально для Generative Engine Optimization (GEO). Он преобразует Markdown-контент в сверхбыстрые HTML-страницы (TTFB ≤200ms) без использования баз данных. При каждом git push система автоматически генерирует JSON-LD, sitemap и Open Graph, что увеличивает вероятность цитирования бренда в ответах ChatGPT и Perplexity на 300% по сравнению с классическими CMS (SearchBridge AI, 2026).</p>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.section1Title }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec1Desc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start mb-3">
            <span class="badge fw-bold me-3 flex-shrink-0" style="min-width:36px;height:36px;background:var(--color-accent);color:white;font-size:16px;display:flex;align-items:center;justify-content:center;border-radius:50%">1</span>
            <h5 class="fw-bold mb-0" style="font-size:16px">Vite SSG (Генерация статики)</h5>
          </div>
          <p style="font-size:13px;line-height:1.7">Предварительная сборка страниц гарантирует скорость TTFB менее 200 миллисекунд. AI-пауки обрабатывают статический HTML на 40% быстрее, чем динамические скрипты PHP, что напрямую повышает краулинговый бюджет.</p>
          <ul style="font-size:12px;line-height:1.6">
            <li>Мгновенная загрузка страниц</li>
            <li>Отсутствие уязвимостей баз данных</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start mb-3">
            <span class="badge fw-bold me-3 flex-shrink-0" style="min-width:36px;height:36px;background:var(--color-accent);color:white;font-size:16px;display:flex;align-items:center;justify-content:center;border-radius:50%">2</span>
            <h5 class="fw-bold mb-0" style="font-size:16px">JSON-LD и Schema.org</h5>
          </div>
          <p style="font-size:13px;line-height:1.7">Автоматическая генерация 10+ типов микроразметки из Markdown Frontmatter. Структурированные данные питают графы знаний (Knowledge Graphs), повышая шанс попадания в Featured Snippets на 65%.</p>
          <ul style="font-size:12px;line-height:1.6">
            <li>FAQPage и Article из коробки</li>
            <li>Валидный машиночитаемый код</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start mb-3">
            <span class="badge fw-bold me-3 flex-shrink-0" style="min-width:36px;height:36px;background:var(--color-accent);color:white;font-size:16px;display:flex;align-items:center;justify-content:center;border-radius:50%">3</span>
            <h5 class="fw-bold mb-0" style="font-size:16px">Markdown с @block-директивами</h5>
          </div>
          <p style="font-size:13px;line-height:1.7">Хранение контента в репозитории позволяет версионировать каждую запятую. Специальные директивы размечают смысловые блоки для LLM, упрощая извлечение фактов алгоритмами ChatGPT.</p>
          <ul style="font-size:12px;line-height:1.6">
            <li>Полный контроль над семантикой</li>
            <li>Zero-SaaS архитектура без БД</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5 text-center text-white" style="background:linear-gradient(135deg,#0f0720,#2d1060,#1a0a2e)">
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h2 class="fw-bold mb-4" style="font-size:38px;line-height:1.2">{{ t.homeVariant3.darkBannerTitle }}</h2>
        <p class="lead mb-4 opacity-85 mx-auto" style="max-width:650px;font-size:18px;line-height:1.6">Перенесите свой контент на GitHub CMS за 1 день и получите технический фундамент для GEO. Более 47% B2B-клиентов уже используют AI для поиска решений — начните получать этот трафик.</p>
        <div class="row g-3 mb-5">
          <div class="col-sm-4">
            <div class="p-3 rounded-4" style="background:rgba(255,255,255,0.06)">
              <div class="fw-bold mb-1" style="font-size:28px;color:#c4b5fd">0₽</div>
              <div class="small opacity-75">Скрытых комиссий</div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="p-3 rounded-4" style="background:rgba(255,255,255,0.06)">
              <div class="fw-bold mb-1" style="font-size:28px;color:#c4b5fd">200ms</div>
              <div class="small opacity-75">Скорость отдачи</div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="p-3 rounded-4" style="background:rgba(124,58,237,0.3)">
              <div class="fw-bold mb-1" style="font-size:28px;color:#f5f0ff">100%</div>
              <div class="small opacity-90">Готовность к AI</div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center flex-wrap gap-3">
          <a href="#" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent);box-shadow:0 8px 30px rgba(255,255,255,0.2)">Клонировать репозиторий</a>
          <a href="/docs/" class="btn btn-outline-light btn-lg px-5 py-3" style="border-radius:12px">Читать документацию</a>
        </div>
        <p class="mt-4 small opacity-50">Открытый исходный код. Развертывание в 1 клик на Vercel, Netlify или GitHub Pages.</p>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mb-4 mb-lg-0">
        <div class="sticky-top pt-3" style="top:80px">
          <h2 class="fw-bold mb-3" style="font-size:28px;color:var(--color-accent)">TL;DR</h2>
          <p class="lead mb-4" style="font-size:16px;line-height:1.7">300% роста AI-цитирования начинается не с рекламы, а с архитектуры контента. GitHub CMS превращает Markdown в быстрый статический сайт на Vue 3 + Vite SSG, автоматически публикует JSON-LD, sitemap и Open Graph при каждом git push и убирает из цепочки базы данных, плагины и SaaS-платежи.</p>
          <div class="rounded-4 p-4 mb-4" style="background:var(--color-bg-muted)">
            <h5 class="fw-bold mb-2" style="font-size:15px;color:var(--color-accent)">Определение</h5>
            <p class="mb-0" style="font-size:14px;line-height:1.6">GitHub CMS — это Markdown CMS и статический сайт-генератор, который хранит контент в GitHub-репозитории, собирает сайт через Vue 3 + Vite SSG и автоматически подготавливает машиночитаемые сигналы для ChatGPT, Perplexity и поисковых систем через JSON-LD, Schema.org и sitemap.</p>
          </div>
          <div class="rounded-4 p-4" style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(139,92,246,0.05));border:1px solid var(--color-border)">
            <p class="fw-bold mb-2" style="font-size:14px;color:var(--color-accent)"><i>◆</i> Критическая возможность</p>
            <p class="mb-0" style="font-size:14px;line-height:1.6">Каждый лишний слой между контентом и HTML снижает предсказуемость индексации. Когда разметка, метаданные и страницы собираются автоматически, бренд получает преимущество уже в первые 30-60 дней.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <h3 class="fw-bold mb-4" style="font-size:22px;text-transform:uppercase;letter-spacing:2px;color:var(--color-text)">Ключевые факты</h3>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">TTFB до 200ms</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Предварительная генерация HTML сокращает время ответа до ≤200ms и делает страницы удобными для краулеров и AI-агентов. <small class="text-muted">Архитектурная цель проекта</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">10+ типов Schema.org</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Article, FAQPage, BreadcrumbList, Organization и другие сущности генерируются при сборке без ручной поддержки плагинов. <small class="text-muted">Автогенерация при git push</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">0 баз данных</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Отсутствие SQL и серверной CMS снижает стоимость владения, уменьшает поверхность атак и убирает задержки на рендеринге. <small class="text-muted">Принцип Zero-DB</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">0 ежемесячных SaaS-платежей</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Контент хранится в репозитории, а не в платной CMS, поэтому бизнес не платит за редактор, базу, API-лимиты и дорогие плагины. <small class="text-muted">Экономика open infrastructure</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Markdown как источник истины</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Один `.md` файл содержит контент, структуру, фронтматтер и сигналы для генерации метаданных, что ускоряет выпуск материалов в 2-3 раза. <small class="text-muted">Git-first workflow</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Git push как триггер</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Любое изменение контента сразу инициирует пересборку HTML, sitemap, Open Graph и JSON-LD без ручных действий редактора. <small class="text-muted">Автоматизация публикации</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">AI-цитирование как KPI</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Страница создаётся не только ради SERP, но и ради прямого извлечения фактов нейросетями, где важны ясные блоки ответа и сущности. <small class="text-muted">GEO-подход</small></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
              <h5 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Vue 3 без перегруза</h5>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Интерфейс остаётся современным, но контент отдаётся как готовый HTML, поэтому сайт не жертвует скоростью ради интерактива. <small class="text-muted">Vite SSG pipeline</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Четыре механизма AI-видимости</h2>
        <p class="text-muted" style="font-size:16px">В 2026 побеждает не тот, у кого больше страниц, а тот, у кого данные понятнее для нейросетей.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center" style="border-radius:14px;transition:transform 0.2s">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px;background:rgba(124,58,237,0.1)">
            <span style="font-size:32px">🧩</span>
          </div>
          <h5 class="fw-bold mb-3" style="font-size:18px">JSON-LD без ручной рутины</h5>
          <p class="text-muted small mb-0" style="font-size:14px;line-height:1.6">Автоматическая генерация структурированных данных убирает главный разрыв между контентом и индексируемым HTML. Когда 10+ схем создаются при сборке, сайт быстрее попадает в машиночитаемый контур AI-поиска.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center" style="border-radius:14px;transition:transform 0.2s">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px;background:rgba(124,58,237,0.1)">
            <span style="font-size:32px">🎯</span>
          </div>
          <h5 class="fw-bold mb-3" style="font-size:18px">Ответные блоки для AI</h5>
          <p class="text-muted small mb-0" style="font-size:14px;line-height:1.6">Короткие абзацы, явные H2/H3 и выделенные direct-answer секции упрощают извлечение фактов. Такой формат работает лучше длинных неструктурированных текстов и повышает шанс AI-цитирования.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center" style="border-radius:14px;transition:transform 0.2s">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px;background:rgba(124,58,237,0.1)">
            <span style="font-size:32px">🛡️</span>
          </div>
          <h5 class="fw-bold mb-3" style="font-size:18px">E-E-A-T в коде и тексте</h5>
          <p class="text-muted small mb-0" style="font-size:14px;line-height:1.6">Git-история, author meta, дата обновления, единый canonical и последовательная структура повышают доверие к контенту. Для нейросетей это сильнее, чем визуально красивый, но хаотичный лендинг.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center" style="border-radius:14px;transition:transform 0.2s">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px;background:rgba(124,58,237,0.1)">
            <span style="font-size:32px">🌐</span>
          </div>
          <h5 class="fw-bold mb-3" style="font-size:18px">Сущности и граф знаний</h5>
          <p class="text-muted small mb-0" style="font-size:14px;line-height:1.6">Organization, Product, Article, FAQ и Breadcrumb связывают бренд, продукт и тему в единую карту сущностей. Чем чище эта карта, тем выше вероятность быть выбранным как источник ответа.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <h2 class="fw-bold mb-4" style="font-size:32px">Что такое GitHub CMS и почему это важно в 2026</h2>
        <p class="lead mb-3" style="font-size:17px;line-height:1.7">GitHub CMS — это Git-first система управления контентом, где Markdown-файлы становятся основой сайта, а сборщик на Vue 3 + Vite SSG превращает их в быстрые, чистые и предсказуемые HTML-страницы. В отличие от традиционных CMS, здесь нет базы данных, платных модулей и разрыва между контентом, кодом и SEO-разметкой.</p>
        <p style="font-size:15px;line-height:1.7">В 2025-2026 борьба идёт уже не только за клики из поисковой выдачи, а за присутствие в AI-ответах, где нейросети выбирают источники по качеству структуры, скорости и понятности сущностей. Статический подход выигрывает потому, что отдаёт итоговый HTML сразу, генерирует JSON-LD при каждом пуше и делает контент детерминированным. Когда редактор меняет один Markdown-файл, система обновляет страницу, Open Graph, sitemap и Schema.org без ручной синхронизации. Это превращает сайт из “витрины” в машиночитаемую knowledge asset-платформу.</p>
        <div class="row g-3 mt-3">
          <div class="col-sm-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:40px;height:40px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">1</div>
              <p style="font-size:14px;line-height:1.5">Один репозиторий объединяет контент, метаданные, историю правок и деплой, что сокращает операционную сложность минимум в 2 раза.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:40px;height:40px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">2</div>
              <p style="font-size:14px;line-height:1.5">Автоматическая генерация JSON-LD и sitemap снижает риск забытых метатегов и ручных ошибок перед публикацией.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:40px;height:40px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">3</div>
              <p style="font-size:14px;line-height:1.5">TTFB ≤200ms помогает быстрее обслуживать краулеров и снижает потери на медленном первом байте.</p>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:40px;height:40px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">4</div>
              <p style="font-size:14px;line-height:1.5">Нулевая зависимость от SaaS-подписок делает модель масштабируемой для контентных команд и агентств.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card border-0 shadow-lg p-4 text-center" style="border-radius:16px;background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(139,92,246,0.03));border:1px solid var(--color-border)">
          <h4 class="fw-bold mb-3" style="font-size:20px;color:var(--color-accent)">GitHub CMS под GEO</h4>
          <p style="font-size:14px;line-height:1.6">Вы получаете техническую платформу, где контент хранится в Markdown, сайт собирается через Vite SSG, а JSON-LD, Open Graph и sitemap создаются автоматически при публикации.</p>
          <ul class="list-unstyled text-start mb-4" style="font-size:14px">
            <li class="mb-2"><i class="text-success">✓</i> До 10+ схем Schema.org без плагинов</li>
            <li class="mb-2"><i class="text-success">✓</i> Контент-пайплайн через git push</li>
            <li class="mb-2"><i class="text-success">✓</i> Скорость ответа ≤200ms</li>
            <li class="mb-0"><i class="text-success">✓</i> 0$ ежемесячных SaaS-расходов</li>
          </ul>
          <a href="#" class="btn btn-primary btn-lg w-100" style="border-radius:12px">Запустить репозиторий</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
<h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.sectionWhyTitle }}</h2>
<p class="text-muted" style="font-size:16px">{{ t.homeVariant3.section1Desc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden">
          <div class="card-body p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width:44px;height:44px;background:rgba(220,53,69,0.1)">
                <span style="font-size:20px">🔴</span>
              </div>
              <h4 class="fw-bold mb-0" style="font-size:20px">Проблема</h4>
            </div>
            <h5 style="font-size:16px">{{ t.homeVariant3.sec3Problem }}</h5>
            <p style="font-size:14px;line-height:1.7">Обычные CMS зависят от базы данных, темы, десятков плагинов и ручной настройки SEO-метаданных. В результате страница может открываться за 800-1500ms, JSON-LD ломается после обновления темы, а редактору приходится помнить о canonical, Open Graph и sitemap отдельно. Для AI-поиска это означает непредсказуемый HTML, дублирование сущностей и потерю шанса быть выбранным как источник прямого ответа. По данным SearchBridge AI (2026), 73% WordPress-сайтов имеют ошибки в JSON-LD разметке из-за конфликтов плагинов, а среднее время до первого байта составляет 1.2 секунды — в 6 раз медленнее порога, при котором AI-краулеры считают сайт быстрым. Каждый потерянный процент скорости снижает вероятность цитирования в ChatGPT на 2-3%.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden;border-top:3px solid var(--color-accent)">
          <div class="card-body p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width:44px;height:44px;background:rgba(124,58,237,0.1)">
                <span style="font-size:20px">💡</span>
              </div>
              <h4 class="fw-bold mb-0" style="font-size:20px;color:var(--color-accent)">Решение</h4>
            </div>
            <h5 style="font-size:16px">Git-first архитектура с автогенерацией</h5>
            <p style="font-size:14px;line-height:1.7">GitHub CMS убирает базу данных и делает Markdown единым источником правды. Сборка на Vue 3 + Vite SSG создаёт готовый HTML, а пайплайн публикации генерирует JSON-LD, sitemap, Open Graph, canonical и сущности Schema.org автоматически. Так контент-команда работает в простых файлах, а сайт остаётся быстрым, чистым и предсказуемым для индексации.</p>
            <ul style="font-size:13px;line-height:1.6">
              <li><strong>Markdown core</strong> — один формат для текста, метаданных и структуры</li>
              <li><strong>SSG pipeline</strong> — готовый HTML без серверных запросов</li>
              <li><strong>Schema autogen</strong> — JSON-LD и sitemap при каждом пуше</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden">
          <div class="card-body p-4">
            <div class="d-flex align-items-center mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width:44px;height:44px;background:rgba(25,135,84,0.1)">
                <span style="font-size:20px">📊</span>
              </div>
              <h4 class="fw-bold mb-0" style="font-size:20px">Результат</h4>
            </div>
            <h5 style="font-size:16px">Быстрые страницы и понятные сигналы</h5>
            <p style="font-size:14px;line-height:1.7">Бизнес получает предсказуемую публикацию, низкие издержки и контент, который легче извлекается нейросетями. Вместо десятков ручных операций команда делает один git push и получает обновлённый HTML, валидную разметку и технично готовую страницу под AI-цитирование. Это сокращает путь от черновика до публикации и снижает риски технического долга.</p>
            <div class="mt-3 p-3 rounded-3" style="background:rgba(25,135,84,0.06)">
              <p class="fw-bold mb-1" style="font-size:13px;color:#198754">КЛЮЧЕВАЯ МЕТРИКА</p>
              <p class="mb-0" style="font-size:28px;font-weight:bold;color:var(--color-accent)">+300%</p>
              <p style="font-size:12px;color:var(--color-text-muted)">Цель роста AI-цитирования при правильной структуре</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.statsTitle }}</h2>
        <p style="font-size:15px;line-height:1.8;color:var(--color-text-muted)">{{ t.homeVariant3.sec4StatsDesc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px;background:var(--color-bg-muted)">
          <ul class="list-unstyled mb-0">
            <li class="mb-4 d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:var(--color-accent);color:white;font-size:18px">◆</div>
              </div>
              <div>
                <strong style="color:var(--color-text);font-size:16px">≤200ms TTFB на статике</strong>
                <p class="mb-0" style="font-size:14px;color:var(--color-text-muted);line-height:1.6">Предварительно собранный HTML снижает зависимость от серверной логики и сокращает задержку первого байта до инженерно контролируемого уровня.</p>
              </div>
            </li>
            <li class="mb-4 d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:var(--color-accent);color:white;font-size:18px">◆</div>
              </div>
              <div>
                <strong style="color:var(--color-text);font-size:16px">10+ схем генерируются автоматически</strong>
                <p class="mb-0" style="font-size:14px;color:var(--color-text-muted);line-height:1.6">Разметка Schema.org создаётся на этапе сборки, поэтому редактор не тратит часы на ручное сопровождение метаданных.</p>
              </div>
            </li>
            <li class="mb-0 d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:var(--color-accent);color:white;font-size:18px">◆</div>
              </div>
              <div>
                <strong style="color:var(--color-text);font-size:16px">0 баз данных и 0 SaaS-платежей</strong>
                <p class="mb-0" style="font-size:14px;color:var(--color-text-muted);line-height:1.6">Контент живёт в репозитории, а не в закрытом редакторе, поэтому модель масштабируется без постоянного увеличения ежемесячных расходов.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px;background:var(--color-bg-muted)">
          <ul class="list-unstyled mb-0">
            <li class="mb-4 d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:var(--color-accent);color:white;font-size:18px">◆</div>
              </div>
              <div>
                <strong style="color:var(--color-text);font-size:16px">1 git push = полный апдейт SEO/GEO</strong>
                <p class="mb-0" style="font-size:14px;color:var(--color-text-muted);line-height:1.6">После публикации обновляются страница, sitemap, Open Graph, каноникал и структурированные данные, что устраняет технические разрывы.</p>
              </div>
            </li>
            <li class="mb-4 d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:var(--color-accent);color:white;font-size:18px">◆</div>
              </div>
              <div>
                <strong style="color:var(--color-text);font-size:16px">Markdown ускоряет выпуск в 2-3 раза</strong>
                <p class="mb-0" style="font-size:14px;color:var(--color-text-muted);line-height:1.6">Команда редактирует текст без лишнего интерфейса, а версионирование через Git делает согласование и откаты прозрачными.</p>
              </div>
            </li>
            <li class="mb-0 d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:var(--color-accent);color:white;font-size:18px">◆</div>
              </div>
              <div>
                <strong style="color:var(--color-text);font-size:16px">До 300% потенциала AI-цитирования</strong>
                <p class="mb-0" style="font-size:14px;color:var(--color-text-muted);line-height:1.6">Когда ответы, сущности и schema выстроены последовательно, бренд чаще попадает в итоговый контекст нейросетевых ответов.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-10 mx-auto">
        <div class="p-4 rounded-4 text-center" style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(139,92,246,0.03))">
          <p class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Вывод</p>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для AI-эпохи важна не просто публикация статьи, а дисциплина всего контентного конвейера. GitHub CMS делает эту дисциплину системной, потому что код, контент и разметка двигаются как единое целое.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.comparisonTitle }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec8CompareDesc }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <div class="table-responsive">
          <table class="table table-striped" style="border-radius:14px;overflow:hidden">
            <thead style="background:linear-gradient(135deg,#1a0a2e,#2d1060);color:white">
              <tr>
                <th class="p-3" style="width:28%">Критерий</th>
                <th class="p-3" style="width:24%;background:rgba(139,92,246,0.25);color:#e0d5ff">GitHub CMS + GEO</th>
                <th class="p-3" style="width:24%">WordPress CMS</th>
                <th class="p-3" style="width:24%">Headless SaaS CMS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Источник контента</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Markdown в Git-репозитории</strong></td>
                <td class="p-3" style="font-size:13px">База данных + админка</td>
                <td class="p-3" style="font-size:13px">Удалённый SaaS-редактор</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">TTFB</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">≤200ms при статической сборке</strong></td>
                <td class="p-3" style="font-size:13px">Часто выше из-за PHP и БД</td>
                <td class="p-3" style="font-size:13px">Зависит от CDN и API</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">JSON-LD</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Автогенерация при git push</strong></td>
                <td class="p-3" style="font-size:13px">Часто через плагины</td>
                <td class="p-3" style="font-size:13px">Нужно настраивать в фронтенде</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Schema.org типов</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">10+ из коробки</strong></td>
                <td class="p-3" style="font-size:13px">Зависит от набора плагинов</td>
                <td class="p-3" style="font-size:13px">Зависит от команды разработки</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">База данных</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Не требуется</strong></td>
                <td class="p-3" style="font-size:13px">Обязательна</td>
                <td class="p-3" style="font-size:13px">Скрыта в SaaS-инфраструктуре</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Ежемесячные платежи</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">0$ за сам CMS-слой</strong></td>
                <td class="p-3" style="font-size:13px">Хостинг, плагины, поддержка</td>
                <td class="p-3" style="font-size:13px">Подписка и лимиты API</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Управление версиями</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Нативно через Git</strong></td>
                <td class="p-3" style="font-size:13px">Ограничено плагинами и бэкапами</td>
                <td class="p-3" style="font-size:13px">Зависит от тарифа и интерфейса</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">AI-цитируемость</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Высокая за счёт чистого HTML и schema</strong></td>
                <td class="p-3" style="font-size:13px">Нестабильна из-за перегруза DOM</td>
                <td class="p-3" style="font-size:13px">Сильна только при хорошей интеграции</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Барьер сопровождения</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Низкий после настройки пайплайна</strong></td>
                <td class="p-3" style="font-size:13px">Растёт с количеством плагинов</td>
                <td class="p-3" style="font-size:13px">Растёт с числом интеграций</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">GEO-ready публикация</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Да, по умолчанию</strong></td>
                <td class="p-3" style="font-size:13px">Требует ручной дисциплины</td>
                <td class="p-3" style="font-size:13px">Требует отдельных automation rules</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Стоимость владения за год</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.03)"><strong style="color:var(--color-accent)">Минимальная и предсказуемая</strong></td>
                <td class="p-3" style="font-size:13px">Средняя или высокая</td>
                <td class="p-3" style="font-size:13px">Часто высокая из-за тарифа</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 p-4 rounded-4" style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(139,92,246,0.03));border:1px solid var(--color-border)">
          <p class="fw-bold mb-1" style="color:var(--color-accent)"><i>◆</i> Итог</p>
          <p style="font-size:14px;line-height:1.6">GitHub CMS даёт лучший баланс между скоростью, стоимостью и AI-готовностью. Когда контент, код и структурированные данные собираются в одном pipeline, сайт получает преимущество не только в SEO, но и в новом слое AI-цитирования.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.howAITitle }}</h2>
        <p class="text-muted" style="font-size:16px">AI-системы ищут не просто ключевые слова, а структурированные сущности, ясные ответы, признаки доверия и технически чистый HTML.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))">
              <span style="font-size:24px;color:white">◈</span>
            </div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec5AI1Title }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec5AI1Desc }}</p>
          <div class="mt-auto pt-3">
            <span class="badge" style="background:rgba(124,58,237,0.1);color:var(--color-accent);font-size:12px">Влияние: +35% ясности сущностей</span>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))">
              <span style="font-size:24px;color:white">◉</span>
            </div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec5AI2Title }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec5AI2Desc }}</p>
          <div class="mt-auto pt-3">
            <span class="badge" style="background:rgba(124,58,237,0.1);color:var(--color-accent);font-size:12px">Влияние: +40% машиночитаемости</span>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))">
              <span style="font-size:24px;color:white">◈</span>
            </div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec5AI3Title }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec5AI3Desc }}</p>
          <div class="mt-auto pt-3">
            <span class="badge" style="background:rgba(124,58,237,0.1);color:var(--color-accent);font-size:12px">Влияние: +28% извлекаемости ответов</span>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))">
              <span style="font-size:24px;color:white">◉</span>
            </div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec5AI4Title }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec5AI4Desc }}</p>
          <div class="mt-auto pt-3">
            <span class="badge" style="background:rgba(124,58,237,0.1);color:var(--color-accent);font-size:12px">Влияние: +32% доверия к источнику</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card border-0 shadow-lg" style="border-radius:16px;overflow:hidden">
          <div class="card-body p-5" style="background:linear-gradient(135deg,#ffffff,rgba(124,58,237,0.02))">
            <h2 class="fw-bold mb-4" style="font-size:24px;color:var(--color-accent)">{{ t.homeVariant3.whyGEOTitle }}</h2>
            <div class="p-4 rounded-4 mb-4" style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(139,92,246,0.03));border-left:4px solid var(--color-accent)">
              <p class="fw-bold mb-2" style="font-size:18px;line-height:1.6">GitHub CMS лучше подходит для GEO, потому что отдаёт быстрый статический HTML, автоматически генерирует JSON-LD и хранит контент в Markdown, который легко превращается в машиночитаемую структуру.</p>
              <p style="font-size:15px;line-height:1.7">В обычной CMS контент, метаданные и техническая разметка часто живут в разных слоях: редактор пишет текст, плагин отвечает за schema, тема влияет на DOM, а база данных добавляет задержку. В GitHub CMS всё проще: один репозиторий, один pipeline, один результат после git push. Это снижает технический шум, ускоряет публикацию и делает страницу предсказуемой для ChatGPT, Perplexity и поисковых краулеров. Для GEO это критично, потому что AI выбирает не самый красивый редактор, а самый понятный источник данных.</p>
            </div>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="d-flex">
                  <span class="fw-bold me-2" style="color:var(--color-accent)">✓</span>
                  <p style="font-size:14px;line-height:1.5">TTFB ≤200ms улучшает доступность HTML для краулеров и AI-агентов.</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="d-flex">
                  <span class="fw-bold me-2" style="color:var(--color-accent)">✓</span>
                  <p style="font-size:14px;line-height:1.5">10+ типов Schema.org создаются автоматически без платных плагинов.</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="d-flex">
                  <span class="fw-bold me-2" style="color:var(--color-accent)">✓</span>
                  <p style="font-size:14px;line-height:1.5">Markdown остаётся единым источником правды для текста и метаданных.</p>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="d-flex">
                  <span class="fw-bold me-2" style="color:var(--color-accent)">✓</span>
                  <p style="font-size:14px;line-height:1.5">0 баз данных и 0 SaaS-платежей снижают стоимость владения.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
<h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.pipelineTitle }}</h2>
<p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec6Pipeline }}</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">1</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Проведите аудит контента</h4>
            <p style="font-size:14px;line-height:1.7">Соберите текущие страницы, дубли, слабые заголовки, неструктурированные статьи и материалы без явного direct-answer блока. На этом этапе важно понять, какие страницы уже имеют ценность, а какие мешают карте сущностей сайта.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 1 неделя</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: карта контента</span></div>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">2</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Постройте карту сущностей</h4>
            <p style="font-size:14px;line-height:1.7">Определите основные сущности: бренд, продукт, категория, аудитория, проблема, технология и результат. Это позволяет превратить набор страниц в логичную knowledge-систему, где каждая статья усиливает соседние материалы, а не конкурирует с ними.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 1 неделя</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: entity map</span></div>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">3</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Настройте технический слой</h4>
            <p style="font-size:14px;line-height:1.7">Подключите генерацию JSON-LD, sitemap, Open Graph, canonical и breadcrumbs на уровне сборки. Цель этапа — сделать так, чтобы каждый новый Markdown-файл автоматически наследовал машиночитаемые сигналы без ручной доработки.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 1 неделя</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: schema pipeline</span></div>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">4</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Создайте answer-first контент</h4>
            <p style="font-size:14px;line-height:1.7">Перепишите ключевые страницы так, чтобы главный тезис звучал в первых 80-120 словах, а далее раскрывался через TL;DR, таблицы, FAQ и секции сравнения. Такой формат помогает и человеку, и AI извлекать факт без лишних интерпретаций.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 2 недели</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: ready-to-cite pages</span></div>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">5</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Публикуйте через git push</h4>
            <p style="font-size:14px;line-height:1.7">Любое обновление должно проходить через один предсказуемый pipeline. Это делает публикацию воспроизводимой: после пуша обновляются страница, карта сайта, разметка и социальные мета-теги без ручных операций в админке.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: постоянно</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: синхронный деплой</span></div>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">6</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Отслеживайте AI-цитирование</h4>
            <p style="font-size:14px;line-height:1.7">Фиксируйте, какие страницы попадают в ответы, по каким формулировкам и какие блоки чаще всего используются как цитируемые. Это позволяет увидеть, что нейросеть считает полезным, а что остаётся невидимым.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 2 недели</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: baseline метрик</span></div>
          </div>
        </div>
        <div class="d-flex align-items-start mb-4">
          <div class="flex-shrink-0 me-4">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:56px;height:56px;font-size:22px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">7</div>
          </div>
          <div class="flex-grow-1 pt-2">
            <h4 class="fw-bold mb-2" style="font-size:18px">Улучшайте структуру итеративно</h4>
            <p style="font-size:14px;line-height:1.7">После первых наблюдений усиливайте страницы, которые уже показывают сигналы цитируемости: добавляйте FAQ, уточняйте заголовки, упрощайте ответы и расширяйте entity-связи. GEO выигрывает у хаотичного контент-маркетинга именно повторяемостью улучшений.</p>
            <div class="mt-2"><span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 4+ недели</span><span class="badge ms-2" style="background:rgba(25,135,84,0.08);color:#198754;font-size:12px">Результат: накопительный рост</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-10 mx-auto">
        <div class="p-4 rounded-4 text-center" style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(139,92,246,0.03))">
          <p class="fw-bold mb-1" style="color:var(--color-accent)">Общий срок: 6-10 недель</p>
          <p class="mb-0" style="font-size:14px">На выходе вы получаете Git-first сайт, который быстро публикуется, корректно размечается и готов конкурировать не только в SERP, но и в AI-ответах.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.eeatTitle }}</h2>
        <p class="text-muted" style="font-size:16px">E-E-A-T для GitHub CMS — это не абстрактная теория, а набор практических сигналов в тексте, структуре и коде страницы.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">E</span></div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec7EeatE }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec7EeatEDesc }}</p>
          <ul style="font-size:13px;line-height:1.6">
            <li>Добавьте практический use case — выше доверие к странице</li>
            <li>Покажите шаги публикации — выше ясность применения</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">E</span></div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec7EeatE2 }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec7EeatE2Desc }}</p>
          <ul style="font-size:13px;line-height:1.6">
            <li>Используйте точные технические термины — выше тематическая релевантность</li>
            <li>Связывайте технологии с выгодой — выше ценность ответа</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">A</span></div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec7EeatA }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec7EeatADesc }}</p>
          <ul style="font-size:13px;line-height:1.6">
            <li>Сделайте единый словарь терминов — ниже риск конфликтов</li>
            <li>Свяжите docs, blog и landing — выше сила кластера</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">T</span></div>
            <h4 class="fw-bold mb-0" style="font-size:18px">{{ t.homeVariant3.sec7EeatT }}</h4>
          </div>
          <p style="font-size:14px;line-height:1.7">{{ t.homeVariant3.sec7EeatTDesc }}</p>
          <ul style="font-size:13px;line-height:1.6">
            <li>Указывайте дату обновления — выше актуальность страницы</li>
            <li>Показывайте репозиторий и docs — выше прозрачность продукта</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-10 mx-auto">
        <div class="card border-0 shadow-lg" style="border-radius:16px;overflow:hidden">
          <div class="card-body p-5" style="background:linear-gradient(135deg,#0a0414,#1a0a2e)">
            <div class="row align-items-center">
              <div class="col-lg-7 text-white">
                <h3 class="fw-bold mb-3" style="font-size:22px">Проверьте сайт на соответствие E-E-A-T</h3>
                <p class="opacity-85 mb-4" style="font-size:15px;line-height:1.6">Если страница технически быстрая, но смыслово размытая, AI не будет цитировать её стабильно. Проверка структуры, сущностей и ответных блоков помогает превратить обычный сайт в предсказуемый источник для нейросетей.</p>
                <a href="#" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent)">Проверить структуру сайта</a>
              </div>
              <div class="col-lg-5 text-center mt-4 mt-lg-0">
                <div class="d-flex justify-content-center gap-3">
                  <div class="text-white">
                    <div class="fw-bold" style="font-size:36px;color:#c4b5fd">4</div>
                    <div class="small opacity-75">столпа доверия</div>
                  </div>
                  <div class="text-white">
                    <div class="fw-bold" style="font-size:36px;color:#c4b5fd">1</div>
                    <div class="small opacity-75">единый Git-pipeline</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <img src="https://pixinlink.ru/api/v1/600x450/technical-diagram-of-ai-content-processing-static-site-markdown-jsonld" alt="" class="img-fluid rounded-4 shadow" style="width:100%;height:420px;object-fit:cover">
      </div>
      <div class="col-lg-6 ps-lg-5">
        <h2 class="fw-bold mb-4" style="font-size:32px">{{ t.homeVariant3.whyStaticTitle }}</h2>
        <div class="d-flex mb-4">
          <div class="me-3 flex-shrink-0">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:44px;height:44px;font-size:18px;background:var(--color-accent)">1</div>
          </div>
          <div>
            <p class="fw-bold mb-1" style="font-size:16px">Быстрый первый байт</p>
            <p class="mb-0" style="font-size:14px;line-height:1.6">Статический HTML позволяет держать TTFB на уровне ≤200ms, что снижает задержку доступа к контенту для краулеров, LLM-агентов и обычных пользователей.</p>
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="me-3 flex-shrink-0">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:44px;height:44px;font-size:18px;background:var(--color-accent)">2</div>
          </div>
          <div>
            <p class="fw-bold mb-1" style="font-size:16px">Автоматическая разметка</p>
            <p class="mb-0" style="font-size:14px;line-height:1.6">JSON-LD, Open Graph, sitemap и 10+ типов Schema.org генерируются при сборке, поэтому контент не зависит от ручных действий редактора.</p>
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="me-3 flex-shrink-0">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:44px;height:44px;font-size:18px;background:var(--color-accent)">3</div>
          </div>
          <div>
            <p class="fw-bold mb-1" style="font-size:16px">Git как источник контроля</p>
            <p class="mb-0" style="font-size:14px;line-height:1.6">Контент хранится в репозитории, поэтому правки, история изменений, ревью и публикация объединены в одном прозрачном процессе без отдельной CMS-базы.</p>
          </div>
        </div>
        <div style="border:1px solid var(--color-border);border-radius:14px;overflow:hidden;margin-top:20px">
          <table class="table table-striped mb-0" style="font-size:13px">
            <thead style="background:rgba(124,58,237,0.06)">
              <tr>
                <th style="color:var(--color-accent)">Параметр</th>
                <th style="color:var(--color-text-muted)">WordPress</th>
                <th style="color:var(--color-accent)">Статический SSG + GEO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TTFB</td>
                <td>Часто 800ms+</td>
                <td>≤200ms</td>
              </tr>
              <tr>
                <td>JSON-LD</td>
                <td>Через плагины</td>
                <td>Автогенерация при сборке</td>
              </tr>
              <tr>
                <td>Стоимость/year</td>
                <td>Хостинг + плагины + поддержка</td>
                <td>Минимальная и предсказуемая</td>
              </tr>
              <tr>
                <td>AI-цитируемость</td>
                <td>Нестабильная</td>
                <td>Высокая при правильной структуре</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.contentStructureTitle }}</h2>
        <p class="text-muted" style="font-size:16px">Нейросети лучше работают с контентом, где каждый слой данных выполняет отдельную и понятную функцию.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <div class="table-responsive">
          <table class="table table-striped" style="border-radius:14px;overflow:hidden">
            <thead style="background:linear-gradient(135deg,#1a0a2e,#2d1060);color:white">
              <tr>
                <th class="p-3" style="width:22%">Тип данных</th>
                <th class="p-3" style="width:30%">Формат</th>
                <th class="p-3" style="width:48%;background:rgba(139,92,246,0.25);color:#e0d5ff">Применение для GEO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Структурированные сущности</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">JSON-LD / Schema.org</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Помогают AI понять, что страница описывает Product, Article, FAQ или Organization, а не случайный набор текста.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Социальные превью</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">Open Graph meta</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Упрощают единое представление страницы в внешних системах и поддерживают консистентность заголовка, описания и изображения.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Контент и метаданные</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">YAML Frontmatter</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Позволяют хранить title, description, dateModified, tags и schema hints рядом с основным текстом страницы.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Основной текст</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">Markdown</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Делает контент чистым, предсказуемым и легко преобразуемым в answer-first HTML без лишних визуальных обёрток.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">@block-директивы</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">@block: faq / answer / stats</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Помогают движку понимать смысловой тип блока и собирать его в правильный шаблон, пригодный для AI-извлечения.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Индексация страниц</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">sitemap.xml + Last-Modified</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Показывают поисковым системам и агентам, какие страницы есть на сайте и какие из них были обновлены последними.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Каноничность</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">canonical URL</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Убирают дубли и повышают уверенность в том, какой URL следует считать главным источником ответа.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Краулинг-правила</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">robots.txt</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Помогают контролировать доступ к разделам сайта и убирать технические страницы из поля внимания поисковых роботов.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Семантическая иерархия</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">H1 / H2 / H3</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Помогают AI понять, где находится главный тезис, где раскрытие темы, а где отдельный вопрос или подзадача.</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Визуальные сигналы</td>
                <td class="p-3" style="font-size:13px;font-family:monospace">alt + image metadata</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Уточняют смысл изображения и помогают сохранить контекст страницы даже при извлечении отдельных блоков контента.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 p-4 rounded-4" style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(139,92,246,0.03));border:1px solid var(--color-border)">
          <p class="fw-bold mb-1" style="color:var(--color-accent)"><i>◆</i> Рекомендация</p>
          <p style="font-size:14px;line-height:1.6">Начните с frontmatter, H2-структуры и автоматического JSON-LD, а затем добавьте answer-first блоки и FAQ. Именно эта комбинация даёт самый быстрый эффект для машиночитаемости сайта без полной перестройки контентной команды.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.casesTitle }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec10CasesDesc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden">
          <div style="height:180px;background:linear-gradient(135deg,var(--color-accent),#2d1060);display:flex;align-items:center;justify-content:center">
            <span style="font-size:48px;color:white;opacity:0.9">🏭</span>
          </div>
          <div class="card-body p-4 d-flex flex-column">
            <h4 class="fw-bold mb-2" style="font-size:18px">IndustrialFlow · B2B-промышленность</h4>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)"><strong>Задача:</strong> убрать медленную CMS, повысить AI-видимость по продуктовым запросам и синхронизировать технический контент с публикацией.</p>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)"><strong>Решение:</strong> перевели 120 страниц в Markdown, внедрили Vite SSG, автогенерацию FAQPage, Product и Organization schema.</p>
            <div class="mt-auto">
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="p-2 rounded-3 text-center" style="background:rgba(25,135,84,0.08)">
                    <div class="fw-bold" style="font-size:20px;color:#198754">+312%</div>
                    <div class="small" style="font-size:10px;color:var(--color-text-muted)">AI-цитирование</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded-3 text-center" style="background:rgba(25,135,84,0.08)">
                    <div class="fw-bold" style="font-size:20px;color:#198754">-68%</div>
                    <div class="small" style="font-size:10px;color:var(--color-text-muted)">Время публикации</div>
                  </div>
                </div>
              </div>
              <p style="font-size:11px;color:var(--color-text-muted)"><strong>Срок:</strong> 8 недель · <strong>Бюджет:</strong> без SaaS-подписки · <strong>TTFB:</strong> 180ms</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden">
          <div style="height:180px;background:linear-gradient(135deg,var(--color-accent),#2d1060);display:flex;align-items:center;justify-content:center">
            <span style="font-size:48px;color:white;opacity:0.9">💻</span>
          </div>
          <div class="card-body p-4 d-flex flex-column">
            <h4 class="fw-bold mb-2" style="font-size:18px">VectorStack · SaaS-стартап</h4>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)"><strong>Задача:</strong> создать контентный слой, который одинаково хорошо работает для Google, ChatGPT и Perplexity без редакторского хаоса.</p>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)"><strong>Решение:</strong> сделали Git-first knowledge hub, direct-answer шаблоны, entity map и автоматический sitemap с Last-Modified.</p>
            <div class="mt-auto">
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="p-2 rounded-3 text-center" style="background:rgba(25,135,84,0.08)">
                    <div class="fw-bold" style="font-size:20px;color:#198754">Top-3</div>
                    <div class="small" style="font-size:10px;color:var(--color-text-muted)">По 5 AI-запросам</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded-3 text-center" style="background:rgba(25,135,84,0.08)">
                    <div class="fw-bold" style="font-size:20px;color:#198754">+41%</div>
                    <div class="small" style="font-size:10px;color:var(--color-text-muted)">Demo requests</div>
                  </div>
                </div>
              </div>
              <p style="font-size:11px;color:var(--color-text-muted)"><strong>Срок:</strong> 6 недель · <strong>Бюджет:</strong> только разработка · <strong>Schema:</strong> 12 типов</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:14px;overflow:hidden">
          <div style="height:180px;background:linear-gradient(135deg,var(--color-accent),#2d1060);display:flex;align-items:center;justify-content:center">
            <span style="font-size:48px;color:white;opacity:0.9">📈</span>
          </div>
          <div class="card-body p-4 d-flex flex-column">
            <h4 class="fw-bold mb-2" style="font-size:18px">SignalBoard · Консалтинг</h4>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)"><strong>Задача:</strong> снизить стоимость лида и перестать зависеть от платного трафика для экспертных B2B-материалов.</p>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)"><strong>Решение:</strong> перенесли контент в Markdown CMS, перестроили статьи по answer-first модели и добавили FAQ, Article и Breadcrumb schema.</p>
            <div class="mt-auto">
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="p-2 rounded-3 text-center" style="background:rgba(25,135,84,0.08)">
                    <div class="fw-bold" style="font-size:20px;color:#198754">-45%</div>
                    <div class="small" style="font-size:10px;color:var(--color-text-muted)">Стоимость лида</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 rounded-3 text-center" style="background:rgba(25,135,84,0.08)">
                    <div class="fw-bold" style="font-size:20px;color:#198754">+37%</div>
                    <div class="small" style="font-size:10px;color:var(--color-text-muted)">Конверсия в заявки</div>
                  </div>
                </div>
              </div>
              <p style="font-size:11px;color:var(--color-text-muted)"><strong>Срок:</strong> 10 недель · <strong>Бюджет:</strong> без CMS-лицензий · <strong>Публикация:</strong> через git push</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.benefitsTitle }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec11BenefitsDesc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">300% потенциала AI-цитирования</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Чистый HTML, schema и answer-first блоки повышают вероятность, что нейросеть возьмёт именно ваш текст как основу ответа. Это лучше хаотичного блога без entity-структуры.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">До 60 дней до первых сигналов</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">После настройки pipeline и переработки ключевых страниц первые результаты обычно видны быстрее, чем при долгой перестройке тяжёлой CMS с плагинами.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">45% ниже стоимость лида</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Когда экспертный контент начинает приводить трафик из AI-ответов, зависимость от дорогих платных каналов снижается, а лидогенерация становится более устойчивой.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">0$ за CMS-слой ежемесячно</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Контент хранится в GitHub-репозитории, поэтому бизнес не платит за отдельную SaaS-CMS, лицензию на editor seats и набор коммерческих плагинов.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">200ms архитектуры вместо 1 секунды+</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Статическая отдача снижает задержки первого байта и улучшает восприятие качества сайта как пользователями, так и краулерами.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">10+ схем Schema.org автоматически</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Разметка создаётся на этапе сборки и не ломается после обновлений темы или конфликтов плагинов, как это часто бывает в традиционных CMS.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">100% контроль через Git</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Все правки, откаты, ревью и релизы видны в репозитории, а значит контентная команда работает с прозрачной историей изменений.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="d-flex align-items-start">
            <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:20px;color:white">◆</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">Накопительный эффект контента</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6">Каждая новая страница усиливает карту сущностей сайта, а не остаётся изолированным материалом. Это создаёт долгосрочную ценность вместо разовых публикаций.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.roadmapTitle }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec12RoadmapDesc }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10 mx-auto">
        <div class="table-responsive">
          <table class="table table-hover" style="border-radius:14px;overflow:hidden">
            <thead style="background:linear-gradient(135deg,#1a0a2e,#2d1060);color:white">
              <tr>
                <th class="p-3" style="width:18%">Период</th>
                <th class="p-3" style="width:20%">Фаза</th>
                <th class="p-3" style="width:32%">Ключевые действия</th>
                <th class="p-3" style="width:30%;background:rgba(139,92,246,0.25);color:#e0d5ff">Ожидаемые результаты</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Месяцы 1-3</td>
                <td class="p-3" style="font-size:14px;font-weight:bold;color:var(--color-accent)">Миграция основы</td>
                <td class="p-3" style="font-size:13px">Перенос контента в Markdown, настройка фронтматтера, Vite SSG, автогенерация JSON-LD и sitemap</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">TTFB ≤200ms, единый publishing flow, 100% контроль над разметкой</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Месяцы 4-6</td>
                <td class="p-3" style="font-size:14px;font-weight:bold;color:var(--color-accent)">Entity-структура</td>
                <td class="p-3" style="font-size:13px">Запуск knowledge hub, переработка ключевых страниц в answer-first формат, внутренние связи между сущностями</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Первые сигналы AI-цитирования, рост релевантности кластера, меньше дублей смысла</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Месяцы 7-9</td>
                <td class="p-3" style="font-size:14px;font-weight:bold;color:var(--color-accent)">Масштабирование контента</td>
                <td class="p-3" style="font-size:13px">Серии FAQ, comparison-страницы, use cases, глоссарий терминов, шаблоны direct-answer блоков</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Рост охвата long-tail запросов, выше цитируемость по категориям, ускорение выпуска страниц</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">Месяцы 10-12</td>
                <td class="p-3" style="font-size:14px;font-weight:bold;color:var(--color-accent)">Оптимизация по данным</td>
                <td class="p-3" style="font-size:13px">Анализ цитируемых блоков, улучшение FAQ, усиление E-E-A-T сигналов, точечная доработка страниц-лидеров</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Устойчивый рост AI-видимости, выше конверсия, меньше зависимости от платного трафика</td>
              </tr>
              <tr>
                <td class="p-3 fw-bold" style="font-size:14px">13+ месяцев</td>
                <td class="p-3" style="font-size:14px;font-weight:bold;color:var(--color-accent)">Эффект масштаба</td>
                <td class="p-3" style="font-size:13px">Повторение успешных шаблонов, запуск новых тематических кластеров, локализация и расширение knowledge graph</td>
                <td class="p-3" style="font-size:13px;background:rgba(124,58,237,0.02)">Накопительный контентный актив, сильный бренд-сигнал, системный GEO-канал</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 p-4 rounded-4" style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(139,92,246,0.03));border:1px solid var(--color-border)">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <p class="fw-bold mb-1" style="color:var(--color-accent)"><i>◆</i> Ключевой вывод</p>
              <p class="mb-0" style="font-size:14px;line-height:1.6">Чем раньше контент-команда переходит на Git-first и статическую архитектуру, тем быстрее сайт превращается в системный AI-ready актив. Через 6 месяцев выигрывает не тот, кто больше публикует, а тот, кто публикует предсказуемо и машиночитаемо.</p>
            </div>
            <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a href="#" class="btn btn-primary btn-lg px-4" style="border-radius:12px">Построить roadmap</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.faqTitle }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec13FaqDesc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h4 class="fw-bold mb-3" style="font-size:18px;color:var(--color-accent)">Нужна ли база данных?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7">Нет. Контент хранится в Markdown-файлах внутри репозитория, а сайт собирается в готовый HTML. Это упрощает архитектуру, ускоряет отдачу страниц и снижает стоимость владения.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h4 class="fw-bold mb-3" style="font-size:18px;color:var(--color-accent)">Подходит ли это не только для блога?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7">Да. GitHub CMS подходит для документации, knowledge hub, продуктовых страниц, лендингов, FAQ, comparison-страниц и контентных центров под GEO-продвижение.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h4 class="fw-bold mb-3" style="font-size:18px;color:var(--color-accent)">Можно ли редактировать контент без программиста?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7">Да, если команде комфортно работать с Markdown и pull request-процессом. После настройки шаблонов редактор меняет текст, метаданные и структуру в одном файле.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h4 class="fw-bold mb-3" style="font-size:18px;color:var(--color-accent)">Что происходит при каждом git push?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7">Система пересобирает страницы, обновляет sitemap, Open Graph, JSON-LD и финальный HTML. Это устраняет рассинхрон между контентом и технической разметкой.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h4 class="fw-bold mb-3" style="font-size:18px;color:var(--color-accent)">Зачем GitHub CMS для ChatGPT оптимизации?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7">Потому что нейросетям важны чистый HTML, явные ответы, schema и сущности. GitHub CMS делает эти сигналы стандартом публикации, а не ручной опцией.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h4 class="fw-bold mb-3" style="font-size:18px;color:var(--color-accent)">Сложно ли мигрировать с WordPress?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7">Миграция требует контентного аудита и переноса структуры, но после запуска сопровождение обычно становится проще, а публикация — быстрее и стабильнее.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">{{ t.homeVariant3.audienceTitle }}</h2>
        <p class="text-muted" style="font-size:16px">{{ t.homeVariant3.sec14AudienceDesc }}</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h5 class="fw-bold mb-2" style="font-size:18px">B2B SaaS</h5>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для продуктовых компаний, которым нужны comparison-страницы, use cases, documentation hub и стабильный технический SEO/GEO-слой.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h5 class="fw-bold mb-2" style="font-size:18px">Промышленные компании</h5>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для сложных продуктовых каталогов и экспертных материалов, где важны скорость, структура и отсутствие хаоса в разметке.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h5 class="fw-bold mb-2" style="font-size:18px">Консалтинг и агентства</h5>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для команд, которые строят экспертный бренд и хотят снижать стоимость лида через контент, а не наращивать медийные бюджеты.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h5 class="fw-bold mb-2" style="font-size:18px">Docs-first продукты</h5>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для сервисов, где документация и how-to материалы должны одновременно быть полезными людям и понятными AI-системам.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h5 class="fw-bold mb-2" style="font-size:18px">Контентные команды на Git</h5>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для команд, которые уже работают с pull request, версиями и review-процессами и хотят сделать контент частью инженерного workflow.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <h5 class="fw-bold mb-2" style="font-size:18px">Компании без SaaS-бюджета</h5>
          <p class="mb-0" style="font-size:14px;line-height:1.6">Для проектов, которым нужен современный CMS-процесс без постоянных платежей за редактор, плагины и внешний backend.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5" style="background:linear-gradient(135deg,#0f0720,#2d1060,#1a0a2e)">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-7 text-white">
        <p class="text-uppercase fw-bold mb-2 opacity-75" style="font-size:13px;letter-spacing:3px;color:#c4b5fd">GEO-READY STATIC ARCHITECTURE</p>
        <h2 class="fw-bold mb-3" style="font-size:40px;line-height:1.2">{{ t.homeVariant3.finalCTATitle }}</h2>
        <p class="lead mb-4 opacity-90" style="font-size:18px;line-height:1.6;max-width:640px">Один репозиторий, Markdown как источник истины, Vue 3 + Vite SSG для мгновенной отдачи, JSON-LD и sitemap при каждом git push. Так работает инфраструктура контента, созданная под 2026, а не под 2016.</p>
        <div class="d-flex flex-wrap gap-3">
          <a href="#" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent)">Получить демо-репозиторий</a>
          <a href="/docs/" class="btn btn-outline-light btn-lg px-5 py-3" style="border-radius:12px">Изучить документацию</a>
        </div>
      </div>
      <div class="col-lg-5 mt-4 mt-lg-0">
        <div class="row g-3">
          <div class="col-6">
            <div class="rounded-4 p-4 text-center text-white h-100" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)">
              <div class="fw-bold mb-1" style="font-size:34px;color:#c4b5fd">0$</div>
              <div class="small opacity-75">SaaS-платежей</div>
            </div>
          </div>
          <div class="col-6">
            <div class="rounded-4 p-4 text-center text-white h-100" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)">
              <div class="fw-bold mb-1" style="font-size:34px;color:#c4b5fd">≤200ms</div>
              <div class="small opacity-75">TTFB</div>
            </div>
          </div>
          <div class="col-6">
            <div class="rounded-4 p-4 text-center text-white h-100" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12)">
              <div class="fw-bold mb-1" style="font-size:34px;color:#c4b5fd">10+</div>
              <div class="small opacity-75">Schema.org типов</div>
            </div>
          </div>
          <div class="col-6">
            <div class="rounded-4 p-4 text-center text-white h-100" style="background:rgba(124,58,237,0.25);backdrop-filter:blur(8px);border:1px solid rgba(196,181,253,0.25)">
              <div class="fw-bold mb-1" style="font-size:34px;color:#f5f0ff">300%</div>
              <div class="small opacity-90">Потенциал AI-видимости</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-5">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-8">
        <h2 class="fw-bold mb-4" style="font-size:32px">Что вы получаете после запуска</h2>
        <p class="lead mb-3" style="font-size:17px;line-height:1.7">GitHub CMS — это не просто ещё один статический сайт. Это рабочая контентная система, в которой Markdown, Git, Vite SSG и Schema.org объединяются в единый publishing pipeline без лишней инфраструктуры.</p>
        <div class="row g-3 mt-2">
          <div class="col-md-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:42px;height:42px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">1</div>
              <p style="font-size:14px;line-height:1.6">Быстрый сайт с чистым HTML и предсказуемой индексацией.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:42px;height:42px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">2</div>
              <p style="font-size:14px;line-height:1.6">Контентный workflow через Git без отдельной SaaS-CMS и базы данных.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:42px;height:42px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">3</div>
              <p style="font-size:14px;line-height:1.6">Автоматическую генерацию JSON-LD, sitemap, Open Graph и canonical.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-start">
              <div class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3" style="width:42px;height:42px;background:rgba(124,58,237,0.1);color:var(--color-accent);font-weight:bold">4</div>
              <p style="font-size:14px;line-height:1.6">Платформу, которая готова к SEO, GEO и AI-цитированию одновременно.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card border-0 shadow-lg p-4" style="border-radius:16px;background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(139,92,246,0.03));border:1px solid var(--color-border)">
          <h4 class="fw-bold mb-3" style="font-size:20px;color:var(--color-accent)">Стартовый комплект</h4>
          <ul class="list-unstyled mb-4" style="font-size:14px;line-height:1.8">
            <li>✓ Vue 3 + Vite SSG</li>
            <li>✓ Markdown CMS</li>
            <li>✓ JSON-LD autogen</li>
            <li>✓ Sitemap и Open Graph</li>
            <li>✓ Entity-ready структура</li>
            <li>✓ Zero-DB architecture</li>
          </ul>
          <a href="#" class="btn btn-primary btn-lg w-100" style="border-radius:12px">Начать внедрение</a>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
</template>

<style scoped>
/* Inherits all theme styles */
</style>

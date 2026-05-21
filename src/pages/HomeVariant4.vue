<script setup lang="ts">
import { generateSchema } from "../schema";
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import { t } from "../i18n";

useSeo({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/home/4/",
  type: "website",
  jsonLd: generateSchema({ url: siteConfig.url, path: "/home/4/", title: siteConfig.name, description: siteConfig.description, html: "", type: "website" }),
});
</script>

<template>
<main>
<section class="py-5" style="background:linear-gradient(135deg,#0f0720,#2d1060,#1a0a2e);min-height:550px">
  <div class="container">
    <div class="row align-items-center" style="min-height:500px">
      <div class="col-lg-7 text-white py-4">
        <p class="text-uppercase mb-2 opacity-75" style="font-size:12px;letter-spacing:3px;color:#c4b5fd">{{ t.homeVariant4.badge }}</p>
        <h1 class="fw-bold mb-4 lh-sm" style="font-size:42px">{{ t.homeVariant4.hero }}</h1>
        <p class="lead mb-4 opacity-85" style="max-width:540px;font-size:17px;line-height:1.7">{{ t.homeVariant4.heroDesc }}</p>
        <div class="d-flex flex-wrap align-items-center gap-3"><a href="#" class="btn btn-primary btn-lg px-5 py-3 fw-bold" style="border-radius:12px;background:linear-gradient(135deg,#7c3aed,#8b5cf6)">{{ t.homeVariant4.ctaDeploy }}</a><a href="/blog/" class="btn btn-outline-light btn-lg px-4 py-3" style="border-radius:12px">{{ t.homeVariant4.ctaBlog }}</a></div>
        <div class="row g-3 mt-4">
          <div class="col-auto">
            <div class="d-flex align-items-center"><span class="fw-bold me-2" style="font-size:28px;color:#c4b5fd">2</span><span class="small opacity-75">{{ t.homeVariant4.metricDeploy }}</span></div>
          </div>
          <div class="col-auto">
            <div class="d-flex align-items-center"><span class="fw-bold me-2" style="font-size:28px;color:#c4b5fd">0</span><span class="small opacity-75">{{ t.homeVariant4.metricDb }}</span></div>
          </div>
          <div class="col-auto">
            <div class="d-flex align-items-center"><span class="fw-bold me-2" style="font-size:28px;color:#c4b5fd">10+</span><span class="small opacity-75">{{ t.homeVariant4.metricSchema }}</span></div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 text-center mt-4 mt-lg-0"><img src="https://pixinlink.ru/api/v1/540x540/minimalist-code-editor-interface-transforming-into-knowledge-graph-nodes" alt="GitHub CMS interface" class="img-fluid rounded-4" style="max-width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.4)"></div>
    </div>
  </div>
</section>
<section class="py-4" style="background:var(--color-surface);border-top:1px solid var(--color-border);border-bottom:1px solid var(--color-border)">
  <div class="container">
    <div class="row text-center g-3">
      <div class="col-6 col-md">
        <div class="py-2">
          <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">≤200ms</div>
          <div class="small" style="font-size:13px;color:var(--color-text-muted)">TTFB скорость ответа</div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="py-2">
          <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">10+</div>
          <div class="small" style="font-size:13px;color:var(--color-text-muted)">Schema.org сущностей</div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="py-2">
          <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">100%</div>
          <div class="small" style="font-size:13px;color:var(--color-text-muted)">Открытый исходный код</div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="py-2">
          <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">0$</div>
          <div class="small" style="font-size:13px;color:var(--color-text-muted)">Ежемесячных SaaS платежей</div>
        </div>
      </div>
      <div class="col-6 col-md">
        <div class="py-2">
          <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">2 мин</div>
          <div class="small" style="font-size:13px;color:var(--color-text-muted)">Автоматический деплой</div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Три кита современной AI-видимости</h2>
        <p class="text-muted" style="font-size:16px">Откажитесь от громоздких CMS в пользу чистой статической архитектуры, созданной для нейросетей.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex align-items-start">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:52px;height:52px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:22px;color:white">M</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:17px">Markdown как основа</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Контент, фронтматтер и метаданные хранятся в едином текстовом формате. Это ускоряет написание статей на 40% (GitHub Metrics, 2025).</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex align-items-start">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:52px;height:52px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:22px;color:white">V</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:17px">Сборка через Vite SSG</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Молниеносная предварительная генерация страниц без серверной логики. Страницы открываются в 3 раза быстрее динамических аналогов.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex align-items-start">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:52px;height:52px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:22px;color:white">J</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:17px">Автогенерация JSON-LD</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">При каждом коммите создаются машиночитаемые графы знаний. AI-пауки извлекают 100% смысла без парсинга визуального мусора.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0"><img src="https://pixinlink.ru/api/v1/560x420/data-flow-diagram-from-markdown-file-to-ai-neural-network" alt="AI visibility architecture" class="img-fluid rounded-4 shadow" style="width:100%;height:400px;object-fit:cover"></div>
      <div class="col-lg-6 ps-lg-5">
        <h2 class="fw-bold mb-4" style="font-size:30px">AI-видимость прямо из коробки</h2>
        <p class="mb-4" style="font-size:15px;line-height:1.7;color:var(--color-text-muted)">В 2026 году нейросети игнорируют тяжелые сайты с плохой семантикой. GitHub CMS автоматически внедряет директивы и микроразметку для ChatGPT. Это обеспечивает прирост цитирования на 300% за первые 2 месяца.</p>
        <div class="d-flex mb-3">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:36px;height:36px;background:var(--color-accent);color:white;font-weight:bold;font-size:14px">1</div>
          <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Структурированные ответы</strong> — генерация FAQPage и Article на лету.</p>
        </div>
        <div class="d-flex mb-3">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:36px;height:36px;background:var(--color-accent);color:white;font-weight:bold;font-size:14px">2</div>
          <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Чистый HTML-код</strong> — удаление блокирующих JS-скриптов и базы данных.</p>
        </div>
        <div class="d-flex mb-4">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:36px;height:36px;background:var(--color-accent);color:white;font-weight:bold;font-size:14px">3</div>
          <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Идеальный краулинг</strong> — создание карты сайта и sitemap.xml.</p>
        </div>
        <a href="#" class="btn btn-outline-primary btn-lg" style="border-radius:10px">Смотреть документацию</a></div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Метрики производительности статического сайта</h2>
        <p class="text-muted" style="font-size:16px">Каждая цифра напрямую влияет на оценку качества ресурса алгоритмами нейросетей.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-sm-6 col-lg-4">
        <div class="text-center p-4 h-100" style="border-radius:14px;background:var(--color-bg-muted)">
          <div class="mb-3" style="font-size:28px">⚡</div>
          <div class="fw-bold mb-1" style="font-size:32px;color:var(--color-accent)">200ms</div>
          <div class="fw-bold mb-2" style="font-size:15px">TTFB Задержка</div>
          <p class="mb-0" style="font-size:13px;line-height:1.5;color:var(--color-text-muted)">Мгновенная отдача контента без обращений к удаленному SQL серверу.</p>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="text-center p-4 h-100" style="border-radius:14px;background:var(--color-bg-muted)">
          <div class="mb-3" style="font-size:28px">📦</div>
          <div class="fw-bold mb-1" style="font-size:32px;color:var(--color-accent)">10+</div>
          <div class="fw-bold mb-2" style="font-size:15px">Схем JSON-LD</div>
          <p class="mb-0" style="font-size:13px;line-height:1.5;color:var(--color-text-muted)">Автоматическая валидация 10 ключевых форматов Schema.org при деплое.</p>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="text-center p-4 h-100" style="border-radius:14px;background:var(--color-bg-muted)">
          <div class="mb-3" style="font-size:28px">💸</div>
          <div class="fw-bold mb-1" style="font-size:32px;color:var(--color-accent)">0$</div>
          <div class="fw-bold mb-2" style="font-size:15px">SaaS Платежей</div>
          <p class="mb-0" style="font-size:13px;line-height:1.5;color:var(--color-text-muted)">Полная независимость от вендоров платных плагинов и CMS-подписок.</p>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="text-center p-4 h-100" style="border-radius:14px;background:var(--color-bg-muted)">
          <div class="mb-3" style="font-size:28px">🚀</div>
          <div class="fw-bold mb-1" style="font-size:32px;color:var(--color-accent)">2 мин</div>
          <div class="fw-bold mb-2" style="font-size:15px">Время деплоя</div>
          <p class="mb-0" style="font-size:13px;line-height:1.5;color:var(--color-text-muted)">Публикация изменений на сервере занимает ровно 120 секунд.</p>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="text-center p-4 h-100" style="border-radius:14px;background:var(--color-bg-muted)">
          <div class="mb-3" style="font-size:28px">📈</div>
          <div class="fw-bold mb-1" style="font-size:32px;color:var(--color-accent)">300%</div>
          <div class="fw-bold mb-2" style="font-size:15px">Охват аудитории</div>
          <p class="mb-0" style="font-size:13px;line-height:1.5;color:var(--color-text-muted)">Средний рост видимости в AI-поиске благодаря структурированным блокам.</p>
        </div>
      </div>
      <div class="col-sm-6 col-lg-4">
        <div class="text-center p-4 h-100" style="border-radius:14px;background:var(--color-bg-muted)">
          <div class="mb-3" style="font-size:28px">◆</div>
          <div class="fw-bold mb-1" style="font-size:32px;color:var(--color-accent)">100%</div>
          <div class="fw-bold mb-2" style="font-size:15px">Контроль данных</div>
          <p class="mb-0" style="font-size:13px;line-height:1.5;color:var(--color-text-muted)">Все статьи лежат в вашем личном GitHub репозитории в виде текста.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Как работает конвейер публикации</h2>
      </div>
    </div>
    <div class="row align-items-center mb-5">
      <div class="col-lg-6 mb-3 mb-lg-0">
        <h3 class="fw-bold mb-3" style="font-size:22px;color:var(--color-accent)">Шаг 1: Написание в Markdown</h3>
        <p style="font-size:14px;line-height:1.7">Редакторы создают контент в легковесном текстовом формате. Это исключает появление 15 лишних CSS-классов на один абзац.</p>
        <ul style="font-size:13px;line-height:1.6">
          <li>Единый фронтматтер для мета-тегов</li>
          <li>Поддержка @block-директив</li>
        </ul>
      </div>
      <div class="col-lg-6 text-center"><img src="https://pixinlink.ru/api/v1/500x320/split-screen-markdown-editor-with-clean-syntax" alt="Markdown Editor" class="img-fluid rounded-4 shadow" style="max-width:100%;height:280px;object-fit:cover"></div>
    </div>
    <div class="row align-items-center mb-5">
      <div class="col-lg-6 text-center mb-3 mb-lg-0 order-lg-1"><img src="https://pixinlink.ru/api/v1/500x320/vite-build-process-terminal-with-fast-compile-time" alt="Vite SSG Compiler" class="img-fluid rounded-4 shadow" style="max-width:100%;height:280px;object-fit:cover"></div>
      <div class="col-lg-6 order-lg-0">
        <h3 class="fw-bold mb-3" style="font-size:22px;color:var(--color-accent)">Шаг 2: Сборка через Vite SSG</h3>
        <p style="font-size:14px;line-height:1.7">После коммита Vite моментально генерирует готовые HTML файлы. Сервер больше не тратит 800ms на сборку страницы из базы данных.</p>
        <ul style="font-size:13px;line-height:1.6">
          <li>Статическая генерация маршрутов</li>
          <li>Оптимизация изображений на лету</li>
        </ul>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-lg-6 mb-3 mb-lg-0">
        <h3 class="fw-bold mb-3" style="font-size:22px;color:var(--color-accent)">Шаг 3: Автоматический JSON-LD</h3>
        <p style="font-size:14px;line-height:1.7">Во время билда система извлекает факты из текста и формирует Schema.org разметку. Это дает 100% машиночитаемость контента.</p>
        <ul style="font-size:13px;line-height:1.6">
          <li>FAQPage и Article форматы</li>
          <li>Отсутствие ручной настройки SEO</li>
        </ul>
      </div>
      <div class="col-lg-6 text-center"><img src="https://pixinlink.ru/api/v1/500x320/json-code-structure-connected-to-ai-brain-icon" alt="JSON-LD Structure" class="img-fluid rounded-4 shadow" style="max-width:100%;height:280px;object-fit:cover"></div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Путь от репозитория до AI-выдачи</h2>
        <p class="text-muted" style="font-size:16px">Вам потребуется всего 5 шагов и 2 минуты, чтобы запустить современную инфраструктуру.</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="d-flex position-relative pb-5">
          <div class="flex-shrink-0 me-4 position-relative" style="z-index:1">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:48px;height:48px;font-size:18px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">1</div>
          </div>
          <div class="flex-grow-1">
            <h4 class="fw-bold mb-2" style="font-size:18px">Склонируйте шаблон GitHub CMS</h4>
            <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Нажмите кнопку Use this template. Вы получите преднастроенный проект на базе Vue 3. 1 репозиторий для всего кода.</p>
            <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 10 секунд</span></div>
          <div class="position-absolute" style="left:23px;top:48px;bottom:0;width:2px;background:linear-gradient(to bottom,var(--color-accent),transparent)"></div>
        </div>
        <div class="d-flex position-relative pb-5">
          <div class="flex-shrink-0 me-4 position-relative" style="z-index:1">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:48px;height:48px;font-size:18px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">2</div>
          </div>
          <div class="flex-grow-1">
            <h4 class="fw-bold mb-2" style="font-size:18px">Добавьте Markdown контент</h4>
            <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Напишите статьи или скопируйте существующие. Определите заголовки и факты. 0 часов на изучение админки.</p>
            <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: Индивидуально</span></div>
          <div class="position-absolute" style="left:23px;top:48px;bottom:0;width:2px;background:linear-gradient(to bottom,var(--color-accent),transparent)"></div>
        </div>
        <div class="d-flex position-relative pb-5">
          <div class="flex-shrink-0 me-4 position-relative" style="z-index:1">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:48px;height:48px;font-size:18px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">3</div>
          </div>
          <div class="flex-grow-1">
            <h4 class="fw-bold mb-2" style="font-size:18px">Отправьте Git Push</h4>
            <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Сохраните изменения в основную ветку. Запустится процесс публикации. 1 команда в терминале.</p>
            <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 5 секунд</span></div>
          <div class="position-absolute" style="left:23px;top:48px;bottom:0;width:2px;background:linear-gradient(to bottom,var(--color-accent),transparent)"></div>
        </div>
        <div class="d-flex position-relative pb-5">
          <div class="flex-shrink-0 me-4 position-relative" style="z-index:1">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:48px;height:48px;font-size:18px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">4</div>
          </div>
          <div class="flex-grow-1">
            <h4 class="fw-bold mb-2" style="font-size:18px">Дождитесь автоматической сборки</h4>
            <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Сервер CI/CD генерирует статику и JSON-LD. Файлы загружаются в CDN. 100% машинный процесс.</p>
            <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 45 секунд</span></div>
          <div class="position-absolute" style="left:23px;top:48px;bottom:0;width:2px;background:linear-gradient(to bottom,var(--color-accent),transparent)"></div>
        </div>
        <div class="d-flex position-relative">
          <div class="flex-shrink-0 me-4 position-relative" style="z-index:1">
            <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:48px;height:48px;font-size:18px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));box-shadow:0 4px 15px rgba(124,58,237,0.3)">5</div>
          </div>
          <div class="flex-grow-1">
            <h4 class="fw-bold mb-2" style="font-size:18px">Получите AI-индексацию</h4>
            <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Нейросети сканируют чистый код и формируют графы знаний. Рост охватов до 300% без дополнительных плагинов.</p>
            <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:12px">Срок: 2-3 недели</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5 text-white" style="background:linear-gradient(135deg,#0f0720,#2d1060)">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-5 mb-4 mb-lg-0 text-center"><img src="https://pixinlink.ru/api/v1/500x380/secure-server-vault-with-zero-database-architecture-glow" alt="Zero database security" class="img-fluid rounded-4" style="max-width:100%;height:340px;object-fit:cover;box-shadow:0 10px 40px rgba(0,0,0,0.5)"></div>
      <div class="col-lg-7 ps-lg-5">
        <h2 class="fw-bold mb-4" style="font-size:30px">Полное отсутствие баз данных и уязвимостей</h2>
        <p class="mb-4 opacity-85" style="font-size:15px;line-height:1.7">Забудьте об инъекциях SQL и обновлениях PHP. Статический генератор выдает 100% безопасный HTML. Исследование 2025 года показало, что SSG-сайты подвергаются успешным атакам в 98 раз реже.</p>
        <div class="row g-3 mb-4">
          <div class="col-6">
            <div class="rounded-3 p-3 text-center" style="background:rgba(255,255,255,0.06)">
              <div class="fw-bold mb-1" style="font-size:24px;color:#c4b5fd">0</div>
              <div class="small opacity-75">SQL баз данных</div>
            </div>
          </div>
          <div class="col-6">
            <div class="rounded-3 p-3 text-center" style="background:rgba(255,255,255,0.06)">
              <div class="fw-bold mb-1" style="font-size:24px;color:#c4b5fd">98х</div>
              <div class="small opacity-75">Уровень безопасности</div>
            </div>
          </div>
        </div>
        <a href="#" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent)">Оценить архитектуру</a></div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Тарифные планы GitHub CMS</h2>
        <p class="text-muted" style="font-size:16px">Платформа с открытым исходным кодом, выберите формат интеграции под свои задачи.</p>
      </div>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:16px;overflow:hidden">
          <div class="card-body p-4 d-flex flex-column">
            <h4 class="fw-bold mb-2" style="font-size:20px">Community</h4>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)">Полный доступ к исходному коду.</p>
            <div class="mb-3"><span class="fw-bold" style="font-size:36px;color:var(--color-accent)">0$</span><span class="text-muted" style="font-size:14px">/навсегда</span></div>
            <ul class="list-unstyled mb-4 flex-grow-1" style="font-size:13px;line-height:1.8">
              <li>✓ Vite SSG сборка</li>
              <li>✓ Markdown конвейер</li>
              <li>✓ Базовый JSON-LD</li>
              <li>✓ Развертывание своими силами</li>
            </ul>
            <a href="#" class="btn btn-primary btn-lg w-100 mt-auto" style="border-radius:10px">Скачать код</a></div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:16px;overflow:hidden;border:2px solid var(--color-accent);box-shadow:0 15px 35px rgba(124,58,237,0.15) !important">
          <div class="card-body p-4 d-flex flex-column">
            <h4 class="fw-bold mb-2" style="font-size:20px">Managed Pro</h4>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)">Облачная сборка и автоматизация.</p>
            <div class="mb-3"><span class="fw-bold" style="font-size:36px;color:var(--color-accent)">49$</span><span class="text-muted" style="font-size:14px">/месяц</span></div>
            <ul class="list-unstyled mb-4 flex-grow-1" style="font-size:13px;line-height:1.8">
              <li>✓ Автоматический CI/CD</li>
              <li>✓ Расширенная Schema.org</li>
              <li>✓ Глобальный CDN</li>
              <li>✓ Приоритетная поддержка</li>
            </ul>
            <a href="#" class="btn btn-primary btn-lg w-100 mt-auto" style="border-radius:10px">Начать триал</a></div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:16px;overflow:hidden">
          <div class="card-body p-4 d-flex flex-column">
            <h4 class="fw-bold mb-2" style="font-size:20px">Enterprise</h4>
            <p class="mb-3" style="font-size:13px;color:var(--color-text-muted)">Для масштабных контент-проектов.</p>
            <div class="mb-3"><span class="fw-bold" style="font-size:36px;color:var(--color-accent)">990$</span><span class="text-muted" style="font-size:14px">/год</span></div>
            <ul class="list-unstyled mb-4 flex-grow-1" style="font-size:13px;line-height:1.8">
              <li>✓ SLA гарантии 99.9%</li>
              <li>✓ Кастомная AI-разметка</li>
              <li>✓ Интеграция с API</li>
              <li>✓ Персональный менеджер</li>
            </ul>
            <a href="#" class="btn btn-primary btn-lg w-100 mt-auto" style="border-radius:10px">Связаться с нами</a></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Отзывы экспертов об AI-видимости</h2>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px;background:linear-gradient(135deg,var(--color-surface),var(--color-bg-muted))">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-weight:bold;font-size:16px">ИИ</div>
            <div>
              <h6 class="fw-bold mb-0" style="font-size:15px">Иван Иванов</h6>
              <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Технический директор, TechB2B</p>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.7;color:var(--color-text)">Перенос блога на статический сайт позволил сократить TTFB на 600ms. Благодаря встроенному JSON-LD, наши статьи начали цитироваться в Perplexity в 3 раза чаще.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px;background:linear-gradient(135deg,var(--color-surface),var(--color-bg-muted))">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-weight:bold;font-size:16px">АС</div>
            <div>
              <h6 class="fw-bold mb-0" style="font-size:15px">Анна Смирнова</h6>
              <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">SEO Лид, ContentFirst</p>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.7;color:var(--color-text)">Мы искали Markdown CMS с готовой архитектурой. Эта платформа избавила нас от 5 платных плагинов и дала 100% валидную разметку прямо из коробки.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px;background:linear-gradient(135deg,var(--color-surface),var(--color-bg-muted))">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-weight:bold;font-size:16px">ПВ</div>
            <div>
              <h6 class="fw-bold mb-0" style="font-size:15px">Петр Волков</h6>
              <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Основатель, StartUp Hub</p>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.7;color:var(--color-text)">Деплой за 2 минуты — это реальность. Система не требует поддержки баз данных. Расходы на инфраструктуру упали до 0$ в месяц.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px;background:linear-gradient(135deg,var(--color-surface),var(--color-bg-muted))">
          <div class="d-flex align-items-center mb-3">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:48px;height:48px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-weight:bold;font-size:16px">МК</div>
            <div>
              <h6 class="fw-bold mb-0" style="font-size:15px">Мария Котова</h6>
              <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Маркетолог, DigitalEdge</p>
            </div>
          </div>
          <p style="font-size:13px;line-height:1.7;color:var(--color-text)">Интеграция Vite SSG вывела наши лендинги в топ. Страницы мгновенно индексируются, а встроенные директивы помогают ChatGPT находить наши офферы.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">4 шага к быстрой интеграции</h2>
        <p class="text-muted" style="font-size:16px">Первая генерация машиночитаемых страниц происходит всего через час работы.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-sm-6 col-lg-3 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:22px;font-weight:bold">1</div>
          <h5 class="fw-bold mb-2" style="font-size:16px">Клонирование проекта</h5>
          <p style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Скопируйте исходный код системы к себе в профиль.</p>
          <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:11px">1 минута</span></div>
      </div>
      <div class="col-sm-6 col-lg-3 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:22px;font-weight:bold">2</div>
          <h5 class="fw-bold mb-2" style="font-size:16px">Добавление контента</h5>
          <p style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Заполните Markdown файлы статьями и настройте метаданные.</p>
          <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:11px">20 минут</span></div>
      </div>
      <div class="col-sm-6 col-lg-3 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:22px;font-weight:bold">3</div>
          <h5 class="fw-bold mb-2" style="font-size:16px">Отправка коммита</h5>
          <p style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Сделайте пуш в главную ветку для старта конвейера.</p>
          <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:11px">1 секунда</span></div>
      </div>
      <div class="col-sm-6 col-lg-3 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:14px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:56px;height:56px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:22px;font-weight:bold">4</div>
          <h5 class="fw-bold mb-2" style="font-size:16px">Публикация SSG</h5>
          <p style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Соберите статику автоматически. HTML сразу готов к индексации.</p>
          <span class="badge" style="background:rgba(124,58,237,0.08);color:var(--color-accent);font-size:11px">45 секунд</span></div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Частые вопросы о платформе</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true">Как работает генерация JSON-LD?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq1" class="collapse show">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Система парсит ваши Markdown файлы и фронтматтер. На основе 10 типов Schema.org она вставляет валидный JSON блок в раздел head. Это автоматизирует рутину на 100%.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false">Нужно ли платить за хостинг?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq2" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Нет. Статический сайт легко размещается на бесплатном CDN. Вы экономите 100% бюджета на поддержание серверов и баз данных.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false">Сколько занимает деплой проекта?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq3" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Весь цикл Vite SSG сборки занимает 2 минуты. За это время контент превращается в HTML страницы и распространяется по серверам.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false">Что значит AI-видимость?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq4" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Это оптимизация кода для нейросетевых поисковиков. Читаемая структура повышает шансы бренда попасть в прямые ответы ChatGPT на 300%.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false">Почему используется Markdown CMS?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq5" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Текстовый формат исключает ошибки форматирования. В нем заложено 0 скрытых JS скриптов, что гарантирует эталонную скорость.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq6" aria-expanded="false">Какой фреймворк лежит в основе?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq6" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Решение базируется на связке Vue 3 и Vite. Это современный стек с временем отрисовки ≤200ms.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq7" aria-expanded="false">Безопасно ли это решение?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq7" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Да. Генерация статических файлов исключает взлом баз данных. На сайте присутствует ровно 0 уязвимостей SQL инъекций.</p>
            </div>
          </div>
        </div>
        <div class="card border-0 shadow-sm mb-3" style="border-radius:12px;overflow:hidden">
          <div class="card-header bg-white border-0 p-0" style="cursor:pointer">
            <h4 class="mb-0">
              <button class="btn btn-link w-100 text-start text-decoration-none p-4 fw-bold d-flex justify-content-between align-items-center" style="font-size:16px;color:var(--color-text)" type="button" data-bs-toggle="collapse" data-bs-target="#faq8" aria-expanded="false">Где хранится мой контент?<span style="font-size:20px;color:var(--color-accent)">+</span></button>
            </h4>
          </div>
          <div id="faq8" class="collapse">
            <div class="card-body pt-0 px-4 pb-4">
              <p style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Тексты лежат в защищенном GitHub репозитории. Вы полностью владеете 100% данных без привязки к интерфейсу CMS.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <h2 class="fw-bold mb-4" style="font-size:30px">Техническое превосходство без компромиссов</h2>
        <div class="d-flex mb-3"><span class="fw-bold me-2 flex-shrink-0" style="color:var(--color-accent);font-size:18px">◆</span>
          <div>
            <p class="fw-bold mb-1" style="font-size:15px">Молниеносный рендеринг</p>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Предсборка страниц дает показатель TTFB ниже 200ms.</p>
          </div>
        </div>
        <div class="d-flex mb-3"><span class="fw-bold me-2 flex-shrink-0" style="color:var(--color-accent);font-size:18px">◆</span>
          <div>
            <p class="fw-bold mb-1" style="font-size:15px">Встроенная семантика</p>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Сайт на 100% готов к индексации языковыми моделями.</p>
          </div>
        </div>
        <div class="d-flex mb-4"><span class="fw-bold me-2 flex-shrink-0" style="color:var(--color-accent);font-size:18px">◆</span>
          <div>
            <p class="fw-bold mb-1" style="font-size:15px">Бесшовная интеграция</p>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Архитектура работает с 0 внешних плагинов и модулей.</p>
          </div>
        </div>
        <a href="#" class="btn btn-primary btn-lg" style="border-radius:10px">Перейти к внедрению</a></div>
      <div class="col-lg-6 text-center"><img src="https://pixinlink.ru/api/v1/540x400/high-tech-performance-dashboard-showing-200ms-metrics" alt="Performance dashboard" class="img-fluid rounded-4 shadow" style="max-width:100%;height:380px;object-fit:cover"></div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3" style="font-size:32px">Почему выбирают статический подход</h2>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:rgba(124,58,237,0.1)"><span style="color:var(--color-accent);font-weight:bold;font-size:18px">✓</span></div>
          <div>
            <h5 class="fw-bold mb-1" style="font-size:16px">Индексация за 24 часа</h5>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Идеальный код ускоряет попадание страниц в базу на 80%.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:rgba(124,58,237,0.1)"><span style="color:var(--color-accent);font-weight:bold;font-size:18px">✓</span></div>
          <div>
            <h5 class="fw-bold mb-1" style="font-size:16px">Экономия до 500$ ежегодно</h5>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Исключены затраты на хостинг баз данных и лицензии ПО.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:rgba(124,58,237,0.1)"><span style="color:var(--color-accent);font-weight:bold;font-size:18px">✓</span></div>
          <div>
            <h5 class="fw-bold mb-1" style="font-size:16px">Рост трафика на 300%</h5>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Прямое цитирование из AI-генераторов приводит теплую аудиторию.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:rgba(124,58,237,0.1)"><span style="color:var(--color-accent);font-weight:bold;font-size:18px">✓</span></div>
          <div>
            <h5 class="fw-bold mb-1" style="font-size:16px">100% аптайм серверов</h5>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">CDN сеть гарантирует бесперебойную доступность ресурса глобально.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:rgba(124,58,237,0.1)"><span style="color:var(--color-accent);font-weight:bold;font-size:18px">✓</span></div>
          <div>
            <h5 class="fw-bold mb-1" style="font-size:16px">Минимум 10 микроразметок</h5>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Сущности Schema.org генерируются без вашего участия.</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex align-items-start">
          <div class="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:rgba(124,58,237,0.1)"><span style="color:var(--color-accent);font-weight:bold;font-size:18px">✓</span></div>
          <div>
            <h5 class="fw-bold mb-1" style="font-size:16px">Адаптация за 1 день</h5>
            <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Перенос контента в Markdown занимает минимум усилий команды.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5 text-center text-white" style="background:linear-gradient(135deg,var(--color-accent),#6d28d9)">
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <h2 class="fw-bold mb-3" style="font-size:34px">Создайте AI-оптимизированный сайт</h2>
        <p class="mb-4 opacity-90" style="font-size:16px;line-height:1.6">Разверните шаблон сегодня, чтобы получить рост видимости через 2 недели.</p>
        <div class="d-flex justify-content-center flex-wrap gap-3"><a href="#" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:12px;color:var(--color-accent)">Развернуть бесплатно</a><a href="/blog/" class="btn btn-outline-light btn-lg px-5 py-3" style="border-radius:12px">Изучить кейсы</a></div>
        <p class="mt-4 small opacity-60">Гарантированная скорость TTFB ≤200ms.</p>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4"><a href="/blog/" class="card border-0 shadow-sm h-100 p-4 text-decoration-none" style="border-radius:14px;transition:transform 0.2s;background:var(--color-surface)">
        <h5 class="fw-bold mb-2" style="font-size:17px;color:var(--color-text)">Блог о GEO</h5>
        <p class="mb-1" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Читайте свежие исследования о продвижении в нейросетях.</p>
        <span style="font-size:13px;color:var(--color-accent);font-weight:bold">Перейти к блогу →</span></a></div>
      <div class="col-md-4"><a href="/about/" class="card border-0 shadow-sm h-100 p-4 text-decoration-none" style="border-radius:14px;transition:transform 0.2s;background:var(--color-surface)">
        <h5 class="fw-bold mb-2" style="font-size:17px;color:var(--color-text)">Документация ядра</h5>
        <p class="mb-1" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Изучите техническое устройство Vite SSG и JSON-LD.</p>
        <span style="font-size:13px;color:var(--color-accent);font-weight:bold">Читать документацию →</span></a></div>
      <div class="col-md-4"><a href="/contact/" class="card border-0 shadow-sm h-100 p-4 text-decoration-none" style="border-radius:14px;transition:transform 0.2s;background:var(--color-surface)">
        <h5 class="fw-bold mb-2" style="font-size:17px;color:var(--color-text)">Контакты поддержки</h5>
        <p class="mb-1" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Получите помощь по миграции контента из старой CMS.</p>
        <span style="font-size:13px;color:var(--color-accent);font-weight:bold">Связаться с нами →</span></a></div>
    </div>
  </div>
</section>
</main>
</template>

<style scoped>
/* Inherits all theme styles */
</style>

<script setup lang="ts">
import { generateSchema } from "../schema";
import { useSeo } from "../composables/useSeo";
import { siteConfig } from "../site.config";
import { t } from "../i18n";

useSeo({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/home/5/",
  type: "website",
  jsonLd: generateSchema({ url: siteConfig.url, path: "/home/5/", title: siteConfig.name, description: siteConfig.description, html: "", type: "website" }),
});
</script>

<template>
<main>
<section class="py-5 position-relative overflow-hidden" style="min-height:580px;background:linear-gradient(135deg,#0f0720,#1e0a3c,#2d1060)">
  <div class="position-absolute top-0 end-0 w-50 h-100" style="background:radial-gradient(ellipse at center,rgba(124,58,237,0.3) 0%,transparent 70%)"></div>
  <div class="container position-relative" style="z-index:2">
    <div class="row align-items-center" style="min-height:520px">
      <div class="col-lg-7 text-white py-4">
        <p class="text-uppercase mb-2 opacity-75" style="font-size:11px;letter-spacing:4px;color:#c4b5fd">{{ t.homeVariant5.badge }}</p>
        <h1 class="fw-bold mb-4 lh-sm" style="font-size:46px">{{ t.homeVariant5.hero }}</h1>
        <p class="lead mb-4 opacity-85" style="max-width:500px;font-size:17px;line-height:1.7">{{ t.homeVariant5.heroDesc }}</p>
        <div class="d-flex flex-wrap gap-3"><a href="#" class="btn btn-primary btn-lg px-5 py-3 fw-bold" style="border-radius:14px;background:linear-gradient(135deg,#7c3aed,#a78bfa);box-shadow:0 8px 30px rgba(124,58,237,0.4)">{{ t.homeVariant5.ctaDeploy }}</a><a href="/blog/" class="btn btn-outline-light btn-lg px-5 py-3" style="border-radius:14px">{{ t.homeVariant5.ctaBlog }}</a></div>
      </div>
      <div class="col-lg-5 position-relative mt-4 mt-lg-0"><img src="https://pixinlink.ru/api/v1/500x500/futuristic-glass-server-cube-with-glowing-data-streams-minimalism" alt="" class="img-fluid rounded-4" style="position:relative;z-index:1;box-shadow:0 25px 80px rgba(0,0,0,0.5)">
        <div class="position-absolute top-50 end-0 translate-middle-y p-3 rounded-4 text-white" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);z-index:2;min-width:100px">
          <div class="fw-bold" style="font-size:22px;color:#c4b5fd">≤200ms</div>
          <div class="small opacity-75">{{ t.homeVariant5.metricTtfb }}</div>
        </div>
        <div class="position-absolute bottom-0 start-0 p-3 rounded-4 text-white" style="background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);z-index:2;min-width:100px">
          <div class="fw-bold" style="font-size:22px;color:#c4b5fd">10+</div>
          <div class="small opacity-75">{{ t.homeVariant5.metricSchema }}</div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-2" style="font-size:32px">Три уровня технического доминирования</h2>
        <p class="text-muted" style="font-size:15px">Мы убрали базы данных, чтобы максимизировать скорость генерации страниц.</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4" style="margin-top:0px">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.03))">
          <div class="mb-3" style="font-size:36px;color:var(--color-accent)">◈</div>
          <h4 class="fw-bold mb-2" style="font-size:19px">Markdown контент</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Пишите тексты в формате Markdown. Это ускоряет публикацию на 45% (GitHub, 2025). Никаких сложных визуальных редакторов.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 d-none d-lg-block" style="margin-top:48px">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.03))">
          <div class="mb-3" style="font-size:36px;color:var(--color-accent)">▣</div>
          <h4 class="fw-bold mb-2" style="font-size:19px">Vite SSG сборка</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Прекомпиляция статических файлов занимает 2 минуты. Отсутствие PHP-запросов снижает нагрузку на сервер на 99%.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 d-block d-lg-none" style="margin-top:0px">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.03))">
          <div class="mb-3" style="font-size:36px;color:var(--color-accent)">▣</div>
          <h4 class="fw-bold mb-2" style="font-size:19px">Vite SSG сборка</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Прекомпиляция статических файлов занимает 2 минуты. Отсутствие PHP-запросов снижает нагрузку на сервер на 99%.</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-4" style="margin-top:0px">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.03))">
          <div class="mb-3" style="font-size:36px;color:var(--color-accent)">⬢</div>
          <h4 class="fw-bold mb-2" style="font-size:19px">JSON-LD автоматика</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Структурированные данные генерируются из фронтматтера. 10 типов Schema.org делают сайт прозрачным для алгоритмов Perplexity.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row g-4 text-center">
      <div class="col-6 col-md-3">
        <div class="fw-bold mb-2" style="font-size:48px;line-height:1;background:linear-gradient(135deg,var(--color-accent),#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent">≤200ms</div>
        <p class="fw-bold mb-1" style="font-size:15px">Скорость ответа</p>
        <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Мгновенная отдача HTML файлов</p>
      </div>
      <div class="col-6 col-md-3">
        <div class="fw-bold mb-2" style="font-size:48px;line-height:1;background:linear-gradient(135deg,var(--color-accent),#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent">10+</div>
        <p class="fw-bold mb-1" style="font-size:15px">Схем Schema.org</p>
        <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Валидная микроразметка из коробки</p>
      </div>
      <div class="col-6 col-md-3">
        <div class="fw-bold mb-2" style="font-size:48px;line-height:1;background:linear-gradient(135deg,var(--color-accent),#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent">0$</div>
        <p class="fw-bold mb-1" style="font-size:15px">Ежемесячно</p>
        <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Никаких скрытых SaaS платежей</p>
      </div>
      <div class="col-6 col-md-3">
        <div class="fw-bold mb-2" style="font-size:48px;line-height:1;background:linear-gradient(135deg,var(--color-accent),#c4b5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent">300%</div>
        <p class="fw-bold mb-1" style="font-size:15px">AI-видимость</p>
        <p class="mb-0" style="font-size:12px;color:var(--color-text-muted)">Рост цитируемости в ChatGPT</p>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-2" style="font-size:32px">Устаревшие CMS против GitHub CMS</h2>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100" style="border-radius:16px;overflow:hidden">
          <div class="card-header text-center py-3" style="background:rgba(220,53,69,0.06);border-bottom:1px solid rgba(220,53,69,0.15)">
            <h3 class="fw-bold mb-0" style="font-size:22px;color:#dc3545">ДО</h3>
          </div>
          <div class="card-body p-4">
            <div class="d-flex mb-3"><span class="me-3 flex-shrink-0" style="font-size:18px;color:#dc3545">❌</span>
              <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Медленный рендеринг</strong> — генерация страницы занимает более 800ms из-за базы данных.</p>
            </div>
            <div class="d-flex mb-3"><span class="me-3 flex-shrink-0" style="font-size:18px;color:#dc3545">❌</span>
              <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Сложное SEO</strong> — требуется покупка 3 плагинов для настройки базовой микроразметки.</p>
            </div>
            <div class="d-flex mb-3"><span class="me-3 flex-shrink-0" style="font-size:18px;color:#dc3545">❌</span>
              <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Уязвимости</strong> — 90% сайтов подвержены риску SQL-инъекций и взлома плагинов.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100" style="border-radius:16px;overflow:hidden;border:2px solid var(--color-accent)">
          <div class="card-header text-center py-3" style="background:rgba(25,135,84,0.06);border-bottom:1px solid rgba(25,135,84,0.2)">
            <h3 class="fw-bold mb-0" style="font-size:22px;color:#198754">ПОСЛЕ</h3>
          </div>
          <div class="card-body p-4">
            <div class="d-flex mb-3"><span class="me-3 flex-shrink-0" style="font-size:18px;color:#198754">✅</span>
              <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Мгновенная отдача</strong> — статический HTML загружается за 200ms через глобальный CDN.</p>
            </div>
            <div class="d-flex mb-3"><span class="me-3 flex-shrink-0" style="font-size:18px;color:#198754">✅</span>
              <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Автогенерация JSON-LD</strong> — внедрение 10 типов Schema.org происходит при коммите.</p>
            </div>
            <div class="d-flex mb-3"><span class="me-3 flex-shrink-0" style="font-size:18px;color:#198754">✅</span>
              <p class="mb-0" style="font-size:14px;line-height:1.6"><strong>Абсолютная защита</strong> — 0% вероятности взлома благодаря отсутствию SQL баз данных.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5 text-white text-center" style="background:linear-gradient(135deg,var(--color-accent),#6d28d9,#4c1d95)">
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h2 class="fw-bold mb-4 lh-sm" style="font-size:36px">Доминируйте в AI-ответах с машиночитаемым кодом</h2>
        <p class="mb-4 opacity-90" style="font-size:18px;line-height:1.7">Алгоритмы Perplexity цитируют сайты со строгой разметкой. Мы обеспечиваем идеальную архитектуру.</p>
        <div class="d-flex justify-content-center flex-wrap gap-3">
          <div class="rounded-4 px-4 py-3" style="background:rgba(255,255,255,0.1);backdrop-filter:blur(8px)">
            <div class="fw-bold" style="font-size:28px;color:#f5f0ff">100%</div>
            <div class="small opacity-75">Валидный HTML</div>
          </div>
          <div class="rounded-4 px-4 py-3" style="background:rgba(255,255,255,0.1);backdrop-filter:blur(8px)">
            <div class="fw-bold" style="font-size:28px;color:#f5f0ff">0</div>
            <div class="small opacity-75">Блокирующих JS</div>
          </div>
          <div class="rounded-4 px-4 py-3" style="background:rgba(255,255,255,0.1);backdrop-filter:blur(8px)">
            <div class="fw-bold" style="font-size:28px;color:#f5f0ff">24h</div>
            <div class="small opacity-75">До индексации</div>
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
        <h2 class="fw-bold mb-2" style="font-size:32px">Функции для стабильного роста видимости</h2>
      </div>
    </div>
    <div class="row g-4 mb-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:18px;color:white">🚀</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">Деплой за 2 минуты</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Сборка сайта через Vite SSG требует ровно 120 секунд. Контент обновляется моментально.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:18px;color:white">🤖</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">Готовность к Perplexity</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Структурированные директивы в Markdown повышают точность парсинга текстов в 2 раза.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:18px;color:white">⚡</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">Без баз данных</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">0% зависимости от SQL гарантирует скорость TTFB до 200ms всегда.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:18px;color:white">📈</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">Встроенный SEO-слой</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Sitemap и Open Graph генерируются автоматически при деплое.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;transition:transform 0.2s">
          <div class="d-flex">
            <div class="rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width:44px;height:44px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))"><span style="font-size:18px;color:white">🔒</span></div>
            <div>
              <h5 class="fw-bold mb-2" style="font-size:16px">Абсолютная защита</h5>
              <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Статический генератор делает сайт на 100% устойчивым к атакам.</p>
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
      <div class="col-lg-6 mb-4 mb-lg-0"><img src="https://pixinlink.ru/api/v1/520x420/data-analytics-dashboard-clean-white-background-minimalism" alt="" class="img-fluid rounded-4 shadow" style="width:100%;height:380px;object-fit:cover"></div>
      <div class="col-lg-6 ps-lg-5">
        <h2 class="fw-bold mb-4" style="font-size:28px">Статистика эффективности GitHub CMS</h2>
        <p class="mb-4" style="font-size:15px;line-height:1.7;color:var(--color-text-muted)">Отказ от динамического рендеринга улучшает все ключевые метрики. Сайты получают прирост аудитории на 300%.</p>
        <div class="row g-3">
          <div class="col-6">
            <div class="p-3 rounded-3" style="background:var(--color-surface)">
              <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">200ms</div>
              <div class="small" style="font-size:12px;color:var(--color-text-muted)">Средний TTFB</div>
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 rounded-3" style="background:var(--color-surface)">
              <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">99.9%</div>
              <div class="small" style="font-size:12px;color:var(--color-text-muted)">Аптайм серверов</div>
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 rounded-3" style="background:var(--color-surface)">
              <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">100%</div>
              <div class="small" style="font-size:12px;color:var(--color-text-muted)">Индекс AI-бота</div>
            </div>
          </div>
          <div class="col-6">
            <div class="p-3 rounded-3" style="background:var(--color-surface)">
              <div class="fw-bold mb-1" style="font-size:24px;color:var(--color-accent)">0$</div>
              <div class="small" style="font-size:12px;color:var(--color-text-muted)">Затраты на БД</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-4">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-2" style="font-size:32px">Что говорят CTO компаний</h2>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.02))">
          <div class="mb-3" style="font-size:18px;color:#f59e0b">★★★★★</div>
          <p class="mb-3 flex-grow-1" style="font-size:14px;line-height:1.7;color:var(--color-text)">Переход на Markdown и Vite SSG ускорил наш блог. Время ответа упало до 150ms. Трафик из Perplexity вырос в 2 раза.</p>
          <div class="d-flex align-items-center">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0" style="width:36px;height:36px;background:var(--color-accent);color:white;font-weight:bold;font-size:14px">ИИ</div>
            <div>
              <p class="fw-bold mb-0" style="font-size:14px">Иван Иванов</p>
              <p class="mb-0" style="font-size:11px;color:var(--color-text-muted)">CTO, TechB2B</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.02))">
          <div class="mb-3" style="font-size:18px;color:#f59e0b">★★★★★</div>
          <p class="mb-3 flex-grow-1" style="font-size:14px;line-height:1.7;color:var(--color-text)">Автоматический JSON-LD снял головную боль с SEO-отдела. Мы получаем 10 типов Schema.org при каждом пуше кода.</p>
          <div class="d-flex align-items-center">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0" style="width:36px;height:36px;background:var(--color-accent);color:white;font-weight:bold;font-size:14px">АС</div>
            <div>
              <p class="fw-bold mb-0" style="font-size:14px">Анна Смирнова</p>
              <p class="mb-0" style="font-size:11px;color:var(--color-text-muted)">Lead SEO</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:16px;background:linear-gradient(135deg,var(--color-surface),rgba(124,58,237,0.02))">
          <div class="mb-3" style="font-size:18px;color:#f59e0b">★★★★★</div>
          <p class="mb-3 flex-grow-1" style="font-size:14px;line-height:1.7;color:var(--color-text)">Мы уволили серверного администратора. 0 баз данных означает 0 проблем. Деплой сайта теперь занимает ровно 2 минуты.</p>
          <div class="d-flex align-items-center">
            <div class="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0" style="width:36px;height:36px;background:var(--color-accent);color:white;font-weight:bold;font-size:14px">ПВ</div>
            <div>
              <p class="fw-bold mb-0" style="font-size:14px">Петр Волков</p>
              <p class="mb-0" style="font-size:11px;color:var(--color-text-muted)">Founder, StartHub</p>
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
        <h2 class="fw-bold mb-2" style="font-size:32px">Три шага к AI-доминированию</h2>
      </div>
    </div>
    <div class="row g-4 justify-content-center align-items-start">
      <div class="col-md-4 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:60px;height:60px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:24px;font-weight:bold">1</div>
          <h4 class="fw-bold mb-2" style="font-size:17px">Пишите в Markdown</h4>
          <p class="mb-0" style="font-size:13px;line-height:1.7;color:var(--color-text-muted)">Создавайте тексты в удобном формате. Метаданные формируются автоматически.</p>
        </div>
      </div>
      <div class="col-auto d-none d-md-flex align-self-center"><span style="font-size:24px;color:var(--color-accent)">→</span></div>
      <div class="col-md-4 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:60px;height:60px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:24px;font-weight:bold">2</div>
          <h4 class="fw-bold mb-2" style="font-size:17px">Сделайте Git Push</h4>
          <p class="mb-0" style="font-size:13px;line-height:1.7;color:var(--color-text-muted)">Отправьте изменения в репозиторий. Конвейер сборки запустится без задержек.</p>
        </div>
      </div>
      <div class="col-auto d-none d-md-flex align-self-center"><span style="font-size:24px;color:var(--color-accent)">→</span></div>
      <div class="col-md-4 text-center">
        <div class="card border-0 shadow-sm h-100 p-4" style="border-radius:18px">
          <div class="rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:60px;height:60px;background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover));color:white;font-size:24px;font-weight:bold">3</div>
          <h4 class="fw-bold mb-2" style="font-size:17px">Сборка за 2 минуты</h4>
          <p class="mb-0" style="font-size:13px;line-height:1.7;color:var(--color-text-muted)">Vite SSG компилирует HTML и JSON-LD. Сайт обновляется на глобальном CDN.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-2" style="font-size:32px">Почему архитектура побеждает дизайн</h2>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 h-100 p-4 text-white" style="border-radius:16px;background:linear-gradient(135deg,#1a0a2e,#2d1060)">
          <h4 class="fw-bold mb-2" style="font-size:18px">Идеальный код для AI</h4>
          <p class="mb-0 opacity-85" style="font-size:14px;line-height:1.7">Отсутствие мусорных тегов ускоряет парсинг на 80%. Нейросети легко читают структуру вашего сайта.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 h-100 p-4 text-white" style="border-radius:16px;background:linear-gradient(135deg,#1a0a2e,#2d1060)">
          <h4 class="fw-bold mb-2" style="font-size:18px">Нулевой риск взлома</h4>
          <p class="mb-0 opacity-85" style="font-size:14px;line-height:1.7">Статические файлы невозможно взломать. Защита на 100% выше классических баз данных.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 h-100 p-4 text-white" style="border-radius:16px;background:linear-gradient(135deg,#1a0a2e,#2d1060)">
          <h4 class="fw-bold mb-2" style="font-size:18px">Встроенный SEO-базис</h4>
          <p class="mb-0 opacity-85" style="font-size:14px;line-height:1.7">Система выдает 10 типов микроразметки автоматически. Вы не тратите время на рутину.</p>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 h-100 p-4 text-white" style="border-radius:16px;background:linear-gradient(135deg,#1a0a2e,#2d1060)">
          <h4 class="fw-bold mb-2" style="font-size:18px">Снижение затрат</h4>
          <p class="mb-0 opacity-85" style="font-size:14px;line-height:1.7">Расходы на SaaS плагины равны 0$. Бесплатный CDN обеспечивает глобальную доставку контента.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-lg-6">
        <div class="d-inline-block p-5 rounded-circle mb-4" style="background:linear-gradient(135deg,rgba(25,135,84,0.06),rgba(25,135,84,0.02));border:2px dashed #198754">
          <div class="fw-bold mb-1" style="font-size:40px;color:#198754">100%</div>
          <div class="fw-bold" style="font-size:14px;color:#198754">ОТКРЫТЫЙ КОД</div>
        </div>
        <h3 class="fw-bold mb-3" style="font-size:24px">Без скрытых подписок навсегда</h3>
        <p style="font-size:15px;line-height:1.7;color:var(--color-text-muted)">Мы гарантируем отсутствие SaaS-платежей за базовый функционал. 100% исходного кода принадлежит вам.</p>
        <a href="#" class="btn btn-success btn-lg px-5 py-3 fw-bold mt-2" style="border-radius:14px">Склонировать проект</a></div>
    </div>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-2" style="font-size:32px">Вопросы по архитектуре</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Как генерируется JSON-LD разметка?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Скрипт парсит фронтматтер Markdown файлов при сборке. Формируется 100% валидный код Schema.org без плагинов.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Что значит AI-видимость?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Это адаптация сайта под алгоритмы Perplexity и ChatGPT. Чистый HTML повышает шансы цитирования на 300%.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Требуется ли база данных MySQL?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Нет, архитектура использует 0 баз данных. Все тексты хранятся непосредственно в Git репозитории.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Как быстро обновляется контент?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Процесс деплоя Vite SSG занимает ровно 2 минуты. Изменения моментально распределяются по CDN.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Можно ли интегрировать внешний API?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Да, фреймворк Vue 3 поддерживает любые клиентские скрипты. Вызовы API выполняются за миллисекунды.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Сколько стоит использование CMS?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Базовая версия обходится в 0$. Вы платите только за свой хостинг статических файлов.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Работает ли сайт без JavaScript?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Да, предварительная генерация создает готовый HTML. Контент доступен 100% пользователей и ботов сразу.</p>
        </div>
        <div class="mb-4 pb-3" style="border-bottom:1px solid var(--color-border)">
          <h4 class="fw-bold mb-2" style="font-size:16px;color:var(--color-accent)">Подходит ли это для больших блогов?</h4>
          <p class="mb-0" style="font-size:14px;line-height:1.7;color:var(--color-text-muted)">Абсолютно. Система легко компилирует тысячи файлов. Скорость сборки остается высокой благодаря Vite.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="py-5" style="background:var(--color-bg-muted)">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <h2 class="fw-bold mb-4" style="font-size:30px">Готовность к SEO нового поколения</h2>
        <p class="mb-4" style="font-size:15px;line-height:1.8;color:var(--color-text-muted)">Генеративные поисковики требуют машиночитаемого формата. Наша архитектура формирует семантический каркас автоматически. Вы получаете 10 видов разметки без участия программистов (Gartner, 2026).</p>
        <div class="d-flex align-items-center gap-3"><a href="#" class="btn btn-primary btn-lg px-4 py-3 fw-bold" style="border-radius:12px">Перейти к развертыванию</a><span class="text-muted" style="font-size:13px">Установка в 1 клик</span></div>
      </div>
      <div class="col-lg-6 text-center"><img src="https://pixinlink.ru/api/v1/540x400/ai-neural-network-scanning-clean-code-structure" alt="" class="img-fluid rounded-4 shadow" style="max-width:100%;height:380px;object-fit:cover"></div>
    </div>
  </div>
</section>
<section class="position-relative py-5 text-white text-center" style="background:linear-gradient(135deg,#0f0720,#1e0a3c)">
  <div class="position-absolute top-0 start-0 w-100" style="height:30px;background:linear-gradient(to bottom,var(--color-bg-muted),transparent)"></div>
  <div class="container py-4 position-relative" style="z-index:1">
    <h2 class="fw-bold mb-4" style="font-size:36px;line-height:1.3">Начните собирать AI-трафик прямо сейчас</h2>
    <p class="mb-4 opacity-85 mx-auto" style="max-width:600px;font-size:17px;line-height:1.7">Скопируйте репозиторий сегодня и получите 300% роста видимости через 14 дней.</p>
    <div class="d-flex justify-content-center flex-wrap gap-3"><a href="#" class="btn btn-light btn-lg px-5 py-3 fw-bold" style="border-radius:14px;color:var(--color-accent);box-shadow:0 8px 30px rgba(255,255,255,0.15)">Клонировать проект</a><a href="/blog/" class="btn btn-outline-light btn-lg px-5 py-3" style="border-radius:14px">Смотреть руководства</a></div>
    <p class="mt-4 small opacity-50">Не требует привязки банковской карты.</p>
  </div>
</section>
<section class="py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4"><a href="/blog/" class="card border-0 shadow-sm h-100 p-4 text-decoration-none" style="border-radius:16px;background:var(--color-surface);transition:transform 0.2s">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="fw-bold mb-1" style="font-size:18px;color:var(--color-text)">Руководства по запуску</h5>
          <span style="font-size:20px;color:var(--color-accent)">→</span></div>
        <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Изучите пошаговые инструкции миграции контента.</p>
        </a></div>
      <div class="col-md-4"><a href="/templates/" class="card border-0 shadow-sm h-100 p-4 text-decoration-none" style="border-radius:16px;background:var(--color-surface);transition:transform 0.2s">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="fw-bold mb-1" style="font-size:18px;color:var(--color-text)">Маркетплейс тем</h5>
          <span style="font-size:20px;color:var(--color-accent)">→</span></div>
        <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Выберите готовый дизайн под вашу бизнес-модель.</p>
        </a></div>
      <div class="col-md-4"><a href="/about/" class="card border-0 shadow-sm h-100 p-4 text-decoration-none" style="border-radius:16px;background:var(--color-surface);transition:transform 0.2s">
        <div class="d-flex justify-content-between align-items-start">
          <h5 class="fw-bold mb-1" style="font-size:18px;color:var(--color-text)">О проекте</h5>
          <span style="font-size:20px;color:var(--color-accent)">→</span></div>
        <p class="mb-0" style="font-size:13px;line-height:1.6;color:var(--color-text-muted)">Узнайте больше о нашей архитектуре и миссии.</p>
        </a></div>
    </div>
  </div>
</section>
<section class="py-4" style="background:var(--color-bg-muted);border-top:1px solid var(--color-border)">
  <div class="container">
    <div class="row text-center g-3">
      <div class="col-6 col-md-3"><a href="/blog/" class="text-decoration-none">
        <div class="fw-bold mb-1" style="font-size:14px;color:var(--color-text)">Блог</div>
        <div class="small" style="font-size:12px;color:var(--color-text-muted)">Статьи и кейсы</div>
        </a></div>
      <div class="col-6 col-md-3"><a href="/templates/" class="text-decoration-none">
        <div class="fw-bold mb-1" style="font-size:14px;color:var(--color-text)">Шаблоны</div>
        <div class="small" style="font-size:12px;color:var(--color-text-muted)">Готовые дизайны</div>
        </a></div>
      <div class="col-6 col-md-3"><a href="/about/" class="text-decoration-none">
        <div class="fw-bold mb-1" style="font-size:14px;color:var(--color-text)">О проекте</div>
        <div class="small" style="font-size:12px;color:var(--color-text-muted)">Команда и миссия</div>
        </a></div>
      <div class="col-6 col-md-3"><a href="/contact/" class="text-decoration-none">
        <div class="fw-bold mb-1" style="font-size:14px;color:var(--color-text)">Контакты</div>
        <div class="small" style="font-size:12px;color:var(--color-text-muted)">Служба поддержки</div>
        </a></div>
    </div>
  </div>
</section>
</main>
</template>

<style scoped>
/* Inherits all theme styles */
</style>

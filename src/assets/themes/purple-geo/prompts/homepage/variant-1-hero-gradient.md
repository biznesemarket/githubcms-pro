# Homepage Variant 1: Gradient Hero + Icon Grid + Asymmetric Layout

## Design Concept

Первый экран: полноширинный hero с градиентным оверлеем на фоновом изображении. Слева — H1 + УТП + 2 CTA-кнопки. Справа — вертикальная карточка с 3 ключевыми метриками.

Ниже: 4 иконные карточки услуг (равная высота, иконки + заголовок + описание).

Далее: секция с изображением слева и текстом справа (50/50, одинаковая высота через flex).

Статистика: 4 числа в строку с разделителями.

Блог: 3 карточки с изображениями (равная высота через card h-100).

Финальный CTA на всю ширину.

## Required Variables

| Placeholder | Type | Example |
|---|---|---|
| `{hero_bg_image}` | PixInLink URL | `https://pixinlink.ru/api/v1/1440x800/abstract-technology-background |
| `{hero_h1}` | Text ≤70 chars | "GEO-оптимизация: превращаем AI-трафик в продажи" |
| `{hero_subtitle}` | Text 100-150 chars | "47% B2B-покупателей начинают поиск с AI. Мы делаем так, чтобы находили именно вас." |
| `{hero_cta_primary}` | Text | "Бесплатный аудит" |
| `{hero_cta_secondary}` | Text | "Смотреть кейсы" |
| `{hero_metric_1_value}` | Text | "400%" |
| `{hero_metric_1_label}` | Text | "Рост AI-трафика" |
| `{hero_metric_2_value}` | Text | "≤30 дней" |
| `{hero_metric_2_label}` | Text | "До первых результатов" |
| `{hero_metric_3_value}` | Text | "47%" |
| `{hero_metric_3_label}` | Text | "B2B-покупателей в AI" |
| `{service_1_icon}` | Bootstrap icon | `bi-graph-up-arrow` |
| `{service_1_title}` | Text ≤30 | "GEO-аудит" |
| `{service_1_desc}` | Text ≤120 | "Анализируем видимость в ChatGPT, Perplexity, Яндекс Нейро" |
| `{service_2_icon}` | Text | `bi-pencil-square` |
| `{service_2_title}` | Text | "Контент" |
| `{service_2_desc}` | Text | "Пишем статьи с E-E-A-T сигналами для AI-цитирования" |
| `{service_3_icon}` | Text | `bi-code-slash` |
| `{service_3_title}` | Text | "Техническое SEO" |
| `{service_3_desc}` | Text | "Schema.org разметка, sitemap, ускорение загрузки до ≤200ms" |
| `{service_4_icon}` | Text | `bi-bar-chart-fill` |
| `{service_4_title}` | Text | "Аналитика" |
| `{service_4_desc}` | Text | "Отслеживаем AI-трафик и конверсии, корректируем стратегию" |
| `{section_2_image}` | PixInLink URL | `https://pixinlink.ru/api/v1/600x450/data-dashboard |
| `{section_2_title}` | Text | "Почему AI-трафик конвертируется в 4-9 раз лучше" |
| `{section_2_text_1}` | Text | "Пользователи ChatGPT и Perplexity приходят с готовым запросом..." |
| `{section_2_text_2}` | Text | "Они уже на 70% приняли решение о покупке..." |
| `{section_2_text_3}` | Text | "Средний чек клиента из AI-канала на 40% выше..." |
| `{stat_1_value}` | Text | "400%" |
| `{stat_1_label}` | Text | "Рост цитируемости" |
| `{stat_2_value}` | Text | "≤200ms" |
| `{stat_2_label}` | Text | "Скорость загрузки" |
| `{stat_3_value}` | Text | "52" |
| `{stat_3_label}` | Text | "Страницы в sitemap" |
| `{stat_4_value}` | Text | "0" |
| `{stat_4_label}` | Text | "Уязвимостей" |
| `{blog_image_1}` | PixInLink URL | 800×450 |
| `{blog_image_2}` | PixInLink URL | 800×450 |
| `{blog_image_3}` | PixInLink URL | 800×450 |

## Master Prompt

Сгенерируй HTML-код для главной страницы сайта {company_name}. Используй ТОЛЬКО указанные ниже классы Bootstrap 5. Все изображения — PixInLink URL. Весь контент — осмысленный, с цифрами, без воды.

СТРУКТУРА:

---

### БЛОК 1: HERO (полноширинный, с фоновым изображением)

<div class="position-relative overflow-hidden" style="min-height:600px;background:linear-gradient(135deg,var(--color-text),#3b0764)">
  <img src="{hero_bg_image}" alt="" class="position-absolute top-0 start-0 w-100 h-100" style="object-fit:cover;opacity:0.15">
  <div class="container position-relative z-index-1">
    <div class="row align-items-center min-vh-75 py-5">
      <div class="col-lg-7 text-white py-5">
        <p class="text-uppercase small fw-bold mb-2 opacity-75" style="letter-spacing:2px">Generative Engine Optimization</p>
        <h1 class="display-4 fw-bold mb-3 lh-sm">{hero_h1}</h1>
        <p class="lead mb-4 opacity-90" style="max-width:540px">{hero_subtitle}</p>
        <div class="d-flex flex-wrap gap-3">
          <a href="#cta" class="btn btn-primary btn-lg px-4 py-3 fw-bold">{hero_cta_primary}</a>
          <a href="/blog/" class="btn btn-outline-light btn-lg px-4 py-3">{hero_cta_secondary}</a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="d-flex flex-column gap-3">
          <div class="d-flex gap-3">
            <div class="flex-fill bg-white bg-opacity-10 rounded-4 p-4 text-center text-white backdrop-blur">
              <div class="display-5 fw-bold text-warning mb-1">{hero_metric_1_value}</div>
              <div class="small opacity-75">{hero_metric_1_label}</div>
            </div>
            <div class="flex-fill bg-white bg-opacity-10 rounded-4 p-4 text-center text-white">
              <div class="display-5 fw-bold text-warning mb-1">{hero_metric_2_value}</div>
              <div class="small opacity-75">{hero_metric_2_label}</div>
            </div>
          </div>
          <div class="bg-white bg-opacity-10 rounded-4 p-4 text-center text-white">
            <div class="display-5 fw-bold text-warning mb-1">{hero_metric_3_value}</div>
            <div class="small opacity-75">{hero_metric_3_label}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

ТРЕБОВАНИЕ: Левая и правая колонки — ОДИНАКОВОЙ ВЫСОТЫ. Достигается через `align-items-center` на row и равные padding.

---

### БЛОК 2: 4 ИКОННЫЕ КАРТОЧКИ (равная высота)

<section class="py-5">
  <div class="container">
    <div class="row text-center mb-5">
      <div class="col-lg-8 mx-auto">
        <h2 class="fw-bold mb-3">Что мы делаем для вашей AI-видимости</h2>
        <p class="text-muted">Четыре направления GEO-оптимизации, которые превращают поисковые запросы в продажи</p>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center">
          <div class="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px">
            <i class="bi {service_1_icon} fs-2 text-primary"></i>
          </div>
          <h5 class="fw-bold mb-3">{service_1_title}</h5>
          <p class="text-muted small mb-0">{service_1_desc}</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center">
          <div class="rounded-circle bg-success bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px">
            <i class="bi {service_2_icon} fs-2 text-success"></i>
          </div>
          <h5 class="fw-bold mb-3">{service_2_title}</h5>
          <p class="text-muted small mb-0">{service_2_desc}</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center">
          <div class="rounded-circle bg-warning bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px">
            <i class="bi {service_3_icon} fs-2 text-warning"></i>
          </div>
          <h5 class="fw-bold mb-3">{service_3_title}</h5>
          <p class="text-muted small mb-0">{service_3_desc}</p>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="card border-0 shadow-sm h-100 p-4 text-center">
          <div class="rounded-circle bg-info bg-opacity-10 d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width:80px;height:80px">
            <i class="bi {service_4_icon} fs-2 text-info"></i>
          </div>
          <h5 class="fw-bold mb-3">{service_4_title}</h5>
          <p class="text-muted small mb-0">{service_4_desc}</p>
        </div>
      </div>
    </div>
  </div>
</section>

ТРЕБОВАНИЕ: Все 4 карточки — ОДИНАКОВОЙ ВЫСОТЫ. Класс `h-100` + row flex гарантирует равную высоту.

---

### БЛОК 3: ИЗОБРАЖЕНИЕ + ТЕКСТ (50/50, одинаковой высоты)

<section class="py-5 bg-light">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <img src="{section_2_image}" alt="" class="img-fluid rounded-4 shadow" style="width:100%;height:400px;object-fit:cover">
      </div>
      <div class="col-lg-6 ps-lg-5">
        <h2 class="fw-bold mb-4">{section_2_title}</h2>
        <div class="d-flex mb-4">
          <div class="me-3 flex-shrink-0">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" style="width:40px;height:40px;font-size:20px">1</div>
          </div>
          <div>
            <p class="mb-0 fw-medium">{section_2_text_1}</p>
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="me-3 flex-shrink-0">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" style="width:40px;height:40px;font-size:20px">2</div>
          </div>
          <div>
            <p class="mb-0 fw-medium">{section_2_text_2}</p>
          </div>
        </div>
        <div class="d-flex">
          <div class="me-3 flex-shrink-0">
            <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white" style="width:40px;height:40px;font-size:20px">3</div>
          </div>
          <div>
            <p class="mb-0 fw-medium">{section_2_text_3}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

ТРЕБОВАНИЕ: Изображение и текстовая колонка — одинаковой высоты. `align-items-center` на row + фиксированная высота изображения `400px` + `object-fit:cover`.

---

### БЛОК 4: СТАТИСТИКА (4 числа в строку)

<section class="py-5" style="background:linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))">
  <div class="container">
    <div class="row text-center text-white g-4">
      <div class="col-6 col-md-3">
        <div class="display-4 fw-bold mb-1">{stat_1_value}</div>
        <div class="text-white-50 small text-uppercase">{stat_1_label}</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="display-4 fw-bold mb-1">{stat_2_value}</div>
        <div class="text-white-50 small text-uppercase">{stat_2_label}</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="display-4 fw-bold mb-1">{stat_3_value}</div>
        <div class="text-white-50 small text-uppercase">{stat_3_label}</div>
      </div>
      <div class="col-6 col-md-3">
        <div class="display-4 fw-bold mb-1">{stat_4_value}</div>
        <div class="text-white-50 small text-uppercase">{stat_4_label}</div>
      </div>
    </div>
  </div>
</section>

---

### БЛОК 5: ПОСЛЕДНИЕ СТАТЬИ (3 карточки с изображениями, равная высота)

<section class="py-5">
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h2 class="fw-bold mb-0">Последние статьи</h2>
      <a href="/blog/" class="btn btn-outline-primary">Все статьи →</a>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <article class="card border-0 shadow-sm h-100 overflow-hidden">
          <img src="{blog_image_1}" class="card-img-top" alt="" style="height:200px;object-fit:cover">
          <div class="card-body d-flex flex-column">
            <div class="mb-2"><span class="badge bg-primary bg-opacity-10 text-primary small">Категория</span></div>
            <h5 class="card-title fw-bold">[Заголовок статьи]</h5>
            <p class="card-text text-muted small flex-grow-1">[Описание статьи — 2 предложения]</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">[Дата] · [Время чтения] min</small>
              <a href="/blog/[slug]/" class="btn btn-sm btn-outline-primary">Читать →</a>
            </div>
          </div>
        </article>
      </div>
      <div class="col-md-4">
        <article class="card border-0 shadow-sm h-100 overflow-hidden">
          <img src="{blog_image_2}" class="card-img-top" alt="" style="height:200px;object-fit:cover">
          <div class="card-body d-flex flex-column">
            <div class="mb-2"><span class="badge bg-success bg-opacity-10 text-success small">Категория</span></div>
            <h5 class="card-title fw-bold">[Заголовок статьи]</h5>
            <p class="card-text text-muted small flex-grow-1">[Описание статьи — 2 предложения]</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">[Дата] · [Время чтения] min</small>
              <a href="/blog/[slug]/" class="btn btn-sm btn-outline-primary">Читать →</a>
            </div>
          </div>
        </article>
      </div>
      <div class="col-md-4">
        <article class="card border-0 shadow-sm h-100 overflow-hidden">
          <img src="{blog_image_3}" class="card-img-top" alt="" style="height:200px;object-fit:cover">
          <div class="card-body d-flex flex-column">
            <div class="mb-2"><span class="badge bg-warning bg-opacity-10 text-warning small">Категория</span></div>
            <h5 class="card-title fw-bold">[Заголовок статьи]</h5>
            <p class="card-text text-muted small flex-grow-1">[Описание статьи — 2 предложения]</p>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">[Дата] · [Время чтения] min</small>
              <a href="/blog/[slug]/" class="btn btn-sm btn-outline-primary">Читать →</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>

ТРЕБОВАНИЕ: Все 3 карточки — ОДИНАКОВОЙ ВЫСОТЫ. `h-100` + фиксированная высота изображений `200px` + `object-fit:cover`. `d-flex flex-column` на card-body для прижатия кнопки к низу через `flex-grow-1` на описании.

---

### БЛОК 6: ФИНАЛЬНЫЙ CTA (полноширинный градиент)

<section class="py-5" style="background:linear-gradient(135deg,var(--color-text),#2d1060)" id="cta">
  <div class="container text-center text-white py-4">
    <h2 class="display-5 fw-bold mb-3">Готовы увеличить AI-трафик?</h2>
    <p class="lead mb-4 opacity-85 mx-auto" style="max-width:600px">Первый GEO-аудит — бесплатно. Результат через 48 часов.</p>
    <div class="d-flex justify-content-center flex-wrap gap-3">
      <a href="tel:{phone}" class="btn btn-light btn-lg px-5 py-3 fw-bold text-primary">{phone}</a>
      <a href="#contact" class="btn btn-outline-light btn-lg px-5 py-3">Написать в мессенджер</a>
    </div>
    <p class="mt-3 small opacity-50">Отвечаем в течение 15 минут</p>
  </div>
</section>

---

ТРЕБОВАНИЯ КО ВСЕМУ ДОКУМЕНТУ:
1. КАЖДЫЙ блок — самодостаточен, понятен отдельно от остальных
2. Все колонки внутри одного блока — ОДИНАКОВОЙ ВЫСОТЫ (h-100, align-items-center, flex)
3. Изображения — 5 штук (hero_bg, section_2, blog ×3) — все через PixInLink
4. Текст — осмысленный, с цифрами, без «таким образом» и «подводя итог»
5. Все числа — из source_facts с указанием источника в скобках
6. Цвета — через CSS-переменные темы (var(--color-*)), НЕ хардкодить hex
7. Радиусы — через var(--radius-*) или Bootstrap rounded-4
8. Тени — через классы shadow-sm

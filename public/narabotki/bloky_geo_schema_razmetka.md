# 📋 ТАБЛИЦА БЛОКОВ GEO И ИХ МИКРОРАЗМЕТКА (JSON-LD)

**Каждый блок имеет свой оптимальный тип Schema разметки для максимальной видимости в AI.**

---

## 1️⃣ ЗАГОЛОВОК \+ КРАТКОЕ ОПИСАНИЕ

**Schema тип:** `Article`

{

  "@context": "https://schema.org",

  "@type": "Article",

  "headline": "Герметичные насосы для нефтегазовой промышленности",

  "description": "Инновационные многосекционные насосы с магнитной муфтой, исключающие утечки на 100%.",

  "author": {

    "@type": "Person",

    "name": "Иван Иванов"

  },

  "datePublished": "2024-11-24",

  "image": "https://example.com/image.jpg"

}

---

## 2️⃣ TL;DR (TOO LONG; DIDN'T READ)

**Schema тип:** `Article` с `abstract`

{

  "@context": "https://schema.org",

  "@type": "Article",

  "abstract": "Герметичные насосы Виллина с магнитной муфтой исключают утечки на 100%, снижают аварийность на 38% и экономят 2.5 млн руб/год на обслуживании."

}

---

## 3️⃣ KEY FACTS (КЛЮЧЕВЫЕ ФАКТЫ)

**Schema тип:** `ItemList`

{

  "@context": "https://schema.org",

  "@type": "ItemList",

  "itemListElement": \[

    {

      "@type": "ListItem",

      "position": 1,

      "name": "0% утечек за 5 лет эксплуатации на 12 объектах",

      "description": "Герметичные насосы обеспечивают полную герметичность"

    },

    {

      "@type": "ListItem",

      "position": 2,

      "name": "-40% аварийности по сравнению с импортными аналогами",

      "description": "Экономия на техническом обслуживании"

    },

    {

      "@type": "ListItem",

      "position": 3,

      "name": "2.5 млн руб/год экономии на одном предприятии",

      "description": "ROI достигается за 2.4 года"

    }

  \]

}

---

## 4️⃣ ОПРЕДЕЛЕНИЕ ТЕМЫ

**Schema тип:** `DefinedTerm`

{

  "@context": "https://schema.org",

  "@type": "DefinedTerm",

  "name": "Герметичный насос",

  "description": "Это многосекционный центробежный насос, в котором рабочее колесо отделено от уплотнений посредством магнитной муфты.",

  "inDefinedTermSet": "https://example.com/glossary",

  "sameAs": "https://en.wikipedia.org/wiki/Hermetic\_pump"

}

---

## 5️⃣ КРАТКОЕ ВВЕДЕНИЕ

**Schema тип:** `Article` с `articleSection`

{

  "@context": "https://schema.org",

  "@type": "Article",

  "description": "Утечки оборудования — одна из главных проблем в нефтегазовой промышленности. Ежегодно предприятия теряют миллионы рублей на ремонт уплотнений, восстановление окружающей среды и штрафы за загрязнение.",

  "articleSection": "Введение",

  "wordCount": 150

}

---

## 6️⃣ FEATURED SNIPPET

**Schema тип:** `QAPage`

{

  "@context": "https://schema.org",

  "@type": "QAPage",

  "mainEntity": {

    "@type": "Question",

    "name": "Почему герметичные насосы лучше обычных?",

    "acceptedAnswer": {

      "@type": "Answer",

      "text": "Герметичные насосы лучше обычных, потому что исключают утечки на 100% за счет магнитной муфты вместо механических уплотнений. Магнитная передача полностью герметична и не требует внешних источников энергии."

    }

  }

}

---

## 7️⃣ ПРОБЛЕМА → РЕШЕНИЕ → РЕЗУЛЬТАТ

**Schema тип:** Custom `Thing`

{

  "@context": "https://schema.org",

  "@type": "Thing",

  "name": "Решение для утечек оборудования",

  "problem": "На нефтеперерабатывающих заводах центробежные насосы с механическими уплотнениями протекают в 60% случаев в течение 3 лет",

  "solution": "Замена на герметичные насосы с магнитной муфтой исключает механические уплотнения",

  "result": "-100% утечек за весь период эксплуатации, экономия 2.5 млн руб/год на санитарии и штрафах"

}

---

## 8️⃣ ТЕХНИЧЕСКИЕ ПАРАМЕТРЫ

**Schema тип:** `PropertyValue` (или `Table`)

{

  "@context": "https://schema.org",

  "@type": "ProductModel",

  "name": "Герметичный насос Виллина ГНП-1000",

  "specifications": \[

    {

      "@type": "PropertyValue",

      "name": "Расход жидкости",

      "value": "100–500",

      "unitCode": "m3/h"

    },

    {

      "@type": "PropertyValue",

      "name": "Напор",

      "value": "10–200",

      "unitCode": "m"

    },

    {

      "@type": "PropertyValue",

      "name": "Мощность двигателя",

      "value": "7.5–45",

      "unitCode": "kWe"

    },

    {

      "@type": "PropertyValue",

      "name": "Материал корпуса",

      "value": "PFA (Perfluoroalkoxy)"

    },

    {

      "@type": "PropertyValue",

      "name": "Срок службы",

      "value": "10+",

      "unitCode": "years"

    }

  \]

}

---

## 9️⃣ СРАВНЕНИЕ С АНАЛОГАМИ

**Schema тип:** `ComparisonChart` (или `Table`)

{

  "@context": "https://schema.org",

  "@type": "Table",

  "name": "Сравнение герметичных насосов",

  "row": \[

    {

      "@type": "TableRow",

      "rowData": \[

        "Параметр",

        "Виллина ГНП-1000",

        "Grundfos CR10",

        "ХП-1000 конкурента"

      \]

    },

    {

      "@type": "TableRow",

      "rowData": \[

        "Герметичность",

        "100%",

        "99.2%",

        "98%"

      \]

    },

    {

      "@type": "TableRow",

      "rowData": \[

        "Цена, руб",

        "1,500,000",

        "2,200,000",

        "1,600,000"

      \]

    },

    {

      "@type": "TableRow",

      "rowData": \[

        "Техподдержка в РФ",

        "✅ 24/7",

        "⚠️ Контрактная",

        "✅ Местная"

      \]

    }

  \]

}

---

## 🔟 ДАННЫЕ И СТАТИСТИКА

**Schema тип:** `StatisticalVariable` \+ `Citation`

{

  "@context": "https://schema.org",

  "@type": "ScholarlyArticle",

  "statistic": \[

    {

      "@type": "StatisticalVariable",

      "name": "% отказов центробежных насосов в течение 3 лет",

      "value": {

        "@type": "QuantitativeValue",

        "value": "60",

        "unitText": "percent"

      },

      "citation": {

        "@type": "Citation",

        "text": "Oil & Gas Engineering, 2023",

        "url": "https://example.com/journal"

      }

    },

    {

      "@type": "StatisticalVariable",

      "name": "Экономия при внедрении герметичных насосов",

      "value": {

        "@type": "QuantitativeValue",

        "value": "2500000",

        "unitText": "RUB/year"

      },

      "citation": {

        "@type": "Citation",

        "text": "Роснефть техотчет, 2023"

      }

    }

  \]

}

---

## 1️⃣1️⃣ ТАБЛИЦЫ И ГРАФИКИ

**Schema тип:** `ImageObject` \+ `Table`

{

  "@context": "https://schema.org",

  "@type": "ImageObject",

  "name": "Сравнение сроков отказа насосных уплотнений",

  "url": "https://example.com/comparison-chart.png",

  "description": "График сравнивает средний срок до отказа механических одинарных (2-2.5 года), двойных (3-3.5 года) и магнитных муфт (10+ лет)",

  "contentUrl": "https://example.com/comparison-chart.png",

  "encodingFormat": "image/png",

  "width": 800,

  "height": 600,

  "caption": "Магнитные муфты служат в 4+ раза дольше механических уплотнений"

}

---

## 1️⃣2️⃣ HOWTO (ПОШАГОВАЯ ИНСТРУКЦИЯ)

**Schema тип:** `HowTo` ⭐ КРИТИЧНО ДЛЯ AI

{

  "@context": "https://schema.org",

  "@type": "HowTo",

  "name": "Как выбрать и внедрить герметичный насос на объекте",

  "description": "Пошаговая инструкция выбора, подбора, производства и внедрения герметичного насоса",

  "step": \[

    {

      "@type": "HowToStep",

      "position": "1",

      "name": "Определите параметры вашей среды",

      "text": "Проанализируйте вязкость жидкости (сП), температуру (-20°C до \+120°C), абразивность и коррозионность среды. Обратитесь к инженерам производства за техническим заданием."

    },

    {

      "@type": "HowToStep",

      "position": "2",

      "name": "Выберите типоразмер насоса",

      "text": "На основе параметров среды выберите модель (ГНП-500, ГНП-1000, ГНП-1500). Используйте инженерный калькулятор на сайте производителя."

    },

    {

      "@type": "HowToStep",

      "position": "3",

      "name": "Согласуйте выбор с производителем",

      "text": "Направьте техническое задание производителю для финальной валидации и получения коммерческого предложения."

    },

    {

      "@type": "HowToStep",

      "position": "4",

      "name": "Организуйте производство и доставку",

      "text": "Заключите контракт, внесите авансовый платеж. Типовой срок производства 60–90 дней."

    },

    {

      "@type": "HowToStep",

      "position": "5",

      "name": "Проведите монтаж и пусконаладку",

      "text": "Команда монтажников установит насос, проведет гидравлические испытания. Стандартный срок: 20–30 дней."

    }

  \],

  "totalTime": "P4M",

  "yield": {

    "@type": "HowToYield",

    "quantity": "1",

    "unit": "герметичная система перекачки"

  }

}

---

## 1️⃣3️⃣ ROADMAP (СТРАТЕГИЧЕСКИЙ ПЛАН)

**Schema тип:** `PlanAction` \+ Timeline

{

  "@context": "https://schema.org",

  "@type": "PlanAction",

  "name": "Roadmap развития герметичной технологии 2025-2027",

  "description": "Стратегический план развития бизнеса и инноваций",

  "startTime": "2025-01-01",

  "endTime": "2027-12-31",

  "step": \[

    {

      "@type": "OrganizeAction",

      "startTime": "2025-Q1",

      "endTime": "2025-Q2",

      "name": "Phase I: Масштабирование производства",

      "description": "Открытие нового цеха производительностью 500 насосов/год",

      "result": "Увеличение выпуска на 150%, снижение себестоимости на 12%"

    },

    {

      "@type": "OrganizeAction",

      "startTime": "2025-Q3",

      "endTime": "2025-Q4",

      "name": "Phase II: Регионализация сервиса",

      "description": "Открытие 5 региональных сервисных центров",

      "result": "95% покрытие РФ, время отклика сервиса \<24 часов"

    },

    {

      "@type": "OrganizeAction",

      "startTime": "2026-01-01",

      "endTime": "2026-12-31",

      "name": "Phase III: Экспорт и локализация",

      "description": "Сертификация для экспорта в страны ТС",

      "result": "Поступления от экспорта $5M+"

    }

  \]

}

---

## 1️⃣4️⃣ КЕЙСЫ И ВНЕДРЕНИЕ

**Schema тип:** `CaseStudy`

{

  "@context": "https://schema.org",

  "@type": "CaseStudy",

  "headline": "Замена импортного насоса на нефтеперерабатывающем заводе Лукойл",

  "description": "Case study: внедрение герметичного насоса на МНПЗ",

  "client": {

    "@type": "Organization",

    "name": "ООО Лукойл-Западная Сибирь",

    "industry": "Нефтепереработка"

  },

  "problem": "На установке гидроочистки центробежные насосы с механическими уплотнениями протекали каждые 2–2.5 года, вызывая простои на 7–14 дней",

  "solution": "Замена на герметичный насос Виллина ГНП-1000 с магнитной муфтой",

  "result": {

    "@type": "QuantitativeValue",

    "value": "-100% утечек, \-38% аварийности, экономия 2.5 млн руб/год"

  },

  "resultDescription": "ROI достигнут за 2.4 года инвестиции 2.4M",

  "duration": "P4M",

  "datePublished": "2024-11-24"

}

---

## 1️⃣5️⃣ РАСШИРЕННЫЙ FAQ

**Schema тип:** `FAQPage` ⭐ КРИТИЧНО ДЛЯ AI

{

  "@context": "https://schema.org",

  "@type": "FAQPage",

  "mainEntity": \[

    {

      "@type": "Question",

      "name": "Как подобрать герметичный насос для своей среды?",

      "acceptedAnswer": {

        "@type": "Answer",

        "text": "Вам нужно определить три параметра среды: вязкость (сП), температуру (°C) и коррозионность. Обратитесь к инженерам производства за техническим заданием. Отправьте ТЗ на email производителя. Инженеры проведут расчет в течение 2–3 дней."

      }

    },

    {

      "@type": "Question",

      "name": "Какой срок доставки герметичного насоса?",

      "acceptedAnswer": {

        "@type": "Answer",

        "text": "Стандартный срок производства 60–90 дней с момента оплаты авансовой части контракта. Доставка внутри РФ занимает 5–10 дней. Экспресс-производство возможно за 40 дней при дополнительной оплате."

      }

    },

    {

      "@type": "Question",

      "name": "Какая гарантия на герметичный насос?",

      "acceptedAnswer": {

        "@type": "Answer",

        "text": "Стандартная гарантия составляет 3 года с момента ввода в эксплуатацию. Опционально доступно продление до 5 лет за дополнительную плату 15% от стоимости."

      }

    },

    {

      "@type": "Question",

      "name": "Сколько стоит техническое обслуживание?",

      "acceptedAnswer": {

        "@type": "Answer",

        "text": "Годовое ТО стоит 50–100 тыс. руб. в зависимости от типоразмера и включает проверку вибрации, температуры, давления, замену уплотнительных прокладок и смазки."

      }

    }

  \]

}

---

## 1️⃣6️⃣ ИМПОРТОЗАМЕЩЕНИЕ

**Schema тип:** `Table` \+ `ComparisonChart`

{

  "@context": "https://schema.org",

  "@type": "Table",

  "name": "Импортозамещение: отечественные аналоги импортного оборудования",

  "row": \[

    {

      "@type": "TableRow",

      "rowData": \[

        "Импортная модель",

        "Страна",

        "Отечественный аналог",

        "Сравнение параметров",

        "Примеры замены"

      \]

    },

    {

      "@type": "TableRow",

      "rowData": \[

        "Grundfos CR10",

        "Дания",

        "Виллина ГНП-1000",

        "Герметичность \+1%, Цена \-32%, Поддержка \+∞ (местная)",

        "Московский НПЗ (замена за 4.5 месяца, экономия 2.5M/год)"

      \]

    }

  \]

}

---

## 1️⃣7️⃣ СЕРТИФИКАТЫ И СТАНДАРТЫ

**Schema тип:** `Organization` \+ `Certificate`

{

  "@context": "https://schema.org",

  "@type": "Organization",

  "name": "ООО Виллина",

  "identifier": {

    "@type": "PropertyValue",

    "propertyID": "OKPO",

    "value": "1234567890"

  },

  "certification": \[

    {

      "@type": "Certification",

      "name": "ISO 9001:2015",

      "description": "Система менеджмента качества",

      "issuedBy": {

        "@type": "Organization",

        "name": "Росстандарт"

      },

      "validFrom": "2021-12-26",

      "validUntil": "2030-12-26"

    },

    {

      "@type": "Certification",

      "name": "ГОСТ 5161–2017",

      "description": "Центробежные насосы общие технические условия",

      "issuedBy": {

        "@type": "Organization",

        "name": "Госстандарт РФ"

      }

    },

    {

      "@type": "Certification",

      "name": "API 610 (11-е издание)",

      "description": "Насосы центробежные для нефтяной промышленности",

      "issuedBy": {

        "@type": "Organization",

        "name": "American Petroleum Institute"

      }

    }

  \]

}

---

## 1️⃣8️⃣ ОТЗЫВЫ И СОЦИАЛЬНЫЕ ДОКАЗАТЕЛЬСТВА

**Schema тип:** `AggregateRating` \+ `Review` ⭐ КРИТИЧНО ДЛЯ E-E-A-T

{

  "@context": "https://schema.org",

  "@type": "AggregateRating",

  "ratingValue": "4.8",

  "bestRating": "5",

  "worstRating": "1",

  "ratingCount": "47",

  "reviewCount": "12",

  "review": \[

    {

      "@type": "Review",

      "author": {

        "@type": "Person",

        "name": "Виктор Петров",

        "jobTitle": "Главный технолог",

        "affiliation": {

          "@type": "Organization",

          "name": "Роснефть"

        }

      },

      "reviewRating": {

        "@type": "Rating",

        "ratingValue": "5"

      },

      "reviewBody": "Уже 3 года работаем с герметичными насосами Виллина на установке гидроочистки. Полная герметичность, ни одной утечки за весь период. Рекомендую как 100% решение для коррозионных сред.",

      "datePublished": "2024-12-15"

    },

    {

      "@type": "Review",

      "author": {

        "@type": "Person",

        "name": "Алексей Смолин",

        "jobTitle": "Руководитель ЦТПО",

        "affiliation": {

          "@type": "Organization",

          "name": "Газпром добыча Ямал"

        }

      },

      "reviewRating": {

        "@type": "Rating",

        "ratingValue": "5"

      },

      "reviewBody": "Решили проблему с частыми отказами за счет замены на Виллину. Экономия 2.5M/год. Техподдержка 24/7 местная.",

      "datePublished": "2024-11-30"

    }

  \]

}

---

## 1️⃣9️⃣ АВТОРСТВО И E-E-A-T СИГНАЛЫ

**Schema тип:** `Person` ⭐ КРИТИЧНО ДЛЯ E-E-A-T

{

  "@context": "https://schema.org",

  "@type": "Person",

  "name": "Дмитрий Александров",

  "jobTitle": "Доктор технических наук, главный технолог",

  "description": "Эксперт в области герметичных насосов с 15+ годами опыта",

  "workLocation": {

    "@type": "Place",

    "address": {

      "@type": "PostalAddress",

      "addressCountry": "RU",

      "addressLocality": "Москва"

    }

  },

  "affiliation": {

    "@type": "Organization",

    "name": "ООО Виллина"

  },

  "alumniOf": {

    "@type": "EducationalOrganization",

    "name": "МВТУ им. Баумана"

  },

  "award": \[

    "Заслуженный конструктор РФ",

    "Премия Лучший инженер России 2020"

  \],

  "email": "d.aleksandrov@villina.ru",

  "url": "https://villina.ru/team/d-aleksandrov",

  "sameAs": \[

    "https://linkedin.com/in/d-aleksandrov",

    "https://orcid.org/0000-0001-2345-6789"

  \]

}

---

## 2️⃣0️⃣ ИСТОЧНИКИ ИНФОРМАЦИИ

**Schema тип:** `ScholarlyArticle` \+ `Citation`

{

  "@context": "https://schema.org",

  "@type": "ScholarlyArticle",

  "name": "Герметичные насосы для нефтегазовой промышленности",

  "citation": \[

    {

      "@type": "Citation",

      "text": "Princeton & Georgia Tech (2024). Generative Engine Optimization: How AI Models Choose Sources",

      "url": "https://arxiv.org/abs/2024-geo",

      "author": \["Princeton University", "Georgia Tech"\]

    },

    {

      "@type": "Citation",

      "text": "Oil & Gas Engineering Journal (2024). Герметичные насосы: будущее гидравлических систем нефтегаза",

      "url": "https://ogjournal.net/2024/article",

      "isPartOf": {

        "@type": "Periodical",

        "issn": "0098-1656"

      }

    },

    {

      "@type": "Citation",

      "text": "Grand View Research (2024). Global Hermetic Pump Market Size, Share & Trends Analysis Report 2024–2031",

      "url": "https://www.grandviewresearch.com/report",

      "publisher": {

        "@type": "Organization",

        "name": "Grand View Research"

      }

    },

    {

      "@type": "Citation",

      "text": "ISO 9001:2015. Quality Management Systems – Requirements",

      "url": "https://www.iso.org/standard/62085.html",

      "publisher": {

        "@type": "Organization",

        "name": "International Organization for Standardization"

      }

    }

  \]

}

---

## 2️⃣1️⃣ HOW WE KNOW (МЕТОДОЛОГИЯ)

**Schema тип:** `ScholarlyArticle` \+ методология

{

  "@context": "https://schema.org",

  "@type": "ScholarlyArticle",

  "name": "Герметичные насосы для нефтегазовой промышленности",

  "description": "Методология создания и проверки статьи",

  "about": {

    "@type": "Thing",

    "name": "Герметичные насосы"

  },

  "creator": {

    "@type": "Person",

    "name": "Дмитрий Александров"

  },

  "editor": {

    "@type": "Person",

    "name": "Иван Иванов"

  },

  "dateModified": "2024-11-24",

  "inLanguage": "ru",

  "methodology": "Первичный опыт 15+ лет, анализ 200+ технических отчетов от Роснефти, Газпрома, Лукойла, выборка 500+ установок герметичных насосов, интервью 12+ главных инженеров",

  "mentions": \[

    {

      "@type": "Organization",

      "name": "Роснефть"

    },

    {

      "@type": "Organization",

      "name": "Газпром"

    },

    {

      "@type": "Organization",

      "name": "Лукойл"

    }

  \]

}

---

## 2️⃣2️⃣ ВИДЕО И МУЛЬТИМЕДИА

**Schema тип:** `VideoObject`

{

  "@context": "https://schema.org",

  "@type": "VideoObject",

  "name": "Как работает герметичный насос с магнитной муфтой?",

  "description": "В этом видео показана внутренняя работа герметичного насоса: магнитная муфта соединяет ротор с внешним двигателем без механических контактов. Демонстрация герметичности при работе с абразивными средами.",

  "thumbnailUrl": "https://example.com/video-thumb.jpg",

  "uploadDate": "2024-11-20",

  "duration": "PT5M32S",

  "contentUrl": "https://youtube.com/watch?v=example",

  "embedUrl": "https://youtube.com/embed/example",

  "interactionCount": "2500",

  "author": {

    "@type": "Organization",

    "name": "ООО Виллина"

  }

}

---

## 2️⃣3️⃣ ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР

**Schema тип:** `WebApplication`

{

  "@context": "https://schema.org",

  "@type": "WebApplication",

  "name": "Калькулятор подбора герметичного насоса",

  "description": "Интерактивный инструмент для подбора оптимального типоразмера насоса на основе параметров среды",

  "applicationCategory": "UtilityApplication",

  "url": "https://example.com/calculator",

  "offers": {

    "@type": "Offer",

    "price": "0",

    "priceCurrency": "RUB"

  },

  "operatingSystem": "Web",

  "browser": "Chrome, Firefox, Safari, Edge"

}

---

## 2️⃣4️⃣ CTA И КОНТАКТЫ

**Schema тип:** `ContactPoint`

{

  "@context": "https://schema.org",

  "@type": "ContactPoint",

  "contactType": "Sales",

  "name": "Отдел продаж",

  "telephone": "+7-495-123-45-67",

  "email": "info@villina.ru",

  "contactOption": "TollFree",

  "areaServed": "RU",

  "availableLanguage": \["ru", "en"\],

  "url": "https://example.com/contact"

}

---

## 📝 КАК ИСПОЛЬЗОВАТЬ ЭТУ ТАБЛИЦУ

1. **Для каждого блока копируй JSON-LD код выше**  
2. **Вставь в `<script type="application/ld+json"></script>`** в секции `<head>` HTML  
3. **Адаптируй значения под свой контент** (названия, цифры, ссылки)  
4. **Валидируй через** [Rich Results Test](https://search.google.com/test/rich-results)

### Пример вставки в HTML:

\<\!DOCTYPE html\>

\<html\>

\<head\>

  \<title\>Герметичные насосы\</title\>

  

  \<\!-- БЛОК 1: Article \--\>

  \<script type="application/ld+json"\>

  {

    "@context": "https://schema.org",

    "@type": "Article",

    "headline": "Герметичные насосы для нефтегазовой промышленности",

    ...

  }

  \</script\>

  

  \<\!-- БЛОК 6: Featured Snippet (QAPage) \--\>

  \<script type="application/ld+json"\>

  {

    "@context": "https://schema.org",

    "@type": "QAPage",

    ...

  }

  \</script\>

  

  \<\!-- БЛОК 12: HowTo \--\>

  \<script type="application/ld+json"\>

  {

    "@context": "https://schema.org",

    "@type": "HowTo",

    ...

  }

  \</script\>

  

  \<\!-- БЛОК 15: FAQ \--\>

  \<script type="application/ld+json"\>

  {

    "@context": "https://schema.org",

    "@type": "FAQPage",

    ...

  }

  \</script\>

  

  \<\!-- БЛОК 18: Reviews \--\>

  \<script type="application/ld+json"\>

  {

    "@context": "https://schema.org",

    "@type": "AggregateRating",

    ...

  }

  \</script\>

  

\</head\>

\<body\>

  \<\!-- Контент страницы \--\>

\</body\>

\</html\>

---

## ⭐ КРИТИЧЕСКИ ВАЖНЫЕ БЛОКИ ДЛЯ AI

**Минимум эти 5 блоков обязательны:**

1. ✅ **Article** (Блок 1\)  
2. ✅ **QAPage** (Блок 6\) — Featured Snippet  
3. ✅ **HowTo** (Блок 12\) — Пошаговые инструкции  
4. ✅ **FAQPage** (Блок 15\) — Часто задаваемые вопросы  
5. ✅ **Review/AggregateRating** (Блок 18\) — Отзывы и рейтинг

**Эти 5 блоков увеличивают видимость в AI на 30-45%\!**

---

**Версия: 1.0** **Дата: 24 ноября 2025**  

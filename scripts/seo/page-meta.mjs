import { slugify, esc } from "./utils.mjs";

export function buildOrgJsonLd(siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ООО «ФОНИИ»",
    legalName: "ООО «ФОНИИ»",
    url: siteUrl,
    logo: siteUrl + "/images/logo-200x40.png",
    foundingDate: "2025",
    taxID: "7720943604",
    vatID: "772001001",
    address: { "@type": "PostalAddress", streetAddress: "111141, г. Москва, пр-кт Зелёный, д 3а, стр. 1", addressCountry: "RU" },
    contactPoint: { "@type": "ContactPoint", telephone: "+7 (495) 324-30-88", email: "info@fonai.ru", contactType: "Customer Service", areaServed: "Россия, СНГ", availableLanguage: ["ru"] },
    sameAs: ["https://vk.com/githubcrm", "https://t.me/githubcrm", "https://youtube.com/@githubcrm", "https://github.com/hubcms-dot/githubcms"],
  };
}

export function orgBlock(siteUrl) {
  return buildOrgJsonLd(siteUrl);
}

function buildBreadcrumbList(article, siteUrl, bcHome, bcBlog) {
  const items = [
    { "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" },
    { "@type": "ListItem", position: 2, name: bcBlog, item: siteUrl + "/blog/" },
  ];
  const cat = article.frontmatter.category;
  if (cat) {
    items.push({ "@type": "ListItem", position: 3, name: cat, item: `${siteUrl}/category/${slugify(cat)}/` });
    items.push({ "@type": "ListItem", position: 4, name: article.frontmatter.title });
  } else {
    items.push({ "@type": "ListItem", position: 3, name: article.frontmatter.title });
  }
  return items;
}

export function renderMetaTags(page, { siteName, siteUrl, alternateUrl, isRu }) {
  const tags = [];
  const title = page.title === siteName ? siteName : `${page.title} | ${siteName}`;
  tags.push(`<title>${esc(title)}</title>`);
  tags.push(`<meta name="description" content="${esc(page.description)}">`);
  tags.push(`<meta name="robots" content="index,follow">`);
  tags.push(`<meta property="og:site_name" content="${esc(siteName)}">`);
  tags.push(`<meta property="og:locale" content="${isRu ? "ru_RU" : "en_US"}">`);
  if (alternateUrl) {
    tags.push(`<meta property="og:locale:alternate" content="${isRu ? "en_US" : "ru_RU"}">`);
  }
  if (page.canonical) {
    const otherLocale = isRu ? "en" : "ru";
    const otherUrl = page.canonical.replace(siteUrl, alternateUrl);
    tags.push(`<link rel="alternate" hreflang="${otherLocale}" href="${otherUrl}">`);
    tags.push(`<link rel="alternate" hreflang="${isRu ? "ru" : "en"}" href="${page.canonical}">`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${page.canonical}">`);
  }
  tags.push(`<meta property="og:type" content="${esc(page.type)}">`);
  tags.push(`<meta property="og:title" content="${esc(page.title)}">`);
  tags.push(`<meta property="og:description" content="${esc(page.description)}">`);
  tags.push(`<meta property="og:url" content="${esc(page.canonical)}">`);
  tags.push(`<meta property="og:image" content="${esc(page.image)}">`);
  tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  tags.push(`<meta name="twitter:title" content="${esc(page.title)}">`);
  tags.push(`<meta name="twitter:description" content="${esc(page.description)}">`);
  tags.push(`<meta name="twitter:image" content="${esc(page.image)}">`);
  if (page.publishedTime) tags.push(`<meta property="article:published_time" content="${esc(page.publishedTime)}">`);
  if (page.modifiedTime) tags.push(`<meta property="article:modified_time" content="${esc(page.modifiedTime)}">`);
  if (page.tags?.length) tags.push(`<meta name="keywords" content="${esc(page.tags.join(", "))}">`);
  tags.push(`<link rel="canonical" href="${esc(page.canonical)}">`);
  tags.push(`<link rel="alternate" type="application/rss+xml" title="${esc(siteName)} RSS Feed" href="${esc(siteUrl)}/rss.xml">`);
  if (page.jsonLd) {
    const items = Array.isArray(page.jsonLd) ? page.jsonLd : [page.jsonLd];
    for (const item of items) {
      const ld = JSON.stringify(item).replace(/</g, "\\u003C").replace(/>/g, "\\u003E").replace(/&/g, "\\u0026");
      tags.push(`<script type="application/ld+json">${ld}</script>`);
    }
  }
  return tags.join("\n    ");
}

function buildProductSchema(p) {
  const schemas = [];
  schemas.push({
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, description: p.desc, image: p.img, sku: p.id,
    offers: { "@type": "Offer", price: String(p.price), priceCurrency: "RUB", availability: "https://schema.org/InStock" },
  });
  if (p.specs) {
    for (const s of p.specs) schemas.push({ "@context": "https://schema.org", "@type": "PropertyValue", name: s.n, value: s.v });
  }
  if (p.revs && p.revs.length) {
    const avg = (p.revs.reduce((sum, r) => sum + r.r, 0) / p.revs.length).toFixed(1);
    schemas.push({
      "@context": "https://schema.org", "@type": "AggregateRating",
      ratingValue: avg, bestRating: "5", worstRating: "1",
      ratingCount: String(p.revs.length), reviewCount: String(p.revs.length),
      review: p.revs.map(r => ({ "@type": "Review", author: { "@type": "Person", name: r.a }, reviewRating: { "@type": "Rating", ratingValue: String(r.r) }, reviewBody: r.t, datePublished: r.d })),
    });
  }
  if (p.faq && p.faq.length) {
    schemas.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: p.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  return schemas;
}

const productData = {
  "galaxy-s25-ultra": {id:"ELEC-001",name:"Смартфон Galaxy S25 Ultra",enName:"Galaxy S25 Ultra",price:89990,img:"https://pixinlink.ru/api/v1/600x450/galaxy-s25-ultra",desc:"Galaxy S25 Ultra — вершина мобильных технологий 2026 года. Процессор Snapdragon 8 Gen4, камера 200 МП с 100× Space Zoom, дисплей Dynamic AMOLED 2X 120 Гц, аккумулятор 5500 мАч с зарядкой 65 Вт, титановый корпус IP68, S Pen.",specs:[{n:"Процессор",v:"Snapdragon 8 Gen4 (3 нм)"},{n:"Дисплей",v:"6.9\" AMOLED 2X, 120 Гц"},{n:"Камера",v:"200+50+12 МП, 100× Zoom"},{n:"Аккумулятор",v:"5500 мАч, 65W"},{n:"Память",v:"16 ГБ / 512 ГБ"},{n:"Защита",v:"IP68, Gorilla Armor 2"}],revs:[{a:"Алексей М.",r:5,t:"Камера в темноте — как днём. AI реально помогает.",d:"2026-04-15"},{a:"Марина К.",r:5,t:"Автономность 1.5 дня активного использования.",d:"2026-04-20"}],faq:[{q:"eSIM поддерживается?",a:"Да, 2 eSIM + nano-SIM — до 3 номеров."},{q:"Версия Android?",a:"Android 16 + One UI 8. 7 лет обновлений."},{q:"Зарядка в комплекте?",a:"Нет, блок 65W отдельно. Кабель в комплекте."}]},
  "macbook-air-m4": {id:"ELEC-002",name:"Ноутбук MacBook Air M4",enName:"MacBook Air M4",price:124990,img:"https://pixinlink.ru/api/v1/600x450/macbook-air",desc:"MacBook Air M4 — самый производительный Air. Чип M4 (12 CPU / 18 GPU), дисплей 15.3\" Liquid Retina, 16 ГБ, 512 ГБ SSD, 1.3 кг, до 18 ч.",specs:[{n:"Процессор",v:"Apple M4 12CPU/18GPU"},{n:"Дисплей",v:"15.3\" Liquid Retina"},{n:"Память",v:"16 ГБ / 512 ГБ"},{n:"Вес",v:"1.3 кг"}],revs:[{a:"Иван П.",r:5,t:"Docker, Node.js, 3 монитора — всё летает.",d:"2026-04-10"}],faq:[{q:"Внешний монитор?",a:"Да, 2 монитора 6K через Thunderbolt 4."}]},
  "ipad-pro-m4": {id:"ELEC-003",name:"Планшет iPad Pro M4",enName:"iPad Pro M4",price:99990,img:"https://pixinlink.ru/api/v1/600x450/ipad-pro",desc:"iPad Pro M4 — OLED Ultra Retina XDR 1600 нит, чип M4, Apple Pencil Pro, Thunderbolt 5, Face ID, 5G.",specs:[{n:"Дисплей",v:"11\" OLED, 1600 нит"},{n:"Процессор",v:"Apple M4"},{n:"Память",v:"16 ГБ / 1 ТБ"}],revs:[{a:"Елена Д.",r:5,t:"OLED — прорыв. Pencil Pro — настоящий инструмент.",d:"2026-05-01"}]},
  "airpods-pro-3": {id:"ELEC-004",name:"Наушники AirPods Pro 3",enName:"AirPods Pro 3",price:24990,img:"https://pixinlink.ru/api/v1/600x450/airpods-pro",desc:"AirPods Pro 3 — чип H3, шумоподавление 48 дБ, адаптивный EQ, пространственное аудио, IP54.",specs:[{n:"Чип",v:"Apple H3"},{n:"ANC",v:"До 48 дБ"},{n:"Автономность",v:"8 ч + 28 ч"},{n:"Защита",v:"IP54"}],revs:[{a:"Анна Ш.",r:5,t:"ANC отличное. В метро тихо. 7+ ч.",d:"2026-04-18"}]},
  "watch-ultra-2": {id:"ELEC-005",name:"Умные часы Watch Ultra 2",enName:"Watch Ultra 2",price:59990,img:"https://pixinlink.ru/api/v1/600x450/smart-watch",desc:"Watch Ultra 2 — титан, дайвинг до 100 м, автономность 5 дней, ECG, SpO2, GPS.",specs:[{n:"Корпус",v:"Титановый сплав"},{n:"Дайвинг",v:"100 м"},{n:"Автономность",v:"5 дней"},{n:"Датчики",v:"ECG + SpO2 + GPS"}],revs:[{a:"Павел Г.",r:5,t:"ECG точный. Батарея реально 5 дней.",d:"2026-04-22"}]},
  "power-bank-20000": {id:"ELEC-006",name:"Power Bank 20000 mAh",enName:"Power Bank 20000mAh",price:3490,img:"https://pixinlink.ru/api/v1/600x450/power-bank",desc:"Power Bank 20000 mAh — USB-C 65W PD, 2×USB-A 18W, вес 380 г.",specs:[{n:"Ёмкость",v:"20000 mAh"},{n:"Порты",v:"USB-C 65W + 2×USB-A"},{n:"Вес",v:"380 г"}]},
  "lg-side-by-side": {id:"HOME-001",name:"Холодильник LG Side-by-Side",enName:"LG Side-by-Side Fridge",price:89990,img:"https://pixinlink.ru/api/v1/600x450/refrigerator",desc:"LG Side-by-Side 647 л — инвертор, No Frost, Wi-Fi SmartThings.",specs:[{n:"Объём",v:"647 л"},{n:"Компрессор",v:"Инверторный"},{n:"Wi-Fi",v:"SmartThings"}],revs:[{a:"Татьяна В.",r:5,t:"Тихий, вместительный. Wi-Fi удобен.",d:"2026-04-12"}]},
  "bosch-washing": {id:"HOME-002",name:"Стиральная машина Bosch Serie 6",enName:"Bosch Serie 6 Washer",price:54990,img:"https://pixinlink.ru/api/v1/600x450/washing-machine",desc:"Bosch Serie 6 — 10 кг, EcoSilence Drive, 1600 об/мин.",specs:[{n:"Загрузка",v:"10 кг"},{n:"Двигатель",v:"EcoSilence Drive"},{n:"Отжим",v:"1600 об/мин"}]},
  "xiaomi-x10": {id:"HOME-003",name:"Робот-пылесос Xiaomi X10+",enName:"Xiaomi X10+ Robot Vacuum",price:39990,img:"https://pixinlink.ru/api/v1/600x450/robot-vacuum",desc:"Xiaomi X10+ — самоочистка в доке, лидар LDS, влажная уборка, 6000 Па.",specs:[{n:"Всасывание",v:"6000 Па"},{n:"Навигация",v:"Лидар LDS"},{n:"Док",v:"Самоочистка"}]},
  "samsung-microwave": {id:"HOME-004",name:"Микроволновка Samsung MG",enName:"Samsung MG Microwave",price:12990,img:"https://pixinlink.ru/api/v1/600x450/microwave",desc:"Samsung MG — 28 л, гриль+конвекция, 900 Вт.",specs:[{n:"Объём",v:"28 л"},{n:"Мощность",v:"900 Вт"},{n:"Режимы",v:"Гриль + конвекция"}]},
  "electrolux-stove": {id:"HOME-005",name:"Индукционная плита Electrolux",enName:"Electrolux Induction Stove",price:34990,img:"https://pixinlink.ru/api/v1/600x450/induction-cooktop",desc:"Electrolux — индукция 4 конфорки, 7400 Вт, таймер.",specs:[{n:"Конфорки",v:"4 (индукция)"},{n:"Мощность",v:"7400 Вт"}]},
  "bosch-dishwasher": {id:"HOME-006",name:"Посудомойка Bosch SMV",enName:"Bosch SMV Dishwasher",price:44990,img:"https://pixinlink.ru/api/v1/600x450/dishwasher",desc:"Bosch SMV — 14 комплектов, 8 программ, AquaStop, 44 дБ.",specs:[{n:"Комплекты",v:"14"},{n:"Программы",v:"8"},{n:"Шум",v:"44 дБ"}]},
  "sofa-milan": {id:"FURN-001",name:"Угловой диван «Милан»",enName:"Milan Corner Sofa",price:84990,img:"https://pixinlink.ru/api/v1/600x450/corner-sofa",desc:"Диван «Милан» — 280×180 см, велюр серый.",specs:[{n:"Размер",v:"280×180 см"},{n:"Обивка",v:"Велюр серый"},{n:"Спальное",v:"160×200 см"}],revs:[{a:"Евгений Д.",r:5,t:"Диван удобный. Велюр мягкий.",d:"2026-04-30"}]},
  "table-loft": {id:"FURN-002",name:"Обеденный стол «Лофт»",enName:"Loft Dining Table",price:49990,img:"https://pixinlink.ru/api/v1/600x450/wooden-table",desc:"Стол «Лофт» — 160×90 см, массив дуба.",specs:[{n:"Размер",v:"160×90 см"},{n:"Материал",v:"Массив дуба"},{n:"Персоны",v:"6-8"}]},
  "ergo-chair": {id:"FURN-003",name:"Офисное кресло Ergo Pro",enName:"Ergo Pro Office Chair",price:22990,img:"https://pixinlink.ru/api/v1/600x450/office-chair",desc:"Ergo Pro — эргономичное кресло, подлокотники 4D.",specs:[{n:"Спинка",v:"Сетчатая"},{n:"Подлокотники",v:"4D-регулировка"},{n:"Нагрузка",v:"До 130 кг"}],revs:[{a:"Николай Б.",r:5,t:"Спина перестала болеть после 8-ч дня.",d:"2026-04-25"}]},
  "wardrobe-premium": {id:"FURN-004",name:"Шкаф-купе «Премиум»",enName:"Premium Wardrobe",price:79990,img:"https://pixinlink.ru/api/v1/600x450/wardrobe",desc:"Шкаф-купе «Премиум» — 240×220×65 см, зеркала, LED.",specs:[{n:"Размер",v:"240×220×65 см"},{n:"Двери",v:"Зеркальные"},{n:"Секции",v:"3"}]},
  "bed-oslo": {id:"FURN-005",name:"Кровать Oslo",enName:"Oslo Bed",price:59990,img:"https://pixinlink.ru/api/v1/600x450/double-bed",desc:"Кровать Oslo — 180×200 см, экокожа, подъёмный механизм.",specs:[{n:"Размер",v:"180×200 см"},{n:"Обивка",v:"Экокожа"},{n:"Механизм",v:"Подъёмный"}]},
  "dresser-scandi": {id:"FURN-006",name:"Комод «Сканди»",enName:"Scandi Dresser",price:19990,img:"https://pixinlink.ru/api/v1/600x450/dresser",desc:"Комод «Сканди» — 120×80×45 см, ЛДСП белый, 6 ящиков.",specs:[{n:"Размер",v:"120×80×45 см"},{n:"Материал",v:"ЛДСП белый"},{n:"Ящики",v:"6"}]},
  "kettler-tr1": {id:"SPRT-001",name:"Беговая дорожка Kettler TR1",enName:"Kettler TR1 Treadmill",price:89990,img:"https://pixinlink.ru/api/v1/600x450/treadmill",desc:"Kettler TR1 — 3.5 л.с., до 20 км/ч.",specs:[{n:"Мотор",v:"3.5 л.с."},{n:"Скорость",v:"0.5-20 км/ч"},{n:"Программ",v:"12"}],revs:[{a:"Александр С.",r:5,t:"Тихая, мощная. 12 программ хватает.",d:"2026-04-20"}]},
  "trek-bike": {id:"SPRT-002",name:"Горный велосипед Trek X-Caliber",enName:"Trek X-Caliber Bike",price:74990,img:"https://pixinlink.ru/api/v1/600x450/mountain-bike",desc:"Trek X-Caliber 9 — алюминий, 29\", RockShox.",specs:[{n:"Рама",v:"Алюминий Alpha Gold"},{n:"Колёса",v:"29\""},{n:"Вилка",v:"RockShox 100 мм"}]},
  "salomon-tent": {id:"SPRT-003",name:"Палатка Salomon 3-местная",enName:"Salomon 3-Person Tent",price:18990,img:"https://pixinlink.ru/api/v1/600x450/tent-camping",desc:"Salomon — 3 места, 2.8 кг, 5000 мм.",specs:[{n:"Вместимость",v:"3 места"},{n:"Вес",v:"2.8 кг"},{n:"Водостойкость",v:"5000 мм"}]},
  "nike-zoom": {id:"SPRT-004",name:"Кроссовки Nike Air Zoom",enName:"Nike Air Zoom Shoes",price:12990,img:"https://pixinlink.ru/api/v1/600x450/running-shoes",desc:"Nike Air Zoom Pegasus — Zoom Air, 280 г.",specs:[{n:"Амортизация",v:"Zoom Air"},{n:"Верх",v:"Flyknit"},{n:"Вес",v:"280 г"}]},
  "protein-on": {id:"SPRT-005",name:"Протеин Optimum Nutrition",enName:"Optimum Nutrition Protein",price:4990,img:"https://pixinlink.ru/api/v1/600x450/protein-powder",desc:"Optimum Nutrition — 2.27 кг, 24 г белка на 30 г.",specs:[{n:"Вес",v:"2.27 кг"},{n:"Белок",v:"24 г / 30 г"},{n:"Вкус",v:"Шоколад"}]},
  "garmin-venu": {id:"SPRT-006",name:"Фитнес-браслет Garmin Venu 3",enName:"Garmin Venu 3",price:35990,img:"https://pixinlink.ru/api/v1/600x450/fitness-watch",desc:"Garmin Venu 3 — GPS, AMOLED 1.4\", Body Battery.",specs:[{n:"Дисплей",v:"AMOLED 1.4\""},{n:"GPS",v:"Многочастотный"},{n:"Автономность",v:"14 дней"}]},
  "svetocopy-paper": {id:"OFFC-001",name:"Бумага SvetoCopy A4",enName:"SvetoCopy A4 Paper",price:1890,img:"https://pixinlink.ru/api/v1/600x450/paper",desc:"SvetoCopy A4 — 5 пачек × 500 листов, 80 г/м².",specs:[{n:"Формат",v:"A4"},{n:"Плотность",v:"80 г/м²"},{n:"Класс",v:"A+"}]},
  "parker-jotter": {id:"OFFC-002",name:"Ручка Parker Jotter",enName:"Parker Jotter Pen",price:2490,img:"https://pixinlink.ru/api/v1/600x450/pen-parker",desc:"Parker Jotter — нержавеющая сталь, синие чернила.",specs:[{n:"Материал",v:"Нержавеющая сталь"},{n:"Чернила",v:"Синие"}]},
  "desk-organizer": {id:"OFFC-003",name:"Органайзер настольный",enName:"Desk Organizer",price:1490,img:"https://pixinlink.ru/api/v1/600x450/desk-organizer",desc:"Органайзер — бамбук, 4 отделения, вращение 360°.",specs:[{n:"Материал",v:"Бамбук"},{n:"Отделений",v:"4"},{n:"Вращение",v:"360°"}]},
  "hp-laserjet": {id:"OFFC-004",name:"Принтер HP LaserJet M234",enName:"HP LaserJet M234",price:14990,img:"https://pixinlink.ru/api/v1/600x450/laser-printer",desc:"HP LaserJet M234 — монохромный, 29 стр/мин, Wi-Fi.",specs:[{n:"Тип",v:"Лазерный монохромный"},{n:"Скорость",v:"29 стр/мин"},{n:"Дуплекс",v:"Авто"}]},
  "epson-projector": {id:"OFFC-005",name:"Проектор Epson EB-X51",enName:"Epson EB-X51 Projector",price:54990,img:"https://pixinlink.ru/api/v1/600x450/projector",desc:"Epson EB-X51 — 3800 люмен, XGA, 16000:1.",specs:[{n:"Яркость",v:"3800 люмен"},{n:"Разрешение",v:"XGA 1024×768"},{n:"Контраст",v:"16000:1"}]},
  "rexel-shredder": {id:"OFFC-006",name:"Шредер Rexel Auto+ 100X",enName:"Rexel Auto+ 100X Shredder",price:12990,img:"https://pixinlink.ru/api/v1/600x450/shredder",desc:"Rexel Auto+ 100X — автоподача 100 л., P-4.",specs:[{n:"Автоподача",v:"100 листов"},{n:"Фрагменты",v:"4×40 мм"},{n:"Уровень",v:"P-4"}]},
};

const productSlugs = [
  ["galaxy-s25-ultra","macbook-air-m4","ipad-pro-m4","airpods-pro-3","watch-ultra-2","power-bank-20000"],
  ["lg-side-by-side","bosch-washing","xiaomi-x10","samsung-microwave","electrolux-stove","bosch-dishwasher"],
  ["sofa-milan","table-loft","ergo-chair","wardrobe-premium","bed-oslo","dresser-scandi"],
  ["kettler-tr1","trek-bike","salomon-tent","nike-zoom","protein-on","garmin-venu"],
  ["svetocopy-paper","parker-jotter","desk-organizer","hp-laserjet","epson-projector","rexel-shredder"],
];

export function buildPageMeta(articles, sitePages, cfg) {
  const { siteUrl, siteName, siteDescription, defaultImage, bcHome, bcBlog, isRu, alternateUrl } = cfg;
  const pageMeta = [];

  pageMeta.push({
    route: "/",
    data: {
      title: siteName, description: siteDescription, canonical: siteUrl + "/", type: "website", image: defaultImage,
      jsonLd: { "@context": "https://schema.org", "@type": "WebSite", name: siteName, description: siteDescription, url: siteUrl },
    },
  });

  pageMeta.push({
    route: "/blog/",
    data: {
      title: "Blog", description: `Articles from ${siteName}`, canonical: siteUrl + "/blog/", type: "website", image: defaultImage,
      jsonLd: { "@context": "https://schema.org", "@type": "WebSite", name: siteName, description: siteDescription, url: siteUrl },
    },
  });

  const totalBlogPages = Math.ceil(articles.length / 5);
  for (let p = 2; p <= totalBlogPages; p++) {
    pageMeta.push({
      route: `/blog/page/${p}/`,
      data: {
        title: `Blog - Page ${p}`, description: `Articles from ${siteName} (page ${p})`, canonical: `${siteUrl}/blog/`, type: "website", image: defaultImage,
        jsonLd: { "@context": "https://schema.org", "@type": "WebSite", name: siteName, description: siteDescription, url: siteUrl },
      },
    });
  }

  for (const article of articles) {
    const slug = article.frontmatter.slug;
    const image = article.frontmatter.cover_image || defaultImage;
    const canonical = `${siteUrl}/blog/${slug}/`;
    pageMeta.push({
      route: `/blog/${slug}/`,
      data: {
        title: article.frontmatter.title, description: article.frontmatter.description, canonical, type: "article", image,
        publishedTime: article.frontmatter.date, modifiedTime: article.frontmatter.updated || article.frontmatter.date,
        tags: article.frontmatter.tags || [],
        jsonLd: [
          { "@context": "https://schema.org", "@type": article.frontmatter.schema_type || "Article", headline: article.frontmatter.title, description: article.frontmatter.description, datePublished: article.frontmatter.date, dateModified: article.frontmatter.updated || article.frontmatter.date, author: { "@type": "Person", name: article.frontmatter.author }, image, mainEntityOfPage: canonical, keywords: (article.frontmatter.tags || []).join(", ") },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: buildBreadcrumbList(article, siteUrl, bcHome, bcBlog) },
        ],
      },
    });
  }

  for (const p of sitePages) {
    const slug = p.frontmatter.slug;
    const canonical = `${siteUrl}/${slug}/`;
    pageMeta.push({
      route: `/${slug}/`,
      data: {
        title: p.frontmatter.title, description: p.frontmatter.description, canonical, type: "website", image: defaultImage,
        jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: p.frontmatter.title, description: p.frontmatter.description, url: canonical },
      },
    });
  }

  const categorySet = new Set();
  for (const article of articles) {
    const cat = article.frontmatter.category;
    const catSlug = slugify(cat);
    if (!categorySet.has(catSlug)) {
      categorySet.add(catSlug);
      const canonical = `${siteUrl}/category/${catSlug}/`;
      pageMeta.push({
        route: `/category/${catSlug}/`,
        data: {
          title: cat, description: `Articles in category "${cat}" from ${siteName}`, canonical, type: "website", image: defaultImage,
          jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: `Category: ${cat}`, description: `Articles in category "${cat}"`, url: canonical },
        },
      });
    }
  }

  const tagSet = new Set();
  for (const article of articles) {
    for (const tag of (article.frontmatter.tags || [])) {
      const tagSlug = slugify(tag);
      if (!tagSet.has(tagSlug)) {
        tagSet.add(tagSlug);
        const canonical = `${siteUrl}/tag/${tagSlug}/`;
        pageMeta.push({
          route: `/tag/${tagSlug}/`,
          data: {
            title: `#${tag}`, description: `Articles tagged "${tag}" from ${siteName}`, canonical, type: "website", image: defaultImage,
            jsonLd: { "@context": "https://schema.org", "@type": "CollectionPage", name: `Tag: ${tag}`, description: `Articles tagged "${tag}"`, url: canonical },
          },
        });
      }
    }
  }

  pageMeta.push({
    route: "/templates/",
    data: {
      title: "Templates", description: `Premium themes and prompt templates for ${siteName}`, canonical: siteUrl + "/templates/", type: "website", image: defaultImage,
      jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: "Templates", description: `Premium themes for ${siteName}`, url: siteUrl + "/templates/" },
    },
  });

  pageMeta.push({
    route: "/shop/",
    data: {
      title: isRu ? "Демо магазин" : "Demo Shop",
      description: isRu ? `Демонстрационный магазин ${siteName}. 5 разделов с товарами, карточки продуктов, корзина и оплата.` : `${siteName} demo shop. 5 sections with products, product cards, cart and payment.`,
      canonical: siteUrl + "/shop/", type: "website", image: defaultImage,
      jsonLd: { "@context": "https://schema.org", "@type": "WebPage", name: isRu ? "Демо магазин" : "Demo Shop", url: siteUrl + "/shop/" },
    },
  });

  const shopSections = isRu ? [
    { route: "/shop/shop-section-1/", title: "Демо раздел товара 1", desc: "Электроника и гаджеты: смартфоны, ноутбуки, планшеты, аксессуары." },
    { route: "/shop/shop-section-2/", title: "Демо раздел товара 2", desc: "Бытовая техника: холодильники, стиральные машины, пылесосы." },
    { route: "/shop/shop-section-3/", title: "Демо раздел товара 3", desc: "Мебель и интерьер: диваны, столы, стулья, шкафы." },
    { route: "/shop/shop-section-4/", title: "Демо раздел товара 4", desc: "Спорт и отдых: тренажёры, велосипеды, снаряжение." },
    { route: "/shop/shop-section-5/", title: "Демо раздел товара 5", desc: "Канцтовары и офис: бумага, ручки, принтеры." },
  ] : [
    { route: "/shop/shop-section-1/", title: "Electronics", desc: "Smartphones, laptops, tablets, accessories." },
    { route: "/shop/shop-section-2/", title: "Home Appliances", desc: "Refrigerators, washing machines, vacuums." },
    { route: "/shop/shop-section-3/", title: "Furniture", desc: "Sofas, tables, chairs, wardrobes." },
    { route: "/shop/shop-section-4/", title: "Sports & Outdoors", desc: "Treadmills, bicycles, gear." },
    { route: "/shop/shop-section-5/", title: "Stationery & Office", desc: "Paper, pens, organizers, printers." },
  ];
  for (const ss of shopSections) {
    pageMeta.push({
      route: ss.route,
      data: {
        title: ss.title, description: ss.desc, canonical: siteUrl + ss.route, type: "website", image: defaultImage,
        jsonLd: [
          { "@context": "https://schema.org", "@type": "WebPage", name: ss.title, description: ss.desc, url: siteUrl + ss.route },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: "Демо магазин", item: siteUrl + "/shop/" }, { "@type": "ListItem", position: 3, name: ss.title }] },
        ],
      },
    });
  }

  const sectionLandings = isRu ? [
    { route: "/section-geo/", title: "GEO / AI-видимость", desc: "Generative Engine Optimization — оптимизация сайта для AI-поисковиков", slug: "section-geo" },
    { route: "/section-devops/", title: "DevOps / Деплой", desc: "Полный цикл развёртывания статического сайта: VPS, nginx, CI/CD", slug: "section-devops" },
    { route: "/section-content/", title: "Контент / Markdown", desc: "Создание и управление контентом: Markdown, YAML Frontmatter, AI-генерация", slug: "section-content" },
  ] : [
    { route: "/section-geo/", title: "GEO / AI Visibility", desc: "Generative Engine Optimization — optimizing your site for AI search engines", slug: "section-geo" },
    { route: "/section-devops/", title: "DevOps / Deploy", desc: "Complete static site deployment cycle: VPS, nginx, CI/CD", slug: "section-devops" },
    { route: "/section-content/", title: "Content / Markdown", desc: "Content creation and management: Markdown, YAML Frontmatter, AI generation", slug: "section-content" },
  ];
  for (const sl of sectionLandings) {
    pageMeta.push({
      route: sl.route,
      data: {
        title: sl.title, description: sl.desc, canonical: siteUrl + sl.route, type: "website", image: defaultImage,
        jsonLd: [
          { "@context": "https://schema.org", "@type": "WebPage", name: sl.title, description: sl.desc, url: siteUrl + sl.route },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: sl.title }] },
        ],
      },
    });
  }

  const sectionArticles = isRu ? [
    { route: "/section-geo/geo-rukovodstvo/", title: "GEO-руководство", desc: "Как статические сайты попадают в ответы ChatGPT", parent: "section-geo", parentName: "GEO / AI-видимость" },
    { route: "/section-geo/json-ld-gajd/", title: "JSON-LD микроразметка", desc: "Полный гайд по 10 типам Schema.org", parent: "section-geo", parentName: "GEO / AI-видимость" },
    { route: "/section-geo/e-e-a-t-signaly/", title: "E-E-A-T сигналы", desc: "Как AI проверяет авторитетность", parent: "section-geo", parentName: "GEO / AI-видимость" },
    { route: "/section-geo/featured-snippets/", title: "Featured Snippets", desc: "Структура прямых ответов для AI", parent: "section-geo", parentName: "GEO / AI-видимость" },
    { route: "/section-geo/seo-vs-geo/", title: "SEO vs GEO", desc: "Почему классическое SEO теряет аудиторию", parent: "section-geo", parentName: "GEO / AI-видимость" },
    { route: "/section-devops/deploj-obzor/", title: "Деплой-обзор", desc: "От git push до production за 2 минуты", parent: "section-devops", parentName: "DevOps / Деплой" },
    { route: "/section-devops/vps-i-nginx/", title: "VPS и nginx", desc: "Выбор, настройка, оптимизация", parent: "section-devops", parentName: "DevOps / Деплой" },
    { route: "/section-devops/github-actions/", title: "GitHub Actions CI/CD", desc: "Автоматический деплой с 368 тестами", parent: "section-devops", parentName: "DevOps / Деплой" },
    { route: "/section-devops/bezopasnost/", title: "Безопасность", desc: "98× меньше атак чем WordPress", parent: "section-devops", parentName: "DevOps / Деплой" },
    { route: "/section-devops/monitoring/", title: "Мониторинг", desc: "Health-check, sitemap, JSON-LD", parent: "section-devops", parentName: "DevOps / Деплой" },
    { route: "/section-content/markdown-obzor/", title: "Markdown-обзор", desc: "Текстовый формат для AI-краулеров", parent: "section-content", parentName: "Контент / Markdown" },
    { route: "/section-content/yaml-frontmatter/", title: "YAML Frontmatter", desc: "Полный справочник полей", parent: "section-content", parentName: "Контент / Markdown" },
    { route: "/section-content/prompt-shablony/", title: "Промпт-шаблоны", desc: "45+ шаблонов для AI-генерации", parent: "section-content", parentName: "Контент / Markdown" },
    { route: "/section-content/ai-kontent/", title: "AI-контент", desc: "7 этапов + дебат агентов", parent: "section-content", parentName: "Контент / Markdown" },
    { route: "/section-content/migracija-s-wordpress/", title: "Миграция с WordPress", desc: "Пошаговый гайд и кейс", parent: "section-content", parentName: "Контент / Markdown" },
  ] : [
    { route: "/section-geo/geo-rukovodstvo/", title: "GEO Guide", desc: "How static sites appear in ChatGPT answers", parent: "section-geo", parentName: "GEO / AI Visibility" },
    { route: "/section-geo/json-ld-gajd/", title: "JSON-LD Guide", desc: "Complete guide to 10 Schema.org types", parent: "section-geo", parentName: "GEO / AI Visibility" },
    { route: "/section-geo/e-e-a-t-signaly/", title: "E-E-A-T Signals", desc: "How AI verifies content authority", parent: "section-geo", parentName: "GEO / AI Visibility" },
    { route: "/section-geo/featured-snippets/", title: "Featured Snippets", desc: "Direct answer structure for AI", parent: "section-geo", parentName: "GEO / AI Visibility" },
    { route: "/section-geo/seo-vs-geo/", title: "SEO vs GEO", desc: "Why classic SEO is losing audience", parent: "section-geo", parentName: "GEO / AI Visibility" },
    { route: "/section-devops/deploj-obzor/", title: "Deploy Overview", desc: "From git push to production in 2 minutes", parent: "section-devops", parentName: "DevOps / Deploy" },
    { route: "/section-devops/vps-i-nginx/", title: "VPS and nginx", desc: "Selection, setup, optimization", parent: "section-devops", parentName: "DevOps / Deploy" },
    { route: "/section-devops/github-actions/", title: "GitHub Actions CI/CD", desc: "Automatic deploy with 368 tests", parent: "section-devops", parentName: "DevOps / Deploy" },
    { route: "/section-devops/bezopasnost/", title: "Security", desc: "98× fewer attacks than WordPress", parent: "section-devops", parentName: "DevOps / Deploy" },
    { route: "/section-devops/monitoring/", title: "Monitoring", desc: "Health-check, sitemap, JSON-LD", parent: "section-devops", parentName: "DevOps / Deploy" },
    { route: "/section-content/markdown-obzor/", title: "Markdown Overview", desc: "Text format for AI crawlers", parent: "section-content", parentName: "Content / Markdown" },
    { route: "/section-content/yaml-frontmatter/", title: "YAML Frontmatter", desc: "Complete field reference", parent: "section-content", parentName: "Content / Markdown" },
    { route: "/section-content/prompt-shablony/", title: "Prompt Templates", desc: "45+ templates for AI generation", parent: "section-content", parentName: "Content / Markdown" },
    { route: "/section-content/ai-kontent/", title: "AI Content", desc: "7 stages + agent debate", parent: "section-content", parentName: "Content / Markdown" },
    { route: "/section-content/migracija-s-wordpress/", title: "WordPress Migration", desc: "Step-by-step guide and case study", parent: "section-content", parentName: "Content / Markdown" },
  ];
  for (const sa of sectionArticles) {
    const parentRoute = `/${sa.parent}/`;
    pageMeta.push({
      route: sa.route,
      data: {
        title: sa.title, description: sa.desc, canonical: siteUrl + sa.route, type: "article", image: defaultImage,
        jsonLd: [
          { "@context": "https://schema.org", "@type": "Article", headline: sa.title, description: sa.desc, mainEntityOfPage: siteUrl + sa.route, author: { "@type": "Person", name: "GitHub CMS Team" }, datePublished: "2026-05-11", inLanguage: "ru" },
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: sa.parentName, item: siteUrl + parentRoute }, { "@type": "ListItem", position: 3, name: sa.title }] },
        ],
      },
    });
  }

  for (let si = 0; si < shopSections.length; si++) {
    const ss = shopSections[si];
    const slugs = productSlugs[si] || [];
    for (const slug of slugs) {
      const route = `/shop/${ss.route.replace(/\/$/, "").split("/").pop()}/${slug}/`;
      const p = productData[slug];
      const title = p ? (isRu ? p.name : (p.enName || p.name)) : (isRu ? "Товар" : "Product");
      const desc = p ? p.desc : ss.desc;
      const jsonLd = p
        ? buildProductSchema(p)
        : [{ "@context": "https://schema.org", "@type": "WebPage", url: siteUrl + route }];
      const shopParentName = isRu ? "Демо магазин" : "Demo Shop";
      jsonLd.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: bcHome, item: siteUrl + "/" }, { "@type": "ListItem", position: 2, name: shopParentName, item: siteUrl + "/shop/" }, { "@type": "ListItem", position: 3, name: ss.title, item: siteUrl + ss.route }, { "@type": "ListItem", position: 4, name: title }] });
      pageMeta.push({ route, data: { title, description: desc, canonical: siteUrl + route, type: "website", image: defaultImage, jsonLd } });
    }
  }

  return pageMeta;
}

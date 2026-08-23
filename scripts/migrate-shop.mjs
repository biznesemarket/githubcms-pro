import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const contentDir = join(root, "content");

// Read products.ts and extract product data
const productsTs = readFileSync(join(root, "src", "content", "products.ts"), "utf8");
const productEnTs = readFileSync(join(root, "src", "content", "product-en.ts"), "utf8");

// Parse products from the p() function calls — count parentheses to find matches
function parseProducts() {
  const results = [];
  let i = 0;
  while (i < productsTs.length) {
    // Find next p( call
    const pIdx = productsTs.indexOf("p(", i);
    if (pIdx === -1) break;
    
    // Check it's a function call (preceded by whitespace/comma/newline, not part of a word)
    // Skip function definition p( — it has "function " before it
    if (pIdx > 8 && productsTs.slice(pIdx - 9, pIdx).trimEnd().endsWith("function")) {
      i = pIdx + 2;
      continue;
    }

    // Find matching closing paren
    let depth = 1;
    let j = pIdx + 2;
    let inString = false;
    let stringChar = "";
    while (j < productsTs.length && depth > 0) {
      const ch = productsTs[j];
      if (inString) {
        if (ch === "\\") { j += 2; continue; }
        if (ch === stringChar) inString = false;
      } else if (ch === "'" || ch === '"' || ch === "`") {
        inString = true;
        stringChar = ch;
      } else if (ch === "(") {
        depth++;
      } else if (ch === ")") {
        depth--;
      }
      j++;
    }

    if (depth === 0) {
      const call = productsTs.slice(pIdx + 2, j - 1);
      const args = parsePArgs(call);
      if (args) results.push(args);
    }
    i = j;
  }
  return results;
}

function parsePArgs(call) {
  // Simple state-machine parser for p() function arguments
  let i = 0;
  const args = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let stringChar = "";

function commit() {
    const trimmed = current.trim();
    current = "";
    if (trimmed) {
      try { args.push(JSON.parse(trimmed)); return; } catch {}
      // Try JS object/array syntax (unquoted keys, trailing commas)
      if (/^[\[{]/.test(trimmed)) {
        try { args.push((new Function(`return ${trimmed}`))()); return; } catch {}
      }
      if (/^\d+$/.test(trimmed)) { args.push(Number(trimmed)); return; }
      if (/^['"`]/.test(trimmed)) {
        const unquoted = trimmed.slice(1, -1);
        try { args.push(JSON.parse(unquoted)); return; } catch {}
        args.push(unquoted);
        return;
      }
      args.push(trimmed);
    }
  }

  while (i < call.length) {
    const ch = call[i];
    if (inString) {
      if (ch === "\\") { current += ch + call[i + 1]; i += 2; continue; }
      if (ch === stringChar) { inString = false; current += ch; }
      else current += ch;
    } else if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      stringChar = ch;
      current += ch;
    } else if (ch === "[" || ch === "{") {
      depth++;
      current += ch;
    } else if (ch === "]" || ch === "}") {
      depth--;
      current += ch;
    } else if (ch === "," && depth === 0) {
    commit();
  } else {
      current += ch;
    }
    i++;
  }
  commit();

  if (args.length < 17) return null;
  return {
    id: args[0],
    slug: args[1],
    name: args[2],
    sectionId: args[3],
    sectionSlug: args[4],
    sectionTitle: args[5],
    templateStyle: args[6],
    price: args[7],
    img: args[8],
    desc: args[9],
    ldesc: args[10],
    cat: args[11],
    tags: Array.isArray(args[12]) ? args[12] : [],
    specs: Array.isArray(args[13]) ? args[13].map(s => ({ n: s.n, v: s.v })) : [],
    bens: Array.isArray(args[14]) ? args[14].map(b => ({ icon: b.icon, title: b.title, d: b.d })) : [],
    htu: Array.isArray(args[15]) ? args[15].map(h => ({ s: h.s, t: h.t, d: h.d })) : [],
    faq: Array.isArray(args[16]) ? args[16].map(f => ({ q: f.q, a: f.a })) : [],
    revs: Array.isArray(args[17]) ? args[17].map(r => ({ author: r.author, r: r.r, text: r.text, date: r.date })) : [],
  };
}

// Parse EN translations
function parseProductEn() {
  const startIdx = productEnTs.indexOf("export const productEn");
  if (startIdx === -1) return {};
  const eqIdx = productEnTs.indexOf("=", startIdx);
  if (eqIdx === -1) return {};
  
  // Find the object literal — track braces
  let i = eqIdx + 1;
  while (i < productEnTs.length && productEnTs[i] !== "{") i++;
  let depth = 1;
  let j = i + 1;
  let inString = false;
  let stringChar = "";
  while (j < productEnTs.length && depth > 0) {
    const ch = productEnTs[j];
    if (inString) {
      if (ch === "\\") { j += 2; continue; }
      if (ch === stringChar) inString = false;
    } else if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      stringChar = ch;
    } else if (ch === "{") {
      depth++;
    } else if (ch === "}") {
      depth--;
    }
    j++;
  }

  if (depth !== 0) return {};
  
  const objStr = productEnTs.slice(i, j);
  try {
    return new Function(`return ${objStr}`)();
  } catch (e) {
    console.log("EN parse failed:", e.message.substring(0, 80));
    return {};
  }
}

function yamlValue(v, indent = 0) {
  const pad = "  ".repeat(indent);
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "[]";
    if (typeof v[0] === "string") return JSON.stringify(v);
    return v.map(item => {
      if (typeof item === "object" && item !== null) {
        const lines = Object.entries(item).map(([k, val]) => {
          if (typeof val === "string") return `${pad}  ${k}: ${JSON.stringify(val)}`;
          if (typeof val === "number") return `${pad}  ${k}: ${val}`;
          return `${pad}  ${k}: ${JSON.stringify(val)}`;
        });
        return `${pad}- ${lines.join("\n").trimStart()}`;
      }
      return `${pad}- ${JSON.stringify(item)}`;
    }).join("\n");
  }
  return JSON.stringify(v);
}

function generateMd(product, en, locale) {
  const isRu = locale === "ru";
  const enData = en[product.slug] || {};

  const sectionTitles = {
    "shop-section-1": isRu ? "Электроника и гаджеты" : "Electronics & Gadgets",
    "shop-section-2": isRu ? "Бытовая техника" : "Home Appliances",
    "shop-section-3": isRu ? "Мебель и интерьер" : "Furniture & Interior",
    "shop-section-4": isRu ? "Спорт и отдых" : "Sports & Outdoors",
    "shop-section-5": isRu ? "Канцтовары и офис" : "Stationery & Office",
  };

  const name = isRu ? product.name : (enData.name || product.name);
  const desc = isRu ? product.desc : (enData.desc || product.desc);
  const ldesc = isRu ? product.ldesc : (enData.ldesc || product.ldesc);

  let fm = "---\n";
  fm += `title: ${JSON.stringify(name)}\n`;
  fm += `description: ${JSON.stringify(desc)}\n`;
  fm += `slug: "${product.slug}"\n`;
  fm += `section: "${product.sectionSlug}"\n`;
  fm += `section_title: ${JSON.stringify(sectionTitles[product.sectionSlug] || "")}\n`;
  fm += `price: ${product.price}\n`;
  fm += `image: "${product.img}"\n`;
  fm += `category: ${JSON.stringify(isRu ? product.cat : (product.cat).replace(/[а-яё]/g,''))}\n`;
  fm += `tags: ${JSON.stringify(product.tags)}\n`;
  fm += `template_style: ${product.templateStyle}\n`;
  fm += `layout: "product"\n`;
  fm += `schema_type: "Product"\n`;
  fm += `author: "GitHub CMS Team"\n`;
  fm += `date: "2026-05-25"\n`;

  // Specs
  const sp = isRu ? product.specs : (enData.specs || product.specs);
  if (sp.length > 0) {
    fm += "specs:\n";
    sp.forEach(s => fm += `  - n: ${JSON.stringify(s.n)}\n    v: ${JSON.stringify(s.v)}\n`);
  }

  // Benefits
  const bens = isRu ? product.bens : (enData.bens || product.bens);
  if (bens && bens.length > 0) {
    fm += "benefits:\n";
    bens.forEach(b => fm += `  - icon: ${JSON.stringify(b.icon)}\n    title: ${JSON.stringify(b.title)}\n    d: ${JSON.stringify(b.d)}\n`);
  }

  // How-to
  const htu = isRu ? product.htu : (enData.htu || product.htu);
  if (htu && htu.length > 0) {
    fm += "howto:\n";
    htu.forEach(h => fm += `  - s: ${h.s}\n    t: ${JSON.stringify(h.t)}\n    d: ${JSON.stringify(h.d)}\n`);
  }

  // FAQ
  const faq = isRu ? product.faq : (enData.faq || product.faq);
  if (faq && faq.length > 0) {
    fm += "faq:\n";
    faq.forEach(f => fm += `  - q: ${JSON.stringify(f.q)}\n    a: ${JSON.stringify(f.a)}\n`);
  }

  // Reviews
  const revs = isRu ? product.revs : (enData.revs || []);
  const revMapped = isRu ? revs : (enData.revs ? enData.revs.map(r => ({ author: r.a, r: r.r, text: r.t, date: r.d })) : []);
  if (revMapped && revMapped.length > 0) {
    fm += "reviews:\n";
    revMapped.forEach(r => fm += `  - author: ${JSON.stringify(r.author)}\n    rating: ${r.r}\n    text: ${JSON.stringify(r.text)}\n    date: ${JSON.stringify(r.date)}\n`);
  }

  fm += "---\n\n";
  fm += ldesc + "\n";

  return fm;
}

// Generate section index pages
function generateSectionIndex(sectionSlug, sectionTitle, sectionDesc, locale) {
  const isRu = locale === "ru";
  let fm = "---\n";
  fm += `title: ${JSON.stringify(isRu ? "Категория: " + sectionTitle : "Category: " + sectionTitle)}\n`;
  fm += `description: ${JSON.stringify(sectionDesc)}\n`;
  fm += `slug: "${sectionSlug}"\n`;
  fm += `section: "shop"\n`;
  fm += `layout: "section"\n`;
  fm += `schema_type: "WebPage"\n`;
  fm += `author: "GitHub CMS Team"\n`;
  fm += `date: "2026-05-25"\n`;
  fm += "---\n\n";
  fm += sectionDesc + "\n";
  return fm;
}

// Generate shop main index
function generateShopIndex(locale) {
  const isRu = locale === "ru";
  let fm = "---\n";
  fm += `title: ${JSON.stringify(isRu ? "Магазин" : "Shop")}\n`;
  fm += `description: ${JSON.stringify(isRu ? "Демо-магазин — 5 категорий, 30 товаров" : "Demo Shop — 5 categories, 30 products")}\n`;
  fm += `slug: "shop"\n`;
  fm += `section: "shop"\n`;
  fm += `layout: "shop"\n`;
  fm += `schema_type: "WebPage"\n`;
  fm += `author: "GitHub CMS Team"\n`;
  fm += `date: "2026-05-25"\n`;
  fm += "---\n\n";
  fm += (isRu ? "Демонстрационный магазин с 5 категориями и 30 товарами." : "Demo shop with 5 categories and 30 products.") + "\n";
  return fm;
}

// MAIN
console.log("Parsing products...");
const products = parseProducts();
console.log(`Parsed ${products.length} products`);

console.log("Parsing EN translations...");
const productEn = parseProductEn();
console.log(`Parsed ${Object.keys(productEn).length} EN entries`);

const sectionDescs = {
  "shop-section-1": { ru: "Электроника, смартфоны, ноутбуки, гаджеты", en: "Electronics, smartphones, laptops, gadgets" },
  "shop-section-2": { ru: "Бытовая техника для дома", en: "Home appliances" },
  "shop-section-3": { ru: "Мебель для дома и офиса", en: "Furniture for home and office" },
  "shop-section-4": { ru: "Спорт, фитнес, активный отдых", en: "Sports, fitness, outdoor" },
  "shop-section-5": { ru: "Канцтовары и офисная техника", en: "Stationery and office equipment" },
};

const sections = Array.from(new Set(products.map(p => p.sectionSlug)));

for (const locale of ["ru", "en"]) {
  const dir = join(contentDir, locale, "shop");
  mkdirSync(dir, { recursive: true });

  // Shop index
  writeFileSync(join(dir, "index.md"), generateShopIndex(locale), "utf8");
  console.log(`  ${locale}/shop/index.md`);

  for (const sec of sections) {
    const secDir = join(dir, sec);
    mkdirSync(secDir, { recursive: true });

    // Section index
    const secTitle = locale === "ru"
      ? products.find(p => p.sectionSlug === sec)?.sectionTitle || sec
      : sectionDescs[sec]?.en || sec;
    const secDesc = sectionDescs[sec]?.[locale] || sec;
    writeFileSync(join(secDir, "index.md"), generateSectionIndex(sec, secTitle, secDesc, locale), "utf8");

    // Products
    const secProducts = products.filter(p => p.sectionSlug === sec);
    for (const p of secProducts) {
      const md = generateMd(p, productEn, locale);
      writeFileSync(join(secDir, `${p.slug}.md`), md, "utf8");
      console.log(`  ${locale}/shop/${sec}/${p.slug}.md`);
    }
  }
}

console.log("\nDone! Created content files for shop.");

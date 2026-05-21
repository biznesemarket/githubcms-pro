import { readFileSync } from "node:fs";

let ok = 0;
let fail = 0;

function check(label, condition) { if (condition) { console.log("✅ " + label); ok++; } else { console.log("❌ " + label); fail++; } }

// ─── Section article page ───
const article = readFileSync("dist/section-geo/json-ld-gajd/index.html", "utf8");

const titleMatch = article.match(/<title>([^<]+)<\/title>/);
check("Section article title is not duplicated", titleMatch && (titleMatch[1].match(/\| GitHub CMS/g) || []).length === 1);

const canonicalMatch = article.match(/<link rel="canonical" href="([^"]+)"/);
check("Section article canonical uses section-geo", canonicalMatch && canonicalMatch[1].includes("/section-geo/"));

// Parse JSON-LD
const scripts = [...article.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
const allLd = scripts.flatMap(m => { try { const ld = JSON.parse(m[1]); return Array.isArray(ld) ? ld : [ld]; } catch { return []; } });

const types = allLd.map(x => x["@type"]).filter(Boolean);
check("Has Article", types.includes("Article"));
check("Has BreadcrumbList", types.includes("BreadcrumbList"));
check("Has FAQPage (if faq content exists)", types.some(t => t === "FAQPage"));

// Check breadcrumb positions
const bc = allLd.find(x => x["@type"] === "BreadcrumbList");
if (bc) {
  const positions = bc.itemListElement.map(x => x.position);
  check("Breadcrumb positions sequential", positions.join(",") === "1,2,3");
  check("Breadcrumb Home is first", bc.itemListElement[0].name === "Home" || bc.itemListElement[0].name === "Главная");
} else {
  fail++;
  console.log("❌ No BreadcrumbList found");
}

// ─── Product page ───
const product = readFileSync("dist/shop/shop-section-1/galaxy-s25-ultra/index.html", "utf8");
const productScripts = [...product.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
const productLd = productScripts.flatMap(m => { try { const ld = JSON.parse(m[1]); return Array.isArray(ld) ? ld : [ld]; } catch { return []; } });

const prodTypes = productLd.map(x => x["@type"]).filter(Boolean);
check("Product page has Product", prodTypes.includes("Product"));
check("Product page has Offer", productLd.some(x => x["@type"] === "Product" && x.offers?.["@type"] === "Offer"));
check("Product page has PropertyValue", prodTypes.includes("PropertyValue"));
check("Product page has AggregateRating", prodTypes.includes("AggregateRating"));
check("Product page has FAQPage", prodTypes.includes("FAQPage"));
check("Product page has BreadcrumbList", prodTypes.includes("BreadcrumbList"));

// ─── Homepage ───
const home = readFileSync("dist/index.html", "utf8");
const homeScripts = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
const homeLd = homeScripts.flatMap(m => { try { const ld = JSON.parse(m[1]); return Array.isArray(ld) ? ld : [ld]; } catch { return []; } });
const homeTypes = homeLd.map(x => x["@type"]).filter(Boolean);
check("Homepage has WebSite", homeTypes.includes("WebSite"));
check("Homepage has Organization", homeTypes.includes("Organization"));

// ─── Blog article ───
const blog = readFileSync("dist/blog/deploy-vps-nginx-ssl/index.html", "utf8");
const blogScripts = [...blog.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
const blogLd = blogScripts.flatMap(m => { try { const ld = JSON.parse(m[1]); return Array.isArray(ld) ? ld : [ld]; } catch { return []; } });
const blogTypes = blogLd.map(x => x["@type"]).filter(Boolean);
check("Blog article has content schema (Article or HowTo)", blogTypes.some(t => t === "Article" || t === "HowTo"));
check("Blog article has BreadcrumbList", blogTypes.includes("BreadcrumbList"));

console.log("\n🎯 " + ok + "/" + (ok + fail) + " checks passed");

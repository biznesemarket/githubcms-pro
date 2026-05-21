import { readFileSync } from "node:fs"

const files = [
  { path: "dist/index.html", name: "homepage" },
  { path: "dist/blog/deploy-vps-nginx-ssl/index.html", name: "blog" },
  { path: "dist/section-geo/json-ld-gajd/index.html", name: "section" },
  { path: "dist/about/index.html", name: "about" },
  { path: "dist/shop/shop-section-1/galaxy-s25-ultra/index.html", name: "product" },
  { path: "dist/templates/index.html", name: "templates" },
  { path: "dist/contact/index.html", name: "contact" },
]
const checks = { title: 0, desc: 0, canonical: 0, og_title: 0, og_desc: 0, twitter: 0 }
let issues = []

for (const { path, name } of files) {
  const c = readFileSync(path, "utf8")
  const t = c.match(/<title>([^<]+)<\/title>/)?.[1] || ""
  const d = c.match(/<meta name="description" content="([^"]+)"/)?.[1] || ""
  const ca = c.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || ""
  const ogt = c.match(/<meta property="og:title" content="([^"]+)"/)?.[1] || ""
  const ogd = c.match(/<meta property="og:description" content="([^"]+)"/)?.[1] || ""
  const tw = c.match(/<meta name="twitter:card"/)

  if (t) checks.title++; else issues.push(name + ": MISSING title")
  if (d) checks.desc++; else issues.push(name + ": MISSING description")
  if (ca) checks.canonical++; else issues.push(name + ": MISSING canonical")
  if (ogt) checks.og_title++; else issues.push(name + ": MISSING og:title")
  if (ogd) checks.og_desc++; else issues.push(name + ": MISSING og:description")
  if (tw) checks.twitter++; else issues.push(name + ": MISSING twitter:card")
  if (t.match(/\| GitHub CMS \| GitHub CMS/)) issues.push(name + ": DUPLICATE site name in title")
}

console.log("=== SEO Meta Tags ===")
console.log(`Title: ${checks.title}/${files.length}`)
console.log(`Description: ${checks.desc}/${files.length}`)
console.log(`Canonical: ${checks.canonical}/${files.length}`)
console.log(`og:title: ${checks.og_title}/${files.length}`)
console.log(`og:description: ${checks.og_desc}/${files.length}`)
console.log(`twitter:card: ${checks.twitter}/${files.length}`)
if (issues.length) { console.log("\nISSUES:"); issues.forEach(i => console.log("  - " + i)) }
else console.log("\nAll checks passed!")

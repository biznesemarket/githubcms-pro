import { readFileSync } from "node:fs";

const files = [
  "dist/section-geo/json-ld-gajd/index.html",
  "dist/shop/shop-section-1/galaxy-s25-ultra/index.html",
  "dist/index.html",
  "dist/blog/deploy-vps-nginx-ssl/index.html",
];

let passed = 0;
let failed = 0;

for (const file of files) {
  console.log("\n=== " + file.split("/").slice(-3).join("/") + " ===");
  const f = readFileSync(file, "utf8");

  // Count JSON-LD scripts
  const scripts = [...f.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  console.log("Scripts: " + scripts.length);

  let orgCount = 0;
  let orgTypes = [];

  for (const m of scripts) {
    try {
      const ld = JSON.parse(m[1]);
      const items = Array.isArray(ld) ? ld : [ld];
      for (const item of items) {
        if (item["@type"] === "Organization") { orgCount++; orgTypes.push(item["@type"]); }
      }
    } catch (e) { console.log("  PARSE ERROR: " + e.message.slice(0,40)); failed++; }
  }

  if (orgCount > 1) {
    console.log("  ❌ DUPLICATE Organization: " + orgCount + " copies");
    failed++;
  } else if (orgCount === 1) {
    console.log("  ✅ Organization: single");
    passed++;
  } else {
    console.log("  ⚠️  No Organization found");
  }
}

console.log("\n🎯 Passed: " + passed + " Failed: " + failed);

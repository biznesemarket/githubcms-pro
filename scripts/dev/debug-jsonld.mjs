import { readFileSync } from "node:fs";

function debug(file) {
  const f = readFileSync(file, "utf8");
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const scripts = [...f.matchAll(re)];
  console.log(file.split("/").slice(-3).join("/") + ": " + scripts.length + " scripts");

  for (let i = 0; i < scripts.length; i++) {
    const m = scripts[i];
    try {
      const ld = JSON.parse(m[1]);
      const items = Array.isArray(ld) ? ld : [ld];
      console.log("  [" + i + "] Types: " + items.map(x => x["@type"] || "no-type").join(", ") + " (" + items.length + " items, " + m[1].length + " chars)");
    } catch (e) {
      console.log("  [" + i + "] PARSE ERROR: " + e.message.slice(0, 80));
      console.log("  [" + i + "] Preview: " + m[1].slice(0, 150).replace(/\n/g, " "));
    }
  }
}

debug("dist/shop/shop-section-1/galaxy-s25-ultra/index.html");
console.log("");
debug("dist/section-geo/json-ld-gajd/index.html");

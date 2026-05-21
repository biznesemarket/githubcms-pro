import { readFileSync } from "node:fs";
const f = readFileSync("dist/blog/deploy-vps-nginx-ssl/index.html", "utf8");
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
const scripts = [...f.matchAll(re)];
console.log("Blog article scripts: " + scripts.length);
for (let i = 0; i < scripts.length; i++) {
  try {
    const ld = JSON.parse(scripts[i][1]);
    const items = Array.isArray(ld) ? ld : [ld];
    console.log("  [" + i + "] Types: " + items.map(x => x["@type"] || "no-type").join(", "));
  } catch(e) {
    console.log("  [" + i + "] Parse error: " + e.message.slice(0,60));
  }
}

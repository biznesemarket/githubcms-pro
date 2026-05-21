import { readFileSync } from "node:fs"

const files = [
  "dist/index.html",
  "dist/blog/deploy-vps-nginx-ssl/index.html",
  "dist/about/index.html",
  "dist/templates/index.html",
  "dist/contact/index.html",
  "dist/section-geo/index.html",
  "dist/shop/index.html",
]

for (const f of files) {
  const c = readFileSync(f, "utf8")
  const types = [...c.matchAll(/"@type":"(\w+)"/g)].map(m => m[1])
  const unique = [...new Set(types)]
  console.log(f.split("/").slice(-2).join("/").padEnd(40) + unique.join(", "))
}

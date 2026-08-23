import https from "node:https";
import { URL } from "node:url";

const SITES = [
  { name: "githubcms.ru", url: "https://githubcms.ru" },
  { name: "githubcms.com", url: "https://githubcms.com" },
  { name: "demofree.ru", url: "https://demofree.githubcms.ru" },
  { name: "demofree.com", url: "https://demofree.githubcms.com" },
  { name: "demopro.ru", url: "https://demopro.githubcms.ru" },
  { name: "demopro.com", url: "https://demopro.githubcms.com" },
];

function checkSite({ name, url }) {
  return new Promise((resolve) => {
    const req = https.request(
      url,
      { method: "HEAD", timeout: 15000, rejectUnauthorized: false },
      (res) => {
        res.resume();
        resolve({ name, url, status: res.statusCode, ok: res.statusCode === 200 });
      },
    );
    req.on("timeout", () => { req.destroy(); resolve({ name, url, status: 0, ok: false }); });
    req.on("error", () => resolve({ name, url, status: 0, ok: false }));
    req.end();
  });
}

console.log("=== GitHub CMS Health Check ===\n");

const results = await Promise.all(SITES.map(checkSite));
const allOk = results.every((r) => r.ok);

for (const r of results) {
  const marker = r.ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  console.log(`  ${marker} ${r.name.padEnd(16)} ${r.url.padEnd(36)} ${r.status}`);
}

const okCount = results.filter((r) => r.ok).length;
console.log(`\n${okCount}/${results.length} sites healthy`);

process.exit(allOk ? 0 : 1);

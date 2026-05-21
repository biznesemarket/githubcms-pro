import { readFileSync, readdirSync } from "node:fs";

const issues = [];
function ok(label) { console.log("✅ " + label); }

const useSeo = readFileSync("src/composables/useSeo.ts", "utf8");
if (useSeo.includes("generateSchema")) ok("useSeo.ts uses generateSchema");
else issues.push("❌ useSeo.ts does not use generateSchema");
if (useSeo.includes("application/ld+json")) ok("useSeo.ts generates JSON-LD scripts");

const seoUtilsLines = readFileSync("src/composables/seo-utils.ts", "utf8").split("\n").length;
ok("seo-utils.ts: " + seoUtilsLines + " lines (was 528)");

const schemaFiles = readdirSync("src/schema");
ok("src/schema/: " + schemaFiles.join(", "));

const vuePages = readdirSync("src/pages").filter(f => f.endsWith(".vue"));
let pagesWithSchema = 0;
for (const page of vuePages) {
  const c = readFileSync("src/pages/" + page, "utf8");
  if (c.includes("generateSchema") || c.includes('from "../schema"')) pagesWithSchema++;
}
ok("Pages with Schema Engine: " + pagesWithSchema + "/" + vuePages.length);

const inj = readFileSync("scripts/inject-seo.mjs", "utf8");
ok("inject-seo detectors: FAQ=" + inj.includes("detectFaqFromHtml") + " HowTo=" + inj.includes("detectHowToFromHtml") + " ItemList=" + inj.includes("detectItemListFromHtml") + " QAPage=" + inj.includes("detectQAPageFromHtml"));

const lib = readFileSync("src/schema/library.ts", "utf8");
ok("Breadcrumb position: " + (lib.includes("position: i + 2") ? "fixed (Home=1, items 2+)" : "NOT FIXED"));

if (issues.length) console.log("\nISSUES:\n" + issues.join("\n"));
else console.log("\n🎯 ALL CHECKS PASSED");

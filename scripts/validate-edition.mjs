import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const root = process.cwd();
const allowedEditions = new Set(["free", "pro"]);

function getArg(name, fallback = null) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function runNpm(label, npmArgs, env) {
  console.log(`\n==> ${label}`);
  const command = process.platform === "win32" ? (process.env.ComSpec || "cmd.exe") : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", ["npm", ...npmArgs].join(" ")]
    : npmArgs;
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    shell: false,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`${label} failed: ${result.error.message}`);
    process.exit(1);
  }

  if (result.signal) {
    console.error(`${label} stopped by signal ${result.signal}.`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`${label} failed with exit code ${result.status}.`);
    process.exit(result.status ?? 1);
  }
}

function assertPath(relativePath, expected) {
  const exists = existsSync(join(root, relativePath));
  if (exists !== expected) {
    const verb = expected ? "exist" : "be absent";
    throw new Error(`${relativePath} must ${verb} for ${edition} edition.`);
  }
}

function listFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

function assertDistDoesNotContain(markers) {
  const assetDir = join(root, "dist", "assets");
  const files = listFiles(assetDir).filter((file) => file.endsWith(".js") || file.endsWith(".css"));

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    for (const marker of markers) {
      if (source.includes(marker)) {
        throw new Error(`Free dist asset contains Pro marker '${marker}' in ${file}.`);
      }
    }
  }
}

function assertEditionOutput() {
  assertPath("dist/index.html", true);
  assertPath("dist/templates/index.html", true);
  assertPath("dist/templates/purple-geo-lite/index.html", true);

  if (edition === "free") {
    assertPath("dist/shop", false);
    assertPath("dist/account", false);
    assertPath("dist/payment", false);
    assertPath("dist/home/2", false);
    assertPath("dist/templates/purple-geo", false);
    assertPath("dist/templates/tech-azure", false);
    assertPath("dist/templates/page/2", false);
    assertDistDoesNotContain([
      "Purple GEO Pro",
      "Tech Azure",
      "ShopPage",
      "AccountPlan",
      "PaymentSuccess",
      "purple-geo-pro",
    ]);
  } else {
    assertPath("dist/shop/index.html", true);
    assertPath("dist/account/index.html", true);
    assertPath("dist/payment/success/index.html", true);
    assertPath("dist/home/2/index.html", true);
    assertPath("dist/templates/purple-geo/index.html", true);
    assertPath("dist/templates/tech-azure/index.html", true);
    assertPath("dist/templates/page/2/index.html", true);
  }

  console.log(`Edition output assertion passed for ${edition}.`);
}

const edition = getArg("--edition", process.env.VITE_EDITION || "free");
const buildOnly = hasFlag("--build-only");
const siteUrl = getArg("--site-url", process.env.VITE_SITE_URL || "https://preflight.githubcms.example");

if (!allowedEditions.has(edition)) {
  console.error(`Unsupported edition '${edition}'. Expected free or pro.`);
  process.exit(1);
}

const env = {
  ...process.env,
  VITE_EDITION: edition,
  VITE_SITE_URL: siteUrl,
};

console.log(`GitHub CMS edition validation: ${edition}`);
console.log(`VITE_SITE_URL: ${siteUrl}`);

try {
  if (!buildOnly) {
    runNpm("Validate build environment", ["run", "validate:deploy-env", "--", "--mode", "build"], env);
  }

  runNpm(`Build ${edition} edition`, ["run", "build"], env);
  assertEditionOutput();

  if (!buildOnly) {
    runNpm("Validate SEO files", ["run", "validate:seo-files", "--", "--dir", "dist"], env);
    runNpm("Scan dist for secret markers", ["run", "check:dist-secrets", "--", "--dir", "dist"], env);
    console.log(`\n${edition} edition validation passed.`);
  }
} catch (error) {
  console.error(`${edition} edition validation failed: ${error.message}`);
  process.exit(1);
}

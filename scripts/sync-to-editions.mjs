import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const CORE_REPO = "hubcms-dot/githubcms";
const TARGETS = [
  { name: "free", repo: "hubcms-dot/githubcms_free", branch: "main" },
  { name: "pro", repo: "hubcms-dot/githubcms_pro", branch: "main" },
];

const CORE_DIRS = ["src", "scripts", "public", "src/composables", "src/assets/themes"];

const TMP = join(process.cwd(), ".sync-tmp");

function run(cmd, cwd) {
  if (DRY_RUN) { console.log(`  [dry] ${cmd}`); return ""; }
  return execSync(cmd, { cwd, encoding: "utf8", stdio: "pipe" });
}

function syncTo(name, repo) {
  console.log(`\nSyncing to ${name} (${repo})...`);

  const targetDir = join(TMP, name);
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });

  if (DRY_RUN) {
    console.log("  [dry] Would clone and copy files");
    return;
  }

  run(`git clone --depth 1 git@github.com:${repo}.git ${name}`, TMP);
  const dir = join(TMP, name);

  for (const coreDir of CORE_DIRS) {
    const src = join(process.cwd(), coreDir);
    const dest = join(dir, coreDir);
    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    cpSync(src, dest, { recursive: true });
    console.log(`  Copied: ${coreDir}`);
  }

  const status = run("git status --porcelain", dir).trim();
  if (!status) { console.log("  No changes. Skipping commit."); return; }

  run("git add -A", dir);
  run(`git commit -m "sync: core update from ${CORE_REPO}"`, dir);
  run(`git push origin ${TARGETS.find(t => t.name === name)?.branch || "main"}`, dir);
  console.log(`  Pushed to ${repo}`);
}

console.log("GitHub CMS — Core Sync Script");
console.log(DRY_RUN ? "DRY RUN MODE" : "LIVE MODE");

for (const t of TARGETS) {
  try { syncTo(t.name, t.repo); }
  catch (e) { console.error(`  FAILED: ${e.message?.slice(0, 200)}`); }
}

rmSync(TMP, { recursive: true, force: true });
console.log("\nDone.");

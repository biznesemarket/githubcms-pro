import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const fixtureRoot = join(root, "node_modules", ".cache", "githubcms-template-cli-smoke");
const keepFixture = process.env.GITHUBCMS_KEEP_TEMPLATE_SMOKE === "1";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function rel(path) {
  return relative(root, path).replace(/\\/g, "/");
}

function copyRel(relativePath) {
  const source = join(root, relativePath);
  const target = join(fixtureRoot, relativePath);

  if (!existsSync(source)) {
    throw new Error(`Fixture source is missing: ${relativePath}`);
  }

  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
}

function runCli(name, script, args = []) {
  const result = spawnSync(process.execPath, [join(root, "scripts", script), ...args], {
    cwd: fixtureRoot,
    encoding: "utf8",
    shell: false,
  });

  return {
    name,
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
    error: result.error,
  };
}

function assertPass(result) {
  if (result.error || result.status !== 0) {
    throw new Error(
      `${result.name} failed with exit code ${result.status ?? "unknown"}\n${result.stderr}${result.stdout}`,
    );
  }
  console.log(`PASS ${result.name}`);
}

function assertFail(result, expectedText) {
  if (result.error || result.status === 0) {
    throw new Error(`${result.name} was expected to fail, but passed.`);
  }

  const output = `${result.stderr}\n${result.stdout}`;
  if (!output.includes(expectedText)) {
    throw new Error(`${result.name} failed without expected text '${expectedText}'.\n${output}`);
  }

  console.log(`PASS ${result.name}`);
}

function assertIncludes(name, text, expected) {
  if (!text.includes(expected)) {
    throw new Error(`${name}: expected output to include '${expected}'.`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function prepareFixture() {
  rmSync(fixtureRoot, { recursive: true, force: true });
  mkdirSync(fixtureRoot, { recursive: true });

  copyRel("templates");
  copyRel("src/assets/main.scss");

  const registry = readJson(join(root, "templates", "registry.json"));
  for (const entry of registry.templates || []) {
    const template = readJson(join(root, entry.path));
    const sources = [
      template.sourcePaths?.themeEntry,
      ...(template.sourcePaths?.prompts || []),
      template.sourcePaths?.geoBlocks,
      template.sourcePaths?.schemaMap,
    ].filter(Boolean);

    const promptPackPath = join(root, "templates", template.id, "prompts", "prompt-pack.json");
    if (existsSync(promptPackPath)) {
      const promptPack = readJson(promptPackPath);
      for (const prompt of promptPack.templates || []) {
        if (prompt.source) sources.push(prompt.source);
      }
    }

    for (const source of new Set(sources)) {
      copyRel(source);
    }
  }
}

try {
  prepareFixture();

  const list = runCli("template:list", "template-list.mjs");
  assertPass(list);
  assertIncludes("template:list", list.stdout, "purple-geo-lite");
  assertIncludes("template:list", list.stdout, "purple-geo-pro");

  const initialStatus = runCli("template:status --json without lock", "template-status.mjs", ["--json"]);
  assertPass(initialStatus);
  const initialPayload = JSON.parse(initialStatus.stdout);
  assert(initialPayload.lock.exists === false, "Initial fixture must not contain template lock.");
  assert(initialPayload.license.exists === false, "Initial fixture must not contain license file.");

  const dryRunInstall = runCli("template:install free dry-run", "template-install.mjs", [
    "--id",
    "purple-geo-lite",
    "--dry-run",
  ]);
  assertPass(dryRunInstall);
  assert(!existsSync(join(fixtureRoot, ".githubcms", "templates.lock.json")), "Dry-run must not create template lock.");

  const proWithoutLicense = runCli("template:install pro without license", "template-install.mjs", [
    "--id",
    "purple-geo-pro",
    "--yes",
  ]);
  assertFail(proWithoutLicense, "requires a Pro license");

  const realInstall = runCli("template:install free write", "template-install.mjs", [
    "--id",
    "purple-geo-lite",
    "--yes",
  ]);
  assertPass(realInstall);

  const lockAfterInstall = readJson(join(fixtureRoot, ".githubcms", "templates.lock.json"));
  assert(lockAfterInstall.active === null, "Install must not activate a template implicitly.");
  assert(
    lockAfterInstall.installed?.some((item) => item.id === "purple-geo-lite"),
    "Install must register purple-geo-lite in template lock.",
  );

  const activate = runCli("template:activate free write", "template-activate.mjs", [
    "--id",
    "purple-geo-lite",
    "--yes",
  ]);
  assertPass(activate);

  const lockAfterActivate = readJson(join(fixtureRoot, ".githubcms", "templates.lock.json"));
  const mainScss = readFileSync(join(fixtureRoot, "src", "assets", "main.scss"), "utf8");
  assert(lockAfterActivate.active === "purple-geo-lite", "Activation must set active template id.");
  assert(
    mainScss.includes('@import "themes/purple-geo-lite/theme.scss";'),
    "Activation must update src/assets/main.scss theme import.",
  );

  const finalStatus = runCli("template:status --json after activation", "template-status.mjs", ["--json"]);
  assertPass(finalStatus);
  const finalPayload = JSON.parse(finalStatus.stdout);
  assert(finalPayload.lock.active === "purple-geo-lite", "Status must report active purple-geo-lite.");
  assert(
    finalPayload.templates.some((item) => item.id === "purple-geo-lite" && item.installed && item.active),
    "Status must mark purple-geo-lite as installed and active.",
  );

  console.log(`Template CLI smoke test passed in ${rel(fixtureRoot)}.`);
} finally {
  if (!keepFixture) {
    rmSync(fixtureRoot, { recursive: true, force: true });
  } else {
    console.log(`Template CLI smoke fixture kept at ${rel(fixtureRoot)}.`);
  }
}

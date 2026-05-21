const allowedModes = new Set(["build", "deploy"]);
const forbiddenPublicEnv = [
  "VITE_PIXINLINK_API_KEY",
  "VITE_VPS_HOST",
  "VITE_VPS_USER",
  "VITE_VPS_SSH_KEY",
  "VITE_DEPLOY_PATH",
];

const args = process.argv.slice(2);
const modeIndex = args.indexOf("--mode");
const mode = modeIndex === -1 ? "build" : args[modeIndex + 1];
const failures = [];

function value(name) {
  return (process.env[name] ?? "").trim();
}

function fail(message) {
  failures.push(message);
}

function requireValue(name) {
  if (!value(name)) {
    fail(`${name} is required.`);
  }
}

function requireHttpsUrl(name) {
  const currentValue = value(name);
  requireValue(name);

  if (currentValue && !currentValue.startsWith("https://")) {
    fail(`${name} must start with https://.`);
  }
}

function validateForbiddenPublicEnv() {
  for (const name of forbiddenPublicEnv) {
    if (value(name)) {
      fail(`${name} must not be defined because VITE_* values are exposed to the browser bundle.`);
    }
  }
}

function validateDeployGate() {
  const dryRun = value("DEPLOY_DRY_RUN") || "true";

  if (!["true", "false"].includes(dryRun)) {
    fail("DEPLOY_DRY_RUN must be true or false.");
  }

  if (mode === "deploy" && dryRun !== "false") {
    fail("DEPLOY_DRY_RUN must be false in deploy mode.");
  }

  if (dryRun !== "true" && value("DEPLOY_CONFIRM") !== "DEPLOY") {
    fail("DEPLOY_CONFIRM must equal DEPLOY when DEPLOY_DRY_RUN is false.");
  }

  if (dryRun !== "true" && value("DEPLOY_VPS_ENABLED") !== "true") {
    fail("DEPLOY_VPS_ENABLED must equal true before real VPS deploy.");
  }
}

function validatePort() {
  const port = value("VPS_PORT") || "22";

  if (!/^\d+$/.test(port)) {
    fail("VPS_PORT must be a number.");
    return;
  }

  const parsedPort = Number(port);
  if (parsedPort < 1 || parsedPort > 65535) {
    fail("VPS_PORT must be between 1 and 65535.");
  }
}

function validateDeployPath() {
  const deployPath = value("DEPLOY_PATH");
  requireValue("DEPLOY_PATH");

  if (!deployPath) {
    return;
  }

  if (!deployPath.startsWith("/")) {
    fail("DEPLOY_PATH must be an absolute Linux path.");
  }

  if (deployPath === "/") {
    fail("DEPLOY_PATH must not be the filesystem root.");
  }

  if (/[\r\n]/.test(deployPath)) {
    fail("DEPLOY_PATH must not contain line breaks.");
  }
}

function validateDeployUser() {
  const user = value("VPS_USER");
  requireValue("VPS_USER");

  if (user === "root") {
    // allowed — demo/single-user VPS
  } else if (/\s/.test(user)) {
    fail("VPS_USER must not contain whitespace.");
  }
}

function validateHost() {
  const host = value("VPS_HOST");
  requireValue("VPS_HOST");

  if (/\s/.test(host)) {
    fail("VPS_HOST must not contain whitespace.");
  }
}

if (!allowedModes.has(mode)) {
  fail(`Unsupported mode: ${mode || "<empty>"}. Expected build or deploy.`);
} else {
  validateForbiddenPublicEnv();
  validateDeployGate();

  if (mode === "build") {
    requireHttpsUrl("VITE_SITE_URL");
  }

  if (mode === "deploy") {
    requireHttpsUrl("SITE_URL");
    validateHost();
    validateDeployUser();
    requireValue("VPS_SSH_KEY");
    validatePort();
    validateDeployPath();
  }
}

if (failures.length > 0) {
  console.error("Deploy environment validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Deploy environment validation passed for mode: ${mode}.`);

import { spawnSync } from "node:child_process";

const siteUrl = process.env.VITE_SITE_URL || "https://preflight.githubcms.example";

const steps = [
  {
    name: "Validate documentation tree",
    args: ["run", "validate:docs"],
  },
  {
    name: "Validate nginx example",
    args: ["run", "validate:nginx-example"],
  },
  {
    name: "Validate content",
    args: ["run", "validate:content"],
  },
  {
    name: "Validate template packs",
    args: ["run", "validate:templates"],
  },
  {
    name: "Test template CLI",
    args: ["run", "test:templates"],
  },
  {
    name: "Audit production dependencies",
    args: ["audit", "--omit=dev"],
  },
  {
    name: "Validate build environment",
    args: ["run", "validate:deploy-env", "--", "--mode", "build"],
    env: { VITE_SITE_URL: siteUrl },
  },
  {
    name: "Build static site",
    args: ["run", "build"],
    env: { VITE_SITE_URL: siteUrl },
  },
  {
    name: "Validate SEO files",
    args: ["run", "validate:seo-files", "--", "--dir", "dist"],
    env: { VITE_SITE_URL: siteUrl },
  },
  {
    name: "Scan dist for secret markers",
    args: ["run", "check:dist-secrets", "--", "--dir", "dist"],
  },
];

console.log(`Preflight VITE_SITE_URL: ${siteUrl}`);

for (const step of steps) {
  console.log(`\n==> ${step.name}`);
  const command = process.platform === "win32" ? (process.env.ComSpec || "cmd.exe") : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", ["npm", ...step.args].join(" ")]
    : step.args;

  const result = spawnSync(command, args, {
    env: {
      ...process.env,
      ...(step.env ?? {}),
    },
    shell: false,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`Preflight failed while running: npm ${step.args.join(" ")}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.signal) {
    console.error(`Preflight stopped by signal ${result.signal}: npm ${step.args.join(" ")}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`Preflight failed with exit code ${result.status}: npm ${step.args.join(" ")}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\nPreflight validation passed.");

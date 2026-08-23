/**
 * Atomic deployment: tar.gz a dist dir → scp to VPS → extract into
 * releases/<timestamp> → symlink `current` switch → health check → rollback.
 *
 * Replaces non-atomic `rsync --delete` deploys. Keeps N previous releases.
 *
 * Usage:
 *   node scripts/deploy/atomic-deploy.mjs --dist dist-ru --release-path /var/www/github-cms \
 *       --host example.com --user deploy --ssh-key ~/.ssh/deploy_key [--port 22] \
 *       [--keep 5] [--health-url https://example.com/] [--dry-run]
 *
 * Required env (or flags): VPS_HOST, VPS_USER, VPS_SSH_KEY, DEPLOY_PATH.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, existsSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, basename, resolve, dirname } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i !== -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--")) {
    return process.argv[i + 1];
  }
  return process.env[`VPS_${name.toUpperCase().replace(/-/g, "_")}`] ?? fallback;
}

const hasFlag = (name) => process.argv.includes(`--${name}`);

const distDir = resolve(arg("dist", "dist-ru"));
const releaseBase = arg("release-path", arg("deploy-path", "/var/www/github-cms"));
const host = arg("host", process.env.VPS_HOST);
const user = arg("user", process.env.VPS_USER);
const sshKey = arg("ssh-key", process.env.VPS_SSH_KEY);
const port = arg("port", "22");
const keep = Number.parseInt(arg("keep", "5"), 10);
const healthUrl = arg("health-url", null);
const dryRun = hasFlag("dry-run");

if (!host || !user || !sshKey) {
  console.error("Missing required args/env: --host (VPS_HOST), --user (VPS_USER), --ssh-key (VPS_SSH_KEY).");
  process.exit(1);
}
if (!existsSync(distDir)) {
  console.error(`dist directory does not exist: ${distDir}`);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, { stdio: "inherit", ...opts });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed with exit ${result.status}`);
  }
  return result;
}

function ssh(args, opts = {}) {
  return run(
    "ssh",
    ["-i", sshKey, "-p", port, "-o", "IdentitiesOnly=yes", "-o", "StrictHostKeyChecking=accept-new", `${user}@${host}`, args],
    opts,
  );
}

function scp(local, remote, opts = {}) {
  return run(
    "scp",
    ["-i", sshKey, "-P", port, "-o", "IdentitiesOnly=yes", "-o", "StrictHostKeyChecking=accept-new", local, `${user}@${host}:${remote}`],
    opts,
  );
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const releaseDir = `${releaseBase}/releases/${timestamp}`;
const currentLink = `${releaseBase}/current`;
const baseName = basename(distDir);

async function main() {
  const tmpDir = mkdtempSync(join(tmpdir(), "ghcms-deploy-"));
  const tarball = join(tmpDir, `${baseName}.tar.gz`);

  console.log(`[1/5] Packaging ${distDir} → ${tarball}`);
  run("tar", ["-czf", tarball, "-C", dirname(distDir), basename(distDir)]);

  console.log(`[2/5] Uploading to ${host}:${releaseDir}/${baseName}.tar.gz`);
  if (dryRun) {
    console.log("  (dry-run: skipping scp and symlink switch)");
    rmSync(tmpDir, { recursive: true, force: true });
    console.log("Atomic deploy dry-run completed successfully.");
    return;
  }
  ssh(`mkdir -p ${releaseBase}/releases`);
  scp(tarball, `${releaseDir}.tar.gz`);

  console.log(`[3/5] Extracting release ${releaseDir}`);
  ssh(`mkdir -p ${releaseDir} && tar -xzf ${releaseDir}.tar.gz -C ${releaseDir} --strip-components=1 && rm ${releaseDir}.tar.gz`);

  console.log(`[4/5] Switching symlink ${currentLink} → ${releaseDir}`);
  ssh(`ln -sfn ${releaseDir} ${currentLink}`);

  console.log(`[5/5] Rotating old releases (keep ${keep})`);
  ssh(`cd ${releaseBase}/releases && ls -1d */ 2>/dev/null | sort | head -n -${keep} | xargs -r rm -rf`);

  if (healthUrl) {
    console.log(`Health check: ${healthUrl}`);
    run("curl", ["--fail", "--silent", "--show-error", "--max-time", "15", healthUrl]);
    console.log("Health check passed.");
  }

  rmSync(tmpDir, { recursive: true, force: true });
  console.log("Atomic deploy completed successfully.");
}

main().catch((err) => {
  console.error(`\nDeploy failed: ${err.message}`);
  if (!dryRun && releaseDir) {
    console.error(`Rollback: re-point symlink to previous release manually:
  ssh -i ${sshKey} -p ${port} ${user}@${host} "ls -1t ${releaseBase}/releases | head -2; ln -sfn \\\$(ls -1t ${releaseBase}/releases | sed -n 2p) ${currentLink}"`);
  }
  process.exit(1);
});

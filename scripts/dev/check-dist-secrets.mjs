import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const dirIndex = args.indexOf("--dir");
const scanRoot = path.resolve(dirIndex === -1 ? "dist" : args[dirIndex + 1]);
const findings = [];

const forbiddenMarkers = [
  ["PIXINLINK_API_KEY", /PIXINLINK_API_KEY/],
  ["VITE_PIXINLINK_API_KEY", /VITE_PIXINLINK_API_KEY/],
  ["VPS_SSH_KEY", /VPS_SSH_KEY/],
  ["VPS_HOST", /VPS_HOST/],
  ["VPS_USER", /VPS_USER/],
  ["PRIVATE_KEY_BLOCK", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["GITHUB_TOKEN_PREFIX", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/],
  ["AUTHORIZATION_BEARER", /Authorization:\s*Bearer\s+/i],
  ["JWT_TOKEN", /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/],
  ["STRIPE_SECRET", /\bsk_live_[A-Za-z0-9]{20,}\b/],
];

function isBinary(buffer) {
  return buffer.includes(0);
}

async function collectFiles(currentPath) {
  const currentStat = await stat(currentPath);

  if (currentStat.isFile()) {
    return [currentPath];
  }

  if (!currentStat.isDirectory()) {
    return [];
  }

  const entries = await readdir(currentPath);
  const nested = await Promise.all(entries.map((entry) => collectFiles(path.join(currentPath, entry))));
  return nested.flat();
}

function scanTextFile(filePath, text) {
  const relativePath = path.relative(process.cwd(), filePath).replaceAll(path.sep, "/");
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const [markerName, markerPattern] of forbiddenMarkers) {
      if (markerPattern.test(line)) {
        findings.push({
          file: relativePath,
          line: index + 1,
          marker: markerName,
        });
      }
    }
  });
}

if (!existsSync(scanRoot)) {
  console.error(`Secret scan target does not exist: ${scanRoot}`);
  process.exit(1);
}

const files = await collectFiles(scanRoot);

for (const file of files) {
  const buffer = await readFile(file);
  if (isBinary(buffer)) {
    continue;
  }

  scanTextFile(file, buffer.toString("utf8"));
}

if (findings.length > 0) {
  console.error("Forbidden secret markers found in build output:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} marker=${finding.marker}`);
  }
  process.exit(1);
}

console.log(`Dist secret scan passed for ${files.length} file(s).`);

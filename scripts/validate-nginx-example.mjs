import { existsSync, readFileSync } from "node:fs";

const configPath = "deploy/nginx/githubcms.conf.example";
const failures = [];

function fail(message) {
  failures.push(message);
}

function requireIncludes(source, needle, message) {
  if (!source.includes(needle)) {
    fail(message);
  }
}

function requirePattern(source, pattern, message) {
  if (!pattern.test(source)) {
    fail(message);
  }
}

if (!existsSync(configPath)) {
  fail(`${configPath} is missing.`);
}

const config = existsSync(configPath) ? readFileSync(configPath, "utf8") : "";

requireIncludes(config, "server {", "nginx example must define a server block.");
requireIncludes(config, "listen 80;", "nginx example must listen on port 80 before TLS automation.");
requireIncludes(config, "server_name example.com www.example.com;", "nginx example must use placeholder server_name values.");
requireIncludes(config, "root /var/www/github-cms/current;", "nginx example must serve /var/www/github-cms/current.");
requireIncludes(config, "index index.html;", "nginx example must use index.html.");

requirePattern(
  config,
  /location\s*=\s*\/healthz\s*\{[\s\S]*?try_files\s+\/healthz\s+=503;[\s\S]*?\}/,
  "healthz location must serve deployed /healthz artifact and fail with 503 when missing.",
);
requirePattern(
  config,
  /location\s*=\s*\/healthz\s*\{[\s\S]*?default_type\s+text\/plain;[\s\S]*?\}/,
  "healthz location must set text/plain default type.",
);
requirePattern(
  config,
  /location\s*=\s*\/healthz\s*\{[\s\S]*?add_header\s+Cache-Control\s+"no-store"\s+always;[\s\S]*?\}/,
  "healthz location must disable caching.",
);

requireIncludes(config, "location = /robots.txt", "nginx example must handle robots.txt explicitly.");
requireIncludes(config, "location = /sitemap.xml", "nginx example must handle sitemap.xml explicitly.");
requireIncludes(config, 'Cache-Control "public, max-age=300, must-revalidate"', "nginx example must short-cache HTML/SEO files.");
requireIncludes(config, 'Cache-Control "public, max-age=31536000, immutable"', "nginx example must long-cache immutable assets.");
requireIncludes(config, "location /assets/", "nginx example must define an assets location.");
requireIncludes(config, "try_files $uri $uri/ $uri.html =404;", "nginx example must use SSG-safe route resolution.");

requireIncludes(config, 'X-Content-Type-Options "nosniff"', "nginx example must send X-Content-Type-Options.");
requireIncludes(config, 'X-Frame-Options "SAMEORIGIN"', "nginx example must send X-Frame-Options.");
requireIncludes(config, 'Referrer-Policy "strict-origin-when-cross-origin"', "nginx example must send Referrer-Policy.");
requireIncludes(config, 'Permissions-Policy "geolocation=(), microphone=(), camera=()"', "nginx example must send Permissions-Policy.");
requireIncludes(config, "Content-Security-Policy", "nginx example must send Content-Security-Policy.");
requireIncludes(config, "frame-ancestors 'self'", "nginx CSP must restrict frame ancestors.");
requireIncludes(config, "base-uri 'self'", "nginx CSP must restrict base-uri.");

if (/return\s+200\b/.test(config)) {
  fail("nginx example must not implement synthetic return 200 health checks.");
}

if (/try_files\s+\$uri\s+\$uri\/\s+\/index\.html/.test(config)) {
  fail("nginx example must not use SPA fallback to /index.html for missing SSG routes.");
}

if (failures.length > 0) {
  console.error("nginx example validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`nginx example validation passed: ${configPath}`);

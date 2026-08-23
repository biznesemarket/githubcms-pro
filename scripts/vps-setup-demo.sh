#!/bin/bash
# VPS setup script for GitHub CMS demo sites
# Run via: ssh $VPS_USER@$VPS_HOST 'bash -s' < scripts/vps-setup-demo.sh

set -euo pipefail
echo "Setting up demo site infrastructure..."

# Directories
for dir in /var/www/github-cms-free/ru /var/www/github-cms-free/en /var/www/github-cms-pro/ru /var/www/github-cms-pro/en; do
  if [ ! -d "$dir" ]; then
    echo "Creating: $dir"
    mkdir -p "$dir"
  fi
done

# Nginx config for demofree.githubcms.ru
cat > /etc/nginx/sites-available/demofree.githubcms.ru <<'NGINX'
server {
    listen 80;
    server_name demofree.githubcms.ru;
    root /var/www/github-cms-free/ru;
    index index.html;

    # Security headers (mirrors deploy/nginx/githubcms.conf.example — keep in sync)
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; style-src 'self' 'unsafe-inline' https://*.tbank.ru https://*.tinkoff.ru; connect-src 'self' https: https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; font-src 'self' data:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /healthz {
        default_type text/plain;
        return 200 "ok\n";
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 256;
}
NGINX

# Nginx config for demofree.githubcms.com
cat > /etc/nginx/sites-available/demofree.githubcms.com <<'NGINX'
server {
    listen 80;
    server_name demofree.githubcms.com;
    root /var/www/github-cms-free/en;
    index index.html;

    # Security headers (mirrors deploy/nginx/githubcms.conf.example — keep in sync)
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; style-src 'self' 'unsafe-inline' https://*.tbank.ru https://*.tinkoff.ru; connect-src 'self' https: https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; font-src 'self' data:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /healthz {
        default_type text/plain;
        return 200 "ok\n";
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 256;
}
NGINX

# Nginx config for demopro.githubcms.ru
cat > /etc/nginx/sites-available/demopro.githubcms.ru <<'NGINX'
server {
    listen 80;
    server_name demopro.githubcms.ru;
    root /var/www/github-cms-pro/ru;
    index index.html;

    # Security headers (mirrors deploy/nginx/githubcms.conf.example — keep in sync)
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; style-src 'self' 'unsafe-inline' https://*.tbank.ru https://*.tinkoff.ru; connect-src 'self' https: https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; font-src 'self' data:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /healthz {
        default_type text/plain;
        return 200 "ok\n";
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 256;
}
NGINX

# Nginx config for demopro.githubcms.com
cat > /etc/nginx/sites-available/demopro.githubcms.com <<'NGINX'
server {
    listen 80;
    server_name demopro.githubcms.com;
    root /var/www/github-cms-pro/en;
    index index.html;

    # Security headers (mirrors deploy/nginx/githubcms.conf.example — keep in sync)
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; style-src 'self' 'unsafe-inline' https://*.tbank.ru https://*.tinkoff.ru; connect-src 'self' https: https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; font-src 'self' data:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /healthz {
        default_type text/plain;
        return 200 "ok\n";
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 256;
}
NGINX

# Enable sites
for site in demofree.githubcms.ru demofree.githubcms.com demopro.githubcms.ru demopro.githubcms.com; do
  if [ ! -L "/etc/nginx/sites-enabled/$site" ]; then
    ln -sf "/etc/nginx/sites-available/$site" "/etc/nginx/sites-enabled/$site"
    echo "Enabled: $site"
  fi
done

# Test and reload nginx
nginx -t && systemctl reload nginx

echo "VPS setup completed."

# Certbot for SSL (run separately with DNS verified)
echo ""
echo "Next: run certbot for each domain after DNS is configured:"
echo "  certbot --nginx -d demofree.githubcms.ru -d demofree.githubcms.com -d demopro.githubcms.ru -d demopro.githubcms.com"

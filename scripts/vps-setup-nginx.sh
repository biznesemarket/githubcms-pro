#!/bin/bash
# Nginx + directories setup for demo sites
# Run via SSH in deploy workflows
set -euo pipefail

# Create web directories
for dir in /var/www/github-cms-free/ru /var/www/github-cms-free/en /var/www/github-cms-pro/ru /var/www/github-cms-pro/en; do
  echo "Ensuring: $dir"
  sudo mkdir -p "$dir"
  sudo chown -R $USER:$USER "$dir"
done

# Create nginx configs
for pair in \
  "demofree.githubcms.ru:/var/www/github-cms-free/ru" \
  "demofree.githubcms.com:/var/www/github-cms-free/en" \
  "demopro.githubcms.ru:/var/www/github-cms-pro/ru" \
  "demopro.githubcms.com:/var/www/github-cms-pro/en"
do
  DOMAIN="${pair%%:*}"
  ROOT="${pair##*:}"
  CONF="/etc/nginx/sites-available/$DOMAIN"

  if [ -f "$CONF" ]; then
    echo "Nginx config exists: $DOMAIN — updating root only"
    sudo sed -i "s|root .*;|root $ROOT;|" "$CONF"
    continue
  fi

  echo "Creating nginx config: $DOMAIN"
  sudo tee "$CONF" > /dev/null <<NGINX
server {
    listen 80;
    server_name $DOMAIN;
    root $ROOT;
    index index.html;

    # Security headers (mirrors deploy/nginx/githubcms.conf.example — keep in sync)
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data:; script-src 'self' https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; style-src 'self' 'unsafe-inline' https://*.tbank.ru https://*.tinkoff.ru; connect-src 'self' https: https://*.tbank.ru https://*.tinkoff.ru https://*.tcsbank.ru https://*.nspk.ru https://*.t-static.ru; font-src 'self' data:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" always;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /healthz {
        default_type text/plain;
        return 200 "ok\n";
    }

    location /sitemap.xml {
        try_files \$uri =404;
    }

    location /robots.txt {
        try_files \$uri =404;
    }

    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml application/json;
    gzip_min_length 256;
    gzip_comp_level 5;
}
NGINX

  # Enable site
  if [ ! -L "/etc/nginx/sites-enabled/$DOMAIN" ]; then
    sudo ln -sf "$CONF" "/etc/nginx/sites-enabled/$DOMAIN"
    echo "Enabled: $DOMAIN"
  fi
done

# Test config
sudo nginx -t && sudo systemctl reload nginx
echo "Nginx setup complete."

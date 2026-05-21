---
title: "VPS и nginx для статического сайта — выбор, настройка, оптимизация"
description: "Beget/Hetzner/DigitalOcean, gzip/brotli, кеширование 30d, security headers, TTFB ≤50ms."
slug: "vps-i-nginx"
date: "2026-05-10"
author: "GitHub CMS Team"
category: "DevOps"
tags:
  - vps
  - nginx
  - ubuntu
  - gzip
  - кеширование
  - security-headers
schema_type: "HowTo"
layout: "article"
---

Оптимальный VPS: Ubuntu 24.04, 512MB RAM, nginx + gzip/brotli, кеширование 30d. Стоимость от 290₽/мес (Beget Cloud). TTFB ≤50ms после оптимизации.

## Пошаговая настройка

### Шаг 1: Выбор VPS
Beget Cloud (РФ, 290₽/мес), Hetzner (EU, €3.5/мес), DigitalOcean (US, $4/мес).

### Шаг 2: nginx
`apt install nginx`. server_name, root /var/www/site/current, index index.html.

### Шаг 3: Сжатие
gzip on + gzip_types. Размер данных — минус 70%.

### Шаг 4: Кеширование
`expires 30d; Cache-Control: public, immutable` для статики.

### Шаг 5: Security headers
CSP, HSTS, X-Frame-Options. Для Tinkoff: tbank.ru в script-src.

## FAQ

### Какой VPS для старта?
**Ответ:** Beget Light — 290₽/мес, 1GB RAM, 10GB SSD. Достаточно для статического сайта.
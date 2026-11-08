#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== [1/5] Checking environment ==="
if [ ! -f .env.production ]; then
    if [ -f .env.prod ]; then
        echo "Creating .env.production from .env.prod..."
        cp .env.prod .env.production
        echo "PORT=3005" >> .env.production
        echo "HOSTNAME=0.0.0.0" >> .env.production
        echo "NODE_ENV=production" >> .env.production
        echo "NEXT_TELEMETRY_DISABLED=1" >> .env.production
        echo "BACKEND_API_URL=https://api.proxybase.xyz" >> .env.production
        echo "NEXT_PUBLIC_BACKEND_API_URL=https://api.proxybase.xyz" >> .env.production
    else
        echo "ERROR: Neither .env.production nor .env.prod found!"
        exit 1
    fi
fi

echo "=== [2/5] Building Docker image (proxybase2-front:latest) ==="
docker build -t proxybase2-front:latest .

echo "=== [3/5] Configuring systemd user service ==="
mkdir -p "$HOME/.config/systemd/user"
SERVICE_FILE="$HOME/.config/systemd/user/proxybase2-front.service"

cat <<EOF > "$SERVICE_FILE"
[Unit]
Description=ProxyBase Frontend (Next.js 16)
After=docker.service network-online.target
Wants=docker.service network-online.target

[Service]
Type=simple
Environment="PORT=3005"
EnvironmentFile=-${SCRIPT_DIR}/.env.production

ExecStartPre=-/usr/bin/docker stop proxybase2-front
ExecStartPre=-/usr/bin/docker rm proxybase2-front

ExecStart=/usr/bin/docker run --rm \\
    --name proxybase2-front \\
    --init \\
    -p 127.0.0.1:3005:3005 \\
    --env-file ${SCRIPT_DIR}/.env.production \\
    proxybase2-front:latest

ExecStop=/usr/bin/docker stop -t 10 proxybase2-front

Restart=always
RestartSec=5

[Install]
WantedBy=default.target
EOF

systemctl --user daemon-reload
systemctl --user enable proxybase2-front.service

echo "=== [4/5] Starting / Restarting proxybase2-front service ==="
systemctl --user restart proxybase2-front.service

echo "=== [5/5] Waiting for service to respond on port 3005 ==="
MAX_RETRIES=30
RETRY_COUNT=0
HEALTH_OK=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s -f http://127.0.0.1:3005/ > /dev/null 2>&1; then
        HEALTH_OK=1
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for app to start... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

if [ $HEALTH_OK -eq 1 ]; then
    echo "SUCCESS: proxybase2-front is up and responding on http://127.0.0.1:3005"
    systemctl --user status proxybase2-front.service --no-pager
else
    echo "WARNING: App did not respond within expected time. Checking status & logs:"
    systemctl --user status proxybase2-front.service --no-pager || true
    docker logs --tail 50 proxybase2-front || true
    exit 1
fi


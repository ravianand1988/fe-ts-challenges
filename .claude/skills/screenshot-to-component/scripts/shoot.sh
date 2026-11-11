#!/usr/bin/env bash
# Screenshot a route of this repo's dev server at a desktop width and at a
# 375px *content* width. The app shell's sidebar is about 240px plus padding,
# so the narrow shot uses a 647px window.
# Usage: shoot.sh <route-path> <out-dir> [port]
# It starts its own Vite server on a free port (default 5287) with
# --strictPort, so a stray server from another project can't answer instead.
set -eu
ROUTE="${1:?route path, e.g. repo-overview}"
OUT="${2:?output directory}"
PORT="${3:-5287}"
ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
mkdir -p "$OUT"
cd "$ROOT"
"$ROOT/node_modules/.bin/vite" --port "$PORT" --strictPort >"$OUT/vite.log" 2>&1 &
VITE_PID=$!
cleanup() {
  kill "$VITE_PID" 2>/dev/null || true
  pkill -f "$ROOT/node_modules/.bin/vite --port $PORT --strictPort" 2>/dev/null || true
}
trap cleanup EXIT
for _ in $(seq 1 60); do grep -q "ready" "$OUT/vite.log" && break; sleep 0.5; done
if ! grep -q "ready" "$OUT/vite.log"; then
  echo "Vite did not start (port $PORT busy?)"; cat "$OUT/vite.log"; exit 1
fi
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser)"
for spec in desktop:1280:1000 narrow:647:1900; do
  IFS=: read -r name w h <<<"$spec"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$w,$h" --virtual-time-budget=5000 \
    --screenshot="$OUT/$name.png" "http://localhost:$PORT/$ROUTE" >/dev/null 2>&1
  echo "$OUT/$name.png"
done

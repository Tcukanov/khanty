#!/bin/sh
# Запускается cron'ом на Majordomo: если в ветке deploy новая сборка — скачивает и раскладывает её в www.
REPO=Tcukanov/khanty
SITE="$HOME/варты.рф"
WWW="$SITE/www"
TMP="$SITE/.deploy-tmp"

latest=$(curl -fsSL "https://raw.githubusercontent.com/$REPO/deploy/VERSION?t=$(date +%s)") || exit 0
[ -n "$latest" ] || exit 0
[ "$latest" = "$(cat "$WWW/VERSION" 2>/dev/null)" ] && exit 0

rm -rf "$TMP" && mkdir -p "$TMP" || exit 1
curl -fsSL "https://codeload.github.com/$REPO/tar.gz/refs/heads/deploy" | tar -xz -C "$TMP" --strip-components=1 || { rm -rf "$TMP"; exit 1; }
# архив мог отстать от VERSION — тогда попробуем в следующий запуск
[ -f "$TMP/index.html" ] && [ "$(cat "$TMP/VERSION")" = "$latest" ] || { rm -rf "$TMP"; exit 0; }

if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$TMP/" "$WWW/"
else
  cp -R "$TMP/." "$WWW/"
fi
rm -rf "$TMP"
echo "$(date '+%F %T') deployed $latest" >> "$SITE/deploy.log"

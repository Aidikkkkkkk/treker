#!/usr/bin/env bash
set -e

PROJECT_DIR="$HOME/projects/treker"
CONTAINER="expo-build"
ARCH="${1:-armeabi-v7a}"

cd "$PROJECT_DIR"

# Docker-демон
if ! docker info >/dev/null 2>&1; then
  echo ">> Запускаю Docker..."
  sudo service docker start
  sleep 3
fi

# Контейнер: создать или запустить
if ! docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  docker run -d --name "$CONTAINER" \
    -v "$PROJECT_DIR":/project/app \
    -v node_modules:/project/app/node_modules \
    -v gradle-cache:/root/.gradle \
    expo-android
elif ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  docker start "$CONTAINER"
fi

echo ">> npm ci..."
docker exec "$CONTAINER" npm ci

echo ">> Prebuild --clean..."
docker exec "$CONTAINER" npx expo prebuild --platform android --clean

echo ">> Настраиваю gradle.properties..."
docker exec "$CONTAINER" bash -c '
  f=android/gradle.properties
  grep -q "^org.gradle.jvmargs" $f \
    && sed -i "s|^org.gradle.jvmargs=.*|org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g|" $f \
    || echo "org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g" >> $f
'

# Дальше обычная сборка
exec bash "$(dirname "$(readlink -f "$0")")/build-apk.sh" "$ARCH"

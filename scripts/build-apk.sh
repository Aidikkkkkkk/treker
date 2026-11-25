#!/usr/bin/env bash
set -e

PROJECT_DIR="$HOME/projects/treker"
CONTAINER="expo-build"
ARCH="${1:-armeabi-v7a}"   # или arm64-v8a, или armeabi-v7a,arm64-v8a
APK_DIR="$PROJECT_DIR/android/app/build/outputs/apk/release"

cd "$PROJECT_DIR"

# Docker-демон
if ! docker info >/dev/null 2>&1; then
  echo ">> Запускаю Docker..."
  sudo service docker start
  sleep 3
fi

# Контейнер: создать или запустить
if ! docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  echo ">> Создаю контейнер $CONTAINER..."
  docker run -d --name "$CONTAINER" \
    -v "$PROJECT_DIR":/project/app \
    -v node_modules:/project/app/node_modules \
    -v gradle-cache:/root/.gradle \
    expo-android
elif ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  echo ">> Запускаю контейнер $CONTAINER..."
  docker start "$CONTAINER"
fi

# Сборка
echo ">> Собираю APK ($ARCH)..."
docker exec "$CONTAINER" bash -c "cd android && ./gradlew assembleRelease -PreactNativeArchitectures=$ARCH"

echo ">> Готово:"
ls -lh "$APK_DIR"/*.apk

cd "$APK_DIR"
explorer.exe . || true

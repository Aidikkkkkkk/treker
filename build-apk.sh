#!/usr/bin/env bash
set -e

PROJECT_DIR="$HOME/projects/treker"
CONTAINER="expo-build"
ARCH="${1:-armeabi-v7a}"   # можно передать другой аргумент: arm64-v8a или armeabi-v7a,arm64-v8a
APK_DIR="$PROJECT_DIR/android/app/build/outputs/apk/release"

cd "$PROJECT_DIR"

# 1. Запуск Docker-демона, если он не работает (для Docker Engine в WSL; для Docker Desktop просто пропустится)
if ! docker info >/dev/null 2>&1; then
  echo ">> Запускаю Docker..."
  sudo service docker start
  sleep 3
fi

# 2. Создать контейнер, если его нет, иначе запустить
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

# 3. Сборка (без -t, чтобы работало и из неинтерактивной оболочки)
echo ">> Собираю APK ($ARCH)..."
docker exec "$CONTAINER" bash -c "cd android && ./gradlew assembleRelease -PreactNativeArchitectures=$ARCH"

# 4. Результат
echo ">> Готово:"
ls -lh "$APK_DIR"/*.apk

# 5. Открыть папку в проводнике Windows
cd "$APK_DIR"
explorer.exe . || true

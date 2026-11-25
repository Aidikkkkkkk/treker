FROM node:24.19.0

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    openjdk-17-jdk \
    wget curl unzip git \
    ca-certificates python3 build-essential \
    && rm -rf /var/lib/apt/lists/*

# Версии под ваш Expo SDK (проверьте после expo prebuild в android/build.gradle)
ARG CMDLINE_TOOLS_VERSION=15859902
ARG ANDROID_PLATFORM=36
ARG ANDROID_BUILD_TOOLS=36.0.0
ARG ANDROID_NDK=27.1.12297006

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV ANDROID_HOME=/android-sdk
ENV ANDROID_SDK_ROOT=/android-sdk
ENV PATH="${JAVA_HOME}/bin:${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools"

WORKDIR /tmp
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools \
    && wget -q https://dl.google.com/android/repository/commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip \
    && unzip -q commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip \
    && mv cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest \
    && rm commandlinetools-linux-${CMDLINE_TOOLS_VERSION}_latest.zip

# Установка пакетов, затем принятие лицензий уже для них
RUN yes | sdkmanager --sdk_root=${ANDROID_HOME} \
      "platform-tools" \
      "platforms;android-${ANDROID_PLATFORM}" \
      "build-tools;${ANDROID_BUILD_TOOLS}" \
      "ndk;${ANDROID_NDK}" \
    ; yes | sdkmanager --sdk_root=${ANDROID_HOME} --licenses

# Gradle: больше памяти, без демона (в контейнере он не нужен)
RUN mkdir -p /root/.gradle && printf '%s\n' \
    "org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1g" \
    "org.gradle.daemon=false" \
    > /root/.gradle/gradle.properties

ENV EAS_NO_VCS=1

WORKDIR /project/app
CMD ["tail", "-f", "/dev/null"]

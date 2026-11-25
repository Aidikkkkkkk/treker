FROM node:24.19.0

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    wget curl unzip git \
    ca-certificates python3 build-essential \
    && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV ANDROID_HOME=/android-sdk
ENV ANDROID_SDK_ROOT=/android-sdk

ENV PATH="${JAVA_HOME}/bin:${PATH}"

RUN mkdir -p /android-sdk/cmdline-tools

WORKDIR /tmp

RUN wget -q \
    https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip \
    && unzip -q commandlinetools-linux-15859902_latest.zip \
    && mv cmdline-tools /android-sdk/cmdline-tools/latest \
    && rm commandlinetools-linux-15859902_latest.zip

ENV PATH="${PATH}:/android-sdk/cmdline-tools/latest/bin:/android-sdk/platform-tools"

RUN yes | sdkmanager --licenses

RUN sdkmanager \
    "platform-tools" \
    "platforms;android-37" \
    "build-tools;37.0.0" \
    "ndk;27.1.12297006"

RUN npm install -g npm@latest

ENV EAS_NO_VCS=1

WORKDIR /project/app

CMD ["tail", "-f", "/dev/null"]

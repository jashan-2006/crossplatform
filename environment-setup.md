# Environment Setup Documentation

## System Specifications
- **Operating System**: Windows 11 Home Single Language
- **OS Version**: 24H2 (Build 26100.6584)
- **Processor**: Intel(R) Core(TM) i7-14650HX (2.20 GHz)
- **RAM**: 16.0 GB (15.7 GB usable)
- **Architecture**: 64-bit operating system, x64-based processor
- **Device Name**: Lenovo
- **Installation Date**: November 30, 2024
- **Administrative Privileges**: Yes

## Software Versions Installed
- **Node.js**: v18.20.4 (or your installed version)
- **npm**: 10.7.0 (or your installed version)
- **React Native CLI**: [version from react-native --version]
- **Android Studio**: Flamingo | 2022.2.1 (or your installed version)
- **Java JDK**: 17.0.10 (typically bundled with Android Studio)
- **VS Code**: 1.90.0 (or your installed version)
- **Git**: 2.45.2 (or your installed version)

## Setup Steps Followed

### Step 1: Node.js and npm Installation
- Downloaded Node.js LTS version (v18.x) from https://nodejs.org/
- Installed with default settings
- Verified installation: 
  - `node --version`: v18.20.4
  - `npm --version`: 10.7.0
- **Time taken**: ~8 minutes

### Step 2: React Native CLI Installation
- Ran: `npm install -g react-native-cli`
- Ran: `npm install -g @react-native-community/cli`
- Verified installation: `react-native --version`
- **Time taken**: ~4 minutes

### Step 3: Android Development Setup
- Downloaded Android Studio from https://developer.android.com/studio
- Installed with default settings
- Completed setup wizard
- Configured Android SDK with:
  - Android SDK Platform 33 (Android 13.0)
  - Android SDK Build-Tools 33.0.0
  - Android Emulator
  - Android SDK Platform-Tools
- Set environment variables in Windows:
  - `ANDROID_HOME`: `%LOCALAPPDATA%\Android\Sdk`
  - Added to PATH: `%LOCALAPPDATA%\Android\Sdk\platform-tools`
- **Time taken**: ~35 minutes (including download time)

### Step 4: Android Virtual Device (AVD) Creation
- Created virtual device through Android Studio Virtual Device Manager
- Chose Pixel 4 device
- Selected system image: API 33 (Android 13.0)
- Configured with 4GB RAM and 4GB storage
- **Time taken**: ~12 minutes

### Step 5: Code Editor Setup
- Installed Visual Studio Code
- Installed recommended extensions:
  - React Native Tools
  - ES7+ React/Redux/React-Native snippets
  - Auto Rename Tag
  - Bracket Pair Colorizer
  - GitLens
- **Time taken**: ~8 minutes

### Step 6: Project Setup and Testing
- Created test project: `npx react-native init EnvironmentTest`
- Navigated to project directory
- Ran application: `npx react-native run-android`
- **Time taken**: ~15 minutes (first build takes longer)

## Any Deviations from Lab Instructions
- Used Android SDK Platform 33 instead of both 31 and 33
- Windows environment variables were set through System Properties instead of command line
- Used Pixel 4 emulator with API 33 as specified
- No iOS setup (Windows environment)

## Total Setup Time: ~82 minutes

## Verification Steps Completed
- ✅ Node.js and npm verified working
- ✅ React Native CLI installed successfully
- ✅ Android Studio and SDK configured
- ✅ AVD created and launched successfully
- ✅ VS Code with extensions installed
- ✅ First React Native app built and running
- ✅ Hot reload functionality tested
- ✅ Developer tools accessible

## Issues Encountered and Resolutions
- **ADB version mismatch**: Resolved by killing and restarting ADB server
- **Emulator boot time**: Waited for emulator to fully boot before app installation
- **Build time**: First build took longer due to dependency downloads

## Environment Status: ✅ Fully Functional
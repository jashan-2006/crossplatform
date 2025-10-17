# Platform Settings App - Lab 5

## Student Information
- **Name:** [Your Full Name]
- **Student ID:** [Your ID]
- **Course:** CPAN 213
- **Lab:** Lab 5 - Implementing Platform-Specific Features
- **Date:** October 8-9, 2025

## Project Description
This React Native application demonstrates platform-specific implementations for iOS and Android, showcasing different design guidelines and UI patterns for each platform.

## Features Implemented
- Platform-specific button components (.ios.js and .android.js)
- Settings screen with platform-aware styling
- Platform-specific colors and typography
- iOS Human Interface Guidelines compliance
- Android Material Design compliance
- Platform-specific navigation and interactions

## Technologies Used
- React Native 0.72+
- React Native Vector Icons
- Platform-specific APIs (Platform.OS, Platform.select)

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Install iOS pods (macOS only): `cd ios && pod install`
4. Run on Android: `npx react-native run-android`
5. Run on iOS: `npx react-native run-ios`

## Project Structure
src/
├── components/
│ └── PlatformButton/
│ ├── index.js
│ ├── PlatformButton.ios.js
│ └── PlatformButton.android.js
├── screens/
│ └── SettingsScreen.js
└── utils/
└── platform.js


## Platform Differences Implemented

### iOS Specific Features
- Rounded corners (12pt border radius)
- Shadow effects for depth
- San Francisco typography system
- Large title headers (34pt)
- iOS-style switches
- Normal case button text

### Android Specific Features
- Sharp corners (4pt border radius)
- Elevation for depth
- Roboto typography system
- Standard title headers (24pt)
- Material Design switches
- Uppercase button text

## Screenshots
See repository for iOS and Android screenshots demonstrating platform differences.

## Testing
Test on both iOS and Android simulators/emulators to see platform-specific styling differences.

# Disaster Recovery Brisbane - Mobile App

React Native mobile application for emergency restoration services.

## Features

- 24/7 Emergency booking with camera integration
- Real-time job tracking with GPS
- Push notifications for job updates
- Biometric authentication (FaceID/TouchID)
- Deep linking support
- Offline capabilities with sync
- Platform-specific UI (iOS/Android)

## Tech Stack

- **Expo SDK 52** - Development framework
- **React Native 0.76** - Cross-platform framework
- **TypeScript 5.7** - Type safety
- **React Navigation 7** - Navigation
- **Expo Camera** - Photo capture
- **Expo Location** - GPS tracking
- **Expo Notifications** - Push notifications
- **Expo Local Authentication** - Biometric auth
- **React Native Maps** - Map integration
- **AsyncStorage** - Offline storage
- **Axios** - API client

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac only) or Android Studio

### Installation

```bash
cd mobile-app
npm install
```

### Development

```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### Building

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
npm run build:ios

# Build for Android
npm run build:android
```

## Project Structure

```
mobile-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── ServicesScreen.tsx
│   │   ├── LocationsScreen.tsx
│   │   ├── EmergencyBookingScreen.tsx
│   │   ├── TrackJobScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── RootNavigator.tsx
│   ├── services/         # API and business logic
│   │   ├── ApiClient.ts
│   │   └── NotificationService.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── useOfflineStorage.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   └── config/           # App configuration
│       └── constants.ts
├── assets/               # Images, fonts, etc.
├── app.json              # Expo configuration
├── App.tsx               # Entry point
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Native Features

### Camera Integration
- Damage photo capture
- Image compression
- Photo gallery access

### Geolocation
- Current location detection
- Real-time tracking
- Map view with markers

### Push Notifications
- Job status updates
- Emergency alerts
- Silent notifications

### Biometric Authentication
- FaceID (iOS)
- TouchID (iOS)
- Fingerprint (Android)

### Deep Linking
- Open app from SMS/email
- Navigate to specific screens
- Handle booking links

### Offline Support
- AsyncStorage for data persistence
- Offline queue for API requests
- Auto-sync when online

## API Integration

The app connects to the main website API:

```typescript
API_URL=https://disasterrecovery.com.au/api

Endpoints:
- GET /services           # List services
- GET /locations          # List service areas
- POST /bookings          # Create booking
- GET /jobs/:id           # Get job status
- POST /photos/upload     # Upload photos
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
API_URL=https://disasterrecovery.com.au/api
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Google Maps Setup

1. Get API key from Google Cloud Console
2. Enable Maps SDK for iOS/Android
3. Add key to `app.json`:
   - iOS: `ios.config.googleMapsApiKey`
   - Android: `android.config.googleMaps.apiKey`

### Push Notifications

1. Configure FCM (Android) and APNs (iOS)
2. Add credentials to `app.json`
3. Test with Expo push notification tool

## Permissions

### iOS (Info.plist)
- NSCameraUsageDescription
- NSLocationWhenInUseUsageDescription
- NSPhotoLibraryUsageDescription
- NSFaceIDUsageDescription

### Android (AndroidManifest.xml)
- CAMERA
- ACCESS_FINE_LOCATION
- READ_EXTERNAL_STORAGE
- USE_BIOMETRIC

## Testing

```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## Deployment

### App Store (iOS)

1. Configure signing in Xcode
2. Build with EAS: `eas build --platform ios`
3. Upload to App Store Connect
4. Submit for review

### Google Play (Android)

1. Configure signing in `app.json`
2. Build with EAS: `eas build --platform android`
3. Upload to Google Play Console
4. Submit for review

## Performance

- **Startup time**: < 3 seconds
- **Bundle size**: ~50MB
- **Memory usage**: < 150MB
- **Battery impact**: Minimal

## Support

- Email: admin@disasterrecovery.com.au
- Phone: 1300 309 361
- Website: https://disasterrecovery.com.au

## License

UNLICENSED - Proprietary

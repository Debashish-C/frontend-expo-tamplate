# React Native Authentication App

A modern, feature-rich React Native application built with Expo, featuring secure user authentication, profile management, and real-time profile strength analysis. Connects to a FastAPI backend with MySQL database.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on your device
# Press 'a' for Android, 'i' for iOS, or scan QR code with Expo Go
```

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Backend Connection](#backend-connection)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication
- **User Registration**: Email/password signup with validation
- **Profile Management**: View and edit user profiles
- **Real-time Profile Strength**: Dynamic scoring system with visual feedback
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Secure Storage**: Encrypted token storage with Expo Secure Store
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth UX with loading indicators
- **Form Validation**: Client-side validation with server-side backup

## 🛠 Tech Stack

- **Framework**: React Native
- **Build Tool**: Expo SDK 50+
- **Language**: TypeScript
- **Styling**: Tailwind CSS (NativeWind)
- **Navigation**: Expo Router (File-based routing)
- **HTTP Client**: Fetch API with custom wrapper
- **Secure Storage**: Expo Secure Store
- **State Management**: React Hooks
- **Backend**: FastAPI + MySQL + SQLAlchemy

## 📋 Prerequisites

### Required Software
- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js
- **Expo CLI**: `npm install -g @expo/cli`

### Mobile Development
- **iOS**: macOS with Xcode (for iOS Simulator)
- **Android**: Android Studio (for Android Emulator)
- **Physical Device**: Expo Go app installed

### Backend
- The backend API should be running (see backend README)
- Default API URL: `http://192.168.232.7:8000`

## 📦 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd frontend-task
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or with yarn
yarn install
```

### 3. Verify Installation

```bash
# Check Expo CLI version
npx expo --version

# Check project structure
ls -la
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Backend API Configuration
EXPO_PUBLIC_API_URL=http://192.168.232.7:8000

# Optional: Override for different environments
# EXPO_PUBLIC_API_URL=http://localhost:8000  # For local development
# EXPO_PUBLIC_API_URL=https://your-api.com   # For production
```

### Configuration Files

The app is configured through:

- **`app.json`**: Expo app configuration (name, version, icons, etc.)
- **`babel.config.js`**: Babel configuration for React Native
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration

## 🚀 Running the Application

### Development Server

```bash
# Start the Expo development server
npm start

# Or with specific options
npx expo start --clear  # Clear cache
npx expo start --tunnel  # Use tunnel for external access
```

### Running on Different Platforms

Once the development server is running, press:

- **`i`**: Run on iOS Simulator (macOS only)
- **`a`**: Run on Android Emulator
- **`w`**: Run in web browser
- **Scan QR Code**: Use Expo Go app on physical device

### Physical Device Testing

1. **Install Expo Go**:
   - **iOS**: App Store → "Expo Go"
   - **Android**: Google Play → "Expo Go"

2. **Connect Your Phone**:
   - Ensure your phone is on the **same WiFi network** as your computer
   - Open Expo Go and scan the QR code shown in terminal
   - Or enter the URL manually: `exp://192.168.232.7:8081`

3. **Your App Will Load**:
   - The app will download and install on your phone
   - You should see the authentication screens

### Web Testing

```bash
# Run in web browser
npm start
# Then press 'w' in terminal
```

## 🔗 Backend Connection

### Backend Requirements

Ensure your FastAPI backend is running:

```bash
# In the backend directory
cd ../backend-task
./run.sh
```

### API Endpoints Used

- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile

### Network Configuration

The app connects to the backend using the IP address configured in your environment. For mobile testing:

1. **Find your computer's IP**:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Update the API URL** in `.env.local`:
   ```
   EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:8000
   ```

3. **Ensure firewall allows connections** on port 8000

## 📁 Project Structure

```
frontend-task/
├── app/
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Initial screen (redirects to auth/profile)
│   ├── +not-found.tsx           # 404 error page
│   ├── (auth)/                  # Authentication routes
│   │   ├── _layout.tsx          # Auth layout
│   │   ├── sign-in.tsx          # Login screen
│   │   └── sign-up.tsx          # Registration screen
│   └── (root)/                  # Protected routes
│       └── (tabs)/              # Tab navigation
│           ├── _layout.tsx      # Tab layout
│           └── profile.tsx      # User profile screen
├── src/
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   │       ├── CustomButton.tsx # Button with loading states
│   │       ├── InputField.tsx   # Text input with validation
│   │       ├── OAuth.tsx        # OAuth integration (placeholder)
│   │       └── ProfileStrengthMeter.tsx # Profile strength indicator
│   ├── services/
│   │   └── api.ts               # API client and methods
│   ├── lib/
│   │   ├── auth.ts              # Authentication utilities
│   │   └── fetch.ts             # HTTP request wrapper
│   ├── constant/
│   │   └── constants.ts         # App constants and icons
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── assets/
│   └── images/                  # Static images and icons
├── styles/
│   └── tailwind.css             # Tailwind CSS styles
├── app.json                     # Expo app configuration
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind configuration
├── babel.config.js              # Babel configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

## 🔌 API Integration

### API Client

The app uses a centralized API client (`src/services/api.ts`) that:

- Automatically includes JWT tokens in requests
- Handles authentication errors
- Provides typed methods for all endpoints
- Includes comprehensive error handling

### Authentication Flow

1. **Registration**: User creates account → JWT token stored
2. **Login**: User authenticates → JWT token updated
3. **Profile**: Protected routes use stored JWT token
4. **Logout**: JWT token cleared from secure storage

### Error Handling

- **Network Errors**: "Network connection lost" message
- **Authentication Errors**: Redirect to login
- **Validation Errors**: Field-specific error messages
- **Server Errors**: Generic error handling

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Registration**: Create new account with valid email/password
- [ ] **Login**: Sign in with existing credentials
- [ ] **Profile View**: Display user information
- [ ] **Profile Edit**: Update name and view real-time strength meter
- [ ] **Logout**: Sign out with confirmation dialog
- [ ] **Validation**: Test invalid inputs and error messages
- [ ] **Network Errors**: Test with backend offline
- [ ] **Responsive Design**: Test on different screen sizes

### Debug Logging

The app includes comprehensive logging. Check the Expo Go logs for:

```
🌐 API Request: POST http://192.168.232.7:8000/auth/register
📤 Request Body: {"name":"test","email":"test@test.com","password":"test"}
⏳ Making request...
📥 Response Status: 200
✅ API Success: {"_id": "7", "name": "test", "email": "test@test.com"}
```

Or if there's an error:
```
💥 Network Error: {
  "url": "http://192.168.232.7:8000/auth/register",
  "method": "POST",
  "message": "Network request failed"
}
```

### Automated Testing

```bash
# Run tests (if implemented)
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚢 Build & Deployment

### Development Builds

```bash
# Build for development
npx expo run:ios     # iOS
npx expo run:android # Android
```

### Production Builds

#### Using Expo Application Services (EAS)

```bash
# Install EAS CLI
npm install -g @expo/cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for platforms
eas build --platform ios
eas build --platform android
```

#### Manual Builds

```bash
# iOS (macOS only)
npx expo run:ios --device  # Physical device
npx expo run:ios           # Simulator

# Android
npx expo run:android --device  # Physical device
npx expo run:android            # Emulator
```

### Web Deployment

```bash
# Build for web
npx expo export:web

# Deploy to hosting service (Netlify, Vercel, etc.)
# Upload the 'web-build' folder
```

## 🔧 Troubleshooting

### Common Issues

#### 1. "Network connection lost"

**Symptoms**: App shows network error, can't connect to backend

**Solutions**:
```bash
# Check if backend is running
curl http://localhost:8000/docs

# Update API URL in .env.local
EXPO_PUBLIC_API_URL=http://YOUR_IP_ADDRESS:8000

# Restart Expo development server
npx expo start --clear
```

#### 2. "Unable to resolve module"

**Symptoms**: Import errors, missing modules

**Solutions**:
```bash
# Clear all caches
npx expo start --clear
rm -rf node_modules
npm install
```

#### 3. "Metro bundler process exited"

**Symptoms**: Development server crashes

**Solutions**:
```bash
# Kill existing processes
pkill -f "expo\|metro"

# Restart with clean cache
npx expo start --clear
```

#### 4. "No bundle URL present"

**Symptoms**: Can't connect to development server

**Solutions**:
- Ensure device and computer are on same WiFi
- Check firewall settings
- Restart Expo development server
- Try different USB port (if using cable)

### Debug Mode

Enable debug logging by adding to your component:

```typescript
console.log('Debug info:', { variable, state, props });
```

### Device-Specific Issues

#### iOS Issues
- Ensure Xcode is installed and updated
- Check iOS deployment target in app.json
- Try cleaning DerivedData: `rm -rf ~/Library/Developer/Xcode/DerivedData`

#### Android Issues
- Ensure Android SDK is installed
- Check Android API level compatibility
- Try different USB debugging options

### Performance Issues

- **Slow bundling**: Clear Metro cache
- **Memory issues**: Close other applications
- **Hot reload not working**: Restart development server

## 📱 Device Testing

### Physical Device Setup

1. **Install Expo Go** on your device
2. **Connect device and computer** to same WiFi
3. **Enable developer options** (Android)
4. **Trust development server** when prompted

### Simulator/Emulator Setup

#### iOS Simulator
```bash
# Install iOS Simulator
xcode-select --install

# Launch Simulator
open -a Simulator
```

#### Android Emulator
```bash
# Install Android Studio
# Create AVD (Android Virtual Device)
# Launch emulator from Android Studio
```

## 🔒 Security Features

- **JWT Token Storage**: Encrypted storage using Expo Secure Store
- **Automatic Token Injection**: All API requests include auth headers
- **Token Expiration Handling**: Automatic logout on expired tokens
- **Input Validation**: Client-side validation prevents malicious input
- **HTTPS Ready**: Configured for secure connections in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with proper TypeScript types
4. Test on both iOS and Android
5. Commit with clear messages: `git commit -m 'Add feature'`
6. Push and create a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Getting Help

### Resources
- [Expo Documentation](https://docs.expo.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [React Native Documentation](https://reactnative.dev)

---

**Implementation Date:** November 28, 2024
**Version:** 1.0.0
**Status:** Complete ✅

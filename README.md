# FC Creator — Mobile App

Expo SDK 54 · expo-router · NativeWind · Redux Toolkit (RTK Query) + redux-persist.

## Setup

```bash
cp .env.example .env   # set EXPO_PUBLIC_API_URL to the backend (LAN IP when on a device)
npm install
npm start
```

## Structure

```
app/                 # expo-router routes
  _layout.tsx        # fonts, splash, Redux + PersistGate, root Stack
  index.tsx          # redirects to /user/home or /(auth)/welcome
  (auth)/            # welcome, login, register, verify-otp, forgot-password, reset-password
  (common)/          # screens shared by every role (notification)
  user/(tabs)/       # bottom-tab screens for the USER role (home, profile)
components/
  Shared/            # Appbar, Button, FormInput, Error, ReduxProvider
  Screens/<Role>/<Screen>/   # screen-specific components
  ui/                # low-level UI primitives
redux/
  apis/              # base.api.ts (auth header + refresh-on-401) and injected endpoint files
  slices/            # auth.slice.ts (persisted)
  store.ts, types.ts
hooks/, constants/, utils/, assets/
```

Add a new API: create `redux/apis/<name>.api.ts` with `baseApi.injectEndpoints`, and add any cache tags to `tagTypes` in `base.api.ts`.

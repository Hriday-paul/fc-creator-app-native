# Architecture

## Stack

Expo SDK 54 (React Native 0.81, React 19, New Architecture + React Compiler enabled) · expo-router 6 (typed routes) · NativeWind 4 (Tailwind 3) · Redux Toolkit + RTK Query · redux-persist (AsyncStorage) · react-hook-form.

## App boot

`app/_layout.tsx` holds the splash screen until the Inter fonts (`constants/fonts.js`) load, then renders:

```
ThemeProvider → ReduxProvider (Provider + PersistGate) → SafeAreaProvider → root Stack
```

Splash: the native splash (`app.json` → `assets/images/splash.png`, Android `splash-android.png`; regenerate both from `assets/source/logo-original.png`) stays up until `PersistGate` (`components/Shared/ReduxProvider.tsx`) has rehydrated the persisted `auth` slice — its `onBeforeLift` calls `SplashScreen.hide()`. Until then `SplashView` is rendered as a fallback, and every screen can trust `state.auth` on first render. Expo Go shows the app icon instead of the splash; check the real splash in a dev/release build.

`app/index.tsx` redirects to `/user/home` if `auth.accessToken` exists, otherwise to `/(auth)/welcome`.

## Routing & guards

- Route groups: `(auth)` (public stack), `(common)` (screens shared by all roles), `user/(tabs)` (bottom tabs for the `USER` role). The layout is organized by role (`Role = "USER" | "ADMIN"` in `redux/types.ts`); a future role gets its own `app/<role>/` folder.
- `app/user/(tabs)/_layout.tsx` is the auth guard: no `accessToken` → `<Redirect href="/(auth)/welcome" />`. Because it reads from Redux, a `logout()` dispatched anywhere (e.g. by a failed token refresh) kicks the user out automatically.
- The tab bar is absolutely positioned, so tab screens must add bottom padding themselves.

## State & networking

- `redux/store.ts`: one persisted root reducer; **only `auth` is whitelisted** for persistence (the RTK Query cache is not persisted).
- `redux/apis/base.api.ts`: the single `createApi` instance. Every request gets:
  - `Authorization: Bearer <accessToken>` when logged in
  - `token: <authToken>` header for OTP/reset flows (endpoints can also pass `token` explicitly — the auth endpoints do)
- **Refresh-on-401**: a 401 triggers one `POST /auth/refresh` with the refresh token; on success `setTokens` and the original request is retried, otherwise `logout()`.
- Feature endpoints live in `redux/apis/<name>.api.ts` via `baseApi.injectEndpoints`. New cache tags must be added to `tagTypes` in `base.api.ts`.
- Base URL comes from `EXPO_PUBLIC_API_URL` (`utils/config.ts`, falls back to `http://localhost:5000/api`). On a physical device this must be the machine's LAN IP.

## Backend contract

- Every response is `IApiResponse<T>` = `{ success, message?, data, meta? }` — the payload is always at `res.data`.
- Errors are `{ success: false, message }`; `utils/errorMessage.ts#getErrorMessage` extracts a readable string from an RTK Query error. Screens use `mutation(...).unwrap()` in `try/catch` and show `Alert.alert(title, getErrorMessage(err))`.
- Profile update is multipart: `picture` file + `data` = JSON string of `{ name, phone }`.

## Auth flows

The short-lived OTP/reset token is passed between screens as **route params**, not stored in Redux.

- **Sign up**: `register` → `/auth/create` returns `otpToken` → `verify-otp?flow=signup` → response contains tokens + user → `setCredentials` → `/user/home`.
- **Forgot password**: `forgot-password` returns `token` → `verify-otp?flow=reset` → response contains `resetToken` → `reset-password` → `PATCH /auth/reset-password` → `router.dismissTo('/(auth)/login')`.
- **Login**: `/auth/login` → `setCredentials` → `router.replace('/user/home')`.

`verify-otp.tsx` is shared by both flows and branches on the `flow` param.

## Styling

- NativeWind `className` everywhere (wired through `babel.config.js`, `metro.config.js`, `global.css`).
- Design tokens: fonts in `constants/fonts.js` (single source for Tailwind and `useFonts`) → `font-app`, `font-app-medium`, `font-app-semibold`, `font-app-bold`, `font-app-extrabold` and sizes `text-caption`, `text-label`, `text-body`, `text-button`, `text-title`, `text-heading`. Colors in `tailwind.config.js` mirrored in `utils/colors.ts` (`primary` #132D58, `secondary` #BD8F27, `success`, `background`, `surface`, `ink`, `muted`, `subtle`, `outline`).
- For non-className props (icon colors, tab bar styles) use `utils/colors.ts`.
- Forms use react-hook-form with `components/Shared/FormInput` (wraps `Controller`; `secure` adds a show/hide toggle).

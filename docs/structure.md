# Project Structure

```
app/                          # expo-router routes (file = screen)
  _layout.tsx                 # fonts, splash, providers, root Stack
  index.tsx                   # auth-based redirect
  (auth)/                     # welcome, login, register, verify-otp, forgot-password, reset-password
  (common)/                   # screens shared by every role (notification)
  user/(tabs)/                # USER role bottom tabs (home, profile) + auth guard in _layout
components/
  Shared/                     # app-wide: Appbar, AuthHeader, AuthFooter, Button, FormInput, Error, ReduxProvider, SplashView, TermsLine
  Screens/<Role>/<Screen>/    # components used by one screen, e.g. Screens/User/Home/HomeHeader.tsx
  ui/, themed-*.tsx, haptic-tab.tsx, external-link.tsx   # leftovers from the Expo template
redux/
  apis/base.api.ts            # createApi, auth headers, refresh-on-401, tagTypes
  apis/<name>.api.ts          # injected endpoints (auth, user)
  slices/auth.slice.ts        # tokens + user (persisted)
  store.ts, types.ts          # store/persist setup; shared API types (IApiResponse, IUser, ...)
utils/                        # config (API URL), colors, errorMessage
hooks/, constants/theme.ts    # Expo template color-scheme helpers
types/                        # ambient declarations (assets.d.ts: `.svg` imports)
assets/                       # images, icons (Figma SVGs, rendered with expo-image), splash
```

## Conventions

- Import with the `@/` alias (maps to the project root).
- New screen: add the file under the right group in `app/` and register it in that group's `_layout.tsx` if the layout lists screens explicitly (`(auth)` and `user/(tabs)` do; `(common)` does not).
- Icons exported from Figma go in `assets/icons/*.svg`; render them with `expo-image` (`<Image source={require(...svg)} />`), no react-native-svg needed.
- Screen-specific components go in `components/Screens/<Role>/<Screen>/`; reusable ones in `components/Shared/`.
- New API: `redux/apis/<name>.api.ts` using `baseApi.injectEndpoints`, export the generated hooks, add types to `redux/types.ts`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

FC Creator mobile app — Expo SDK 54, expo-router, NativeWind, Redux Toolkit (RTK Query) + redux-persist.

**Expo has changed:** read the versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing code (see `AGENTS.md`).

## Commands

```bash
npm start            # Expo dev server (npm run android / ios / web for a platform)
npm run lint         # expo lint (ESLint, eslint-config-expo)
npx tsc --noEmit     # type check
```

No test suite is set up. Set `EXPO_PUBLIC_API_URL` in `.env` (copy `.env.example`); use your LAN IP on a physical device.

## Docs

- [docs/architecture.md](docs/architecture.md) — boot sequence, routing/auth guards, RTK Query + token refresh, backend response contract, auth flows, styling.
- [docs/structure.md](docs/structure.md) — folder layout and where new screens, components and APIs go.

## Slash commands

`.claude/commands/`: `/plan`, `/fix`, `/review`, `/finish`, plus per-role task lists in `tasks/` (`/auth`, `/visitor`, `/staff`, `/minister`, `/vendor`).

## Frontend-only mode (current)

API calls are commented out while the UI is built. Screens use mock data from `utils/mockData.ts`; every disabled call is marked `TODO(api)` (search for it to re-enable). Don't wire new screens to the API yet — build them against mock data. The Redux API layer in `redux/apis/` is kept intact for later.

## Key rules

- All API calls go through `baseApi` (`redux/apis/base.api.ts`) via `injectEndpoints`; add new cache tags to its `tagTypes`.
- Responses are `{ success, message, data }` — read `res.data`; show errors with `getErrorMessage` from `utils/errorMessage.ts`.
- Style with NativeWind `className`, using the design tokens: fonts `font-app*` / `text-caption|label|body|button|title|heading` (`constants/fonts.js`) and colors `primary`, `secondary`, `muted`, … (`tailwind.config.js` + `utils/colors.ts`). Never hard-code hex values or font names.
- Import via the `@/` alias.

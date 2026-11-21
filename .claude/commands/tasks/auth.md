---
description: Work on the Auth tasks
argument-hint: [specific task or step]
---

# Auth tasks

Source: Figma `fc_creator || Church app (Copy)` → page **🔥 Final Design** (User App) → section **Auth** (`37327:1021`).
File key `6Go0Z6YaHKr9EGHEwP5sdZ`. Every frame in the section is named "Splash screen", so use the node IDs below.

Focus: $ARGUMENTS

Read the tasks below, then follow the /plan steps before implementing.
Frontend-only mode: build against mock data (`utils/mockData.ts`), mark any future API call `TODO(api)`.

**Figma is on the free plan (tight rate limit).** Build from this file and the tokens below; don't re-scan the design.
If a screen really needs more detail, make **one** `get_design_context` call for that screen's node ID only, never the whole section/page.

## Status

Each task has one status — update it as you work:
`todo` · `in-progress` · `done` · `blocked` (add the reason) · `decision` (needs the user's call)

## Design tokens (already in code)

Colors live in `tailwind.config.js` (`theme.extend.colors`) and `utils/colors.ts` — keep both in sync.

| Token (className) | `colors.` key | Hex | Figma variable | Used for |
|---|---|---|---|---|
| `primary` | `primary` | `#132D58` | Main Color | navy buttons, titles |
| `primary-50` | `primary50` | `#D9EFFF` | Main Color's Foundation/2 | light tint |
| `primary-100` | `primary100` | `#BBE3FF` | Main Color's Foundation/3 | light tint |
| `primary-300` | `primary300` | `#56BBFF` | Main Color's Foundation/5 | accent / spinner |
| `secondary` | `secondary` | `#BD8F27` | Secondary Color | gold "GOD IS ONE" divider |
| `success` | `success` | `#27C281` | Success | success state |
| `success-dark` | `successDark` | `#047857` | spring green/24 | green info box text |
| `success-darker` | `successDarker` | `#065F46` | spring green/20 | green info box title |
| `background` | `background` | `#FAFAFA` | BG | screen background |
| `surface` | `surface` | `#ECEAE4` | Cararra | "What happens next?" box |
| `ink` | `black` | `#0B0D10` | Accent/Black | body text |
| `ink-950` / `ink-900` / `ink-800` | `ink950` / `ink900` / `ink800` | `#020617` / `#121316` / `#1E293B` | blue/5, Woodsmoke, azure/17 | headings / dark text |
| `muted` | `muted` | `#737378` | Black Foundation/6 | secondary text |
| `subtle` | `subtle` | `#5C6069` | Shuttle Gray | captions, footer |
| `outline` | `outline` | `#BFBFBF` | Accent/Outline | input & outline-button borders |

Other tokens from the design:
- Radius: inputs/buttons `12` (`rounded-input`), cards `16` (`rounded-card`).
- Spacing scale: 4, 6, 8, 16, 24, 56.
- Shadow ("All"): `0 1 5 1 #00000026` — use `shadow-sm` / `elevation: 2`.

Fonts live in `constants/fonts.js` (single source for Tailwind and `useFonts`) — never write a font name in a screen.

| Class | Token | Current value |
|---|---|---|
| `font-app` / `-medium` / `-semibold` / `-bold` / `-extrabold` | `fontFamily.regular` … `.extrabold` | Inter 400 / 500 / 600 / 700 / 800 |
| `text-caption` | `fontSize.caption` | 11 / 16.5 (Figma Inter/Regular — footer, terms) |
| `text-label` | `fontSize.label` | 12 / 16 (Figma Body/Bold/12 — input labels) |
| `text-body` / `text-button` | `fontSize.body` / `.button` | 14 / 20, 15 / 20 |
| `text-title` / `text-heading` | `fontSize.title` / `.heading` | 20 / 28, 24 / 32 |

App font is **Inter**, same as the design (to change it: edit `constants/fonts.js` + imports in `app/_layout.tsx`).

## Auth flow

```
Splash → Welcome ─┬─ Continue with Microsoft 365 → "Signing you in…" → app
                  ├─ Email / Member ID → Authenticate → app
                  └─ Register Member / Sign Up → Registration form → Verify Your Email Link
                                                   → Registration Under Review (pending admin approval)
```

No passwords or OTP codes in the design: sign-in is Microsoft 365 or email/member ID; registration is confirmed by an email link, then admin approval.

## Shared pieces

| ID | Task | Status |
|---|---|---|
| S1 | Color tokens in `tailwind.config.js` + `utils/colors.ts`; `Button` and tab bar switched to them | `done` |
| S2 | **Auth header** (screens 4–5): small FC logo + "Community Companion" left, language pill (globe + `EN`) right | `todo` |
| S3 | **Footer line** "Community Member Platform · Secure 256-bit Member Privacy" (small `subtle` text) | `todo` |
| S4 | **Terms line** "By continuing, you agree to our Terms of Service and Privacy Policy." (screens 2, 6, 7) | `todo` |
| S5 | **Buttons**: primary (navy), outline (white, `outline` border), "Continue with Microsoft 365" (navy + MS logo). Extend `components/Shared/Button.tsx` | `todo` |
| S6 | **Input** (label, red `*` when required, `rounded-input`, `outline` border) + **Select** variant with chevron | `todo` |
| S7 | Font switched to Inter (matches Figma); Poppins package removed | `done` |
| S9 | Font tokens in `constants/fonts.js` → Tailwind `font-app*` / `text-*` + `useFonts`; `font-poppins*` classes migrated | `done` |
| S8 | Logos: FC crest already at `assets/images/logo.png` (reuse it, or `SplashView`'s pattern). Microsoft 4-square logo still needed — draw it with 4 coloured `View`s instead of a Figma call | `todo` |
| S10 | App icon: replace the default Expo icon (`assets/images/icon.png`, `android-icon-*.png`, `favicon.png`) with the FC crest (from `assets/source/logo-original.png`). Expo Go shows this icon instead of the splash | `todo` |

## Screens

### 1. Splash — `37327:483`
| ID | Task | Status |
|---|---|---|
| 1.1 | White background, FC crest centred (~270×247) — native splash in `app.json` + `components/Shared/SplashView.tsx` | `done` |
| 1.2 | Hook into boot: native splash stays up until fonts load + redux-persist rehydrates (hidden in `PersistGate onBeforeLift`) → `app/index.tsx` (token → `/user/home`, else Welcome) | `done` |
| 1.3 | Review fixes: no blank frame on handoff, Android-safe `splash-android.png`, dark status bar, assets resized (originals in `assets/source/`) | `done` |
| 1.4 | Check the real splash on a release build (`npx expo run:android --variant release`, iOS too). Expo Go can't show it | `todo` |

### 2. Welcome — `37327:420` (same state: `37327:514`)
| ID | Task | Status |
|---|---|---|
| 2.1 | Rebuild `app/(auth)/wellcome.tsx`: crest, "Welcome", subtitle "Your community, transportation, and services — all in one place.", gold divider "GOD IS ONE" | `todo` |
| 2.2 | **Continue with Microsoft 365** → screen 3 | `todo` |
| 2.3 | Outline row: **Email / Member ID** → screen 4, **Register Member** (person-plus icon) → screen 5 | `todo` |
| 2.4 | Terms line; bottom "Don't Have An Account? **Sign Up**" → screen 5 | `todo` |
| 2.5 | Rename route `wellcome` → `welcome` (update `_layout.tsx`, `app/index.tsx`) | `decision` |

### 3. Microsoft 365 sign-in — `37327:654`
| ID | Task | Status |
|---|---|---|
| 3.1 | New `app/(auth)/microsoft-signin.tsx`: MS logo + "Microsoft 365", "Sign in with your organization account", "You'll be redirected to Microsoft to complete sign-in securely.", spinner, "Signing you in…" | `todo` |
| 3.2 | Mock: short delay → set mock session → `/user/home`. Real OAuth (Azure AD) = `TODO(api)` | `todo` |

### 4. Email / Member ID sign-in — `37327:704`
| ID | Task | Status |
|---|---|---|
| 4.1 | Rebuild `app/(auth)/login.tsx`: auth header, eyebrow "MEMBER COMPANION", "Welcome", subtitle | `todo` |
| 4.2 | Feature card: bus icon "Real-time shuttle schedules & live tracking", shield icon "Personal certificate vault & member documents" | `todo` |
| 4.3 | Field "Email Address or Member ID" (placeholder `you@example.com or MEM-68986`), validate email **or** member ID | `todo` |
| 4.4 | **Back** (outline) + **Authenticate** (primary) → mock login → `/user/home`; footer line | `todo` |

### 5. Email-Based Member Registration — `37327:577`
| ID | Task | Status |
|---|---|---|
| 5.1 | Rebuild `app/(auth)/register.tsx` (scroll + keyboard-aware): auth header, title "Email-Based Member Registration" | `todo` |
| 5.2 | Fields: **Full Legal Name\***, **Email address\*** ("…Verification link will be sent here"), **Phone Number** + **Temple** select side by side | `todo` |
| 5.3 | "Children / Dependents (Optional Verification)": repeatable **Full Name**, **Category** select (e.g. Child) + **Count** | `todo` |
| 5.4 | **+ Add Children / Dependents** adds a group; added groups can be removed | `todo` |
| 5.5 | **Back** + **Get Verification link** → validate → screen 6 with the email; footer line | `todo` |

### 6. Verify Your Email Link — `37327:890`
| ID | Task | Status |
|---|---|---|
| 6.1 | New `app/(auth)/verify-email.tsx`: small crest, title, "We sent a secure verification link to **{email}**…" | `todo` |
| 6.2 | `surface` box "What happens next?" with the 3 steps (confirm email → registrar & admin review → activation) | `todo` |
| 6.3 | **Verify Email** → mock verified → screen 7; "Return to Sign In" → Welcome; terms line | `todo` |
| 6.4 | Email-link deep link | `blocked` (needs API) |

### 7. Registration Under Review — `37327:974`
| ID | Task | Status |
|---|---|---|
| 7.1 | New `app/(auth)/pending-approval.tsx`: small crest, amber pill "Email Verified · Pending Admin Approval", "Registration Under Review", body with **{email}** | `todo` |
| 7.2 | Green box "Queued in Admin Membership Approvals" — replace demo copy ("Switch to the Admin Dashboard…") with member-facing text | `todo` |
| 7.3 | **Refresh** → re-check mock status (pending, or approved → `/user/home`); "Return to Sign In" → Welcome | `todo` |

## Routing & cleanup

| ID | Task | Status |
|---|---|---|
| R1 | Register new screens in `app/(auth)/_layout.tsx` | `todo` |
| R2 | Delete or keep `forgot-password`, `reset-password`, `verify-otp` (not in the design) | `decision` |
| R3 | Mock data in `utils/mockData.ts`: temples, dependent categories, mock member (email + member ID), registration status | `todo` |
| R4 | `npm run lint` and `npx tsc --noEmit` pass | `todo` |

---
description: Plan a feature or screen before writing any code
argument-hint: <feature or screen to plan>
---

Plan the following, without editing any files yet: $ARGUMENTS

1. Read `docs/architecture.md` and `docs/structure.md`, then the existing screens and components closest to this feature.
2. Check the Expo SDK 54 docs (https://docs.expo.dev/versions/v54.0.0/) for any Expo API you plan to use.
3. Write the plan:
   - Routes to add or change under `app/` (which group, and whether its `_layout.tsx` must register them)
   - Components: what goes in `components/Shared/` vs `components/Screens/<Role>/<Screen>/`, and what existing components can be reused
   - Data: mock data to add to `utils/mockData.ts` (we are in frontend-only mode — no API calls), and any types for `redux/types.ts`
   - Open questions for me
4. Stop and wait for my approval before implementing.

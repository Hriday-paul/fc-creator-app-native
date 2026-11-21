---
description: Review recent changes for bugs and convention breaks
argument-hint: [files or feature to review — defaults to recently changed files]
---

Review: $ARGUMENTS

If nothing was named, review the files changed most recently in this project (this folder is not a git repo, so use file modification times; skip `node_modules/` and `.expo/`).

Check for:
- **Bugs**: wrong navigation targets, broken route params, missing screen registration in a `_layout.tsx`, state that doesn't update, unhandled `undefined`.
- **Layout**: content hidden behind the absolute tab bar (needs bottom padding), missing `SafeAreaView`, keyboard covering inputs.
- **Conventions** from `CLAUDE.md` and `docs/`: NativeWind `className`, design tokens (`font-app*`, `text-*` sizes, color tokens; no hard-coded hex or font names), `@/` imports, components in the right folder, no live API calls (frontend-only mode — use `utils/mockData.ts`).
- **Expo SDK 54**: APIs used the way the v54 docs describe.

Run `npx tsc --noEmit` and `npm run lint`. Report findings most important first, each with `file:line` and a suggested fix. Don't edit files unless I ask.

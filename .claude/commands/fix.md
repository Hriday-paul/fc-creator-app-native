---
description: Find the root cause of a bug and fix it
argument-hint: <bug description, error message, or screen>
---

Fix this problem: $ARGUMENTS

1. Reproduce or locate it: read the relevant screen, layout and components. If an error message was given, trace it to its source.
2. Find the root cause before changing anything. Don't patch the symptom.
3. Make the smallest fix that solves it, following the existing patterns (NativeWind `className`, `@/` imports, mock data instead of API calls).
4. Run `npx tsc --noEmit` and `npm run lint` and fix anything you introduced.
5. Report: the cause, what you changed (with `file:line`), and anything I should check on a device.

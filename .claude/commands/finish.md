---
description: Wrap up the current task — verify, tidy, update docs, summarize
argument-hint: [what was being worked on]
---

Finish the current task: $ARGUMENTS

1. Run `npx tsc --noEmit` and `npm run lint`. Fix any errors or warnings from this task's changes.
2. Remove leftover debug code (`console.log`, unused imports, dead code you added). Keep `TODO(api)` comments.
3. Make sure any new screen is registered in its group's `_layout.tsx` and any new mock data lives in `utils/mockData.ts`.
4. If folders, routes or patterns changed, update `docs/structure.md` or `docs/architecture.md` (and `CLAUDE.md` only if a key rule changed).
5. If this task came from a file in `.claude/commands/tasks/`, mark what's done there.
6. Summarize: what was built, files changed, what's left, and what I should test on a device.

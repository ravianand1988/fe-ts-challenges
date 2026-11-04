# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A practice repo of frontend interview-style challenges (TypeScript + React 18), aimed at senior/lead/staff FE engineers. It holds two kinds of work:

- **`src/problems/NN-name/`**: standalone JS/TS problems (debounce, throttle, deep-equals, etc.) and type-level challenges (tuple-length, pick, etc.).
- **`src/components/Name/`**: React UI challenges (Toast, DataTable, Autocomplete, etc.), each shown in a Vite demo app.

Each challenge folder has a `readme.md` with the problem spec: difficulty, time box, learning goals, an ASCII diagram, and requirements. Read it before changing the implementation.

## Commands

- `npm run dev`: start the Vite dev server for the demo app
- `npm run build` / `npm run preview`: production build / preview
- `npm run typecheck`: run `tsc --noEmit` (see known gaps below)
- `npm run format`: run Prettier over `src/` (print width 80)
- `bun test`: run all tests. **`npm test` is a stub and always fails.** Tests import from `bun:test`.
- `bun test src/problems/02-debounce`: run tests in one folder
- `bun test -t "should delay execution"`: run tests whose name matches

Known tooling gaps (don't assume these work):

- `npm run lint` currently crashes. `eslint.config.mjs` imports `@eslint/js` and `eslint-plugin-react`, but neither is installed. The config also only targets `.js`/`.jsx`.
- `npm run typecheck` (`tsc --noEmit`) currently reports 8 errors that predate this file, in `src/problems/*` and `src/App.tsx`, so it exits non-zero. When you change code, check that your files add no new errors rather than expecting a clean exit. Type-level challenges are verified only by this typecheck.

## Architecture

**Demo app wiring (React UI challenges):** [src/App.tsx](src/App.tsx) renders the sidebar and routes from `challengesRoutes` in [src/routes.tsx](src/routes.tsx). Each route lazy-loads a named export from the barrel [src/components/index.ts](src/components/index.ts). To add a new UI challenge:

1. Create `src/components/Name/` with `Name.tsx`, `Name.example.tsx` (exports `NameExample`), `Name.module.css` and `readme.md`.
2. Re-export the example from `src/components/index.ts`.
3. Add a `{ path, label, Component: lazy(...) }` entry to `challengesRoutes`.

**Component folder conventions:**

- `*.example.tsx` is the demo harness that gets routed to.
- `*.master.tsx` / `*.master.example.tsx` (DataTable, Toast, RedditThread) hold an alternative or reference solution next to the main attempt.
- `*.mock.ts` / `*.config.ts` hold fixture data.
- Styling uses CSS Modules (`*.module.css`). Shared utility classes live in [src/utilities/styles.module.css](src/utilities/styles.module.css), and `cx(...)` from `src/utilities` combines class names.

**Shared code:** `src/utilities` (helpers such as `cx` and `debounce`, a fake API helper, type-test utils), `src/services` (for example, `FeatureFlag.service.ts`, which caches results and de-duplicates pending requests, backed by `flags.mock.ts`), `src/hooks` (`useFeatureFlag`) and `src/api` (the mock autocomplete API).

**Imports:** `tsconfig.json` sets `baseUrl: "."`, so absolute imports like `src/utilities` resolve; Vite resolves them through `vite-tsconfig-paths`. The `@local/*` aliases also live there. Only `@local/types` and `@local/styles` point to files that exist; `@local/cx` and `@local/utils` point to missing files. `verbatimModuleSyntax` is on, so type-only imports must use `import type`.

**Type-level challenges:** these use `ExpectCustom<EqualCustom<A, B>>` from `@local/types` as compile-time assertions. They have no runtime tests, and "passing" means no type errors.

## Notes

- Some problems have both a `.js` and a `.ts` implementation (debounce, throttle). Tests import the `.ts` one.
- `tsconfig` sets `noUnusedLocals` and `noUnusedParameters`.

# Repo Overview

**Difficulty**: 🟡 Medium · **Time**: 30–40 min

An editable illustration of a code-repository landing page, rebuilt from a
screenshot: a breadcrumb, a section tab bar with counters, a title row with
actions, a branch and file toolbar, a file list with the latest commit, and an
About sidebar.

## What you will learn

- Turning a dense screenshot into a data-driven component tree
- Semantic structure: `nav` + `aria-current`, a real `<table>` for the file
  list, an `<aside>` for About, and `aria-pressed` on the Star toggle
- Responsive two-column layout: the sidebar stacks, and the commit column
  hides on small screens
- Design tokens as CSS custom properties

## Interactions

- Tabs switch the active section. The state lives in the example.
- **Star** toggles between starred and unstarred.
- **Go to file** filters the file list as you type.
- The About sidebar ends with the project's `CountrySelect` in its single
  and multi modes, passed in through the `asideSlot` prop by the example.

## Editing it

- **Content**: `RepoOverview.mock.ts`. This file holds the owner, tabs, counts,
  files and About links.
- **Look**: the custom properties at the top of `RepoOverview.module.css`.
- **Icons**: `RepoOverview.icons.tsx`. These are small inline SVGs that use
  `currentColor`.

## Reused from the project

- `cx` and `styles.module.css` utilities (`flexRowGap8`)
- The App shell palette from `src/App.css`: the accent, border, surface and
  focus-ring colors
- The `ITreeNode` file/folder type from `RecursiveFileTree`
- `CountrySelect`, used as is. Scoped CSS in `.asideSlot` makes its fixed
  350px input fit the 296px sidebar.
- The ★/☆ and ▼ glyphs used by StarRating and Accordion

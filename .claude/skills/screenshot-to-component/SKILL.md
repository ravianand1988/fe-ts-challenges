---
name: screenshot-to-component
description: Recreate a UI from a screenshot as a real, editable React component in this repo (Vite + React 18 + TypeScript + CSS Modules), reusing the project's existing components, utility classes, colors and icon glyphs so it looks native to the app. Use this whenever the user shares or points to a screenshot, mockup, design image or photo of a UI and wants it built, rebuilt, cloned, "turned into code", "made into a component", or added as a new challenge/example page, even if they don't say "component" or "screenshot" explicitly (e.g. "build this", "can you make this card", "copy this layout from the image").
---

# Screenshot → component

The goal is a component a developer could keep: real markup and CSS that
matches the screenshot, built from the project's own parts, wired into the
demo app, and easy to change. It's an *illustration* in the sense that its
content is sample data, but the UI itself has to be real. Putting the
screenshot on the page (as an `<img>`, a background image, or traced SVG) or
drawing it on a canvas defeats the point, because nothing in it can be edited
or reused.

Work through the steps in order. The survey in step 2 comes before any code
because reuse decisions shape the component's structure, and retrofitting
them afterwards usually means a rewrite.

## 1. Read the screenshot carefully

Open the image with the Read tool. Write a short breakdown (in your head or
in the reply) before doing anything else:

- **Regions and hierarchy**: header, list, card, footer and so on, and how
  they nest. This becomes the component tree.
- **Repeated items**: rows, cards, chips, avatars. These become arrays of
  data rendered with `.map`, not copy-pasted JSX.
- **Interactive elements**: buttons, links, inputs, toggles, tabs, menus.
  Each one needs the right native element and a keyboard path.
- **Measurements by eye**: spacing rhythm (it's usually a 4 or 8 px grid),
  corner radii, border weights, font sizes and weights, and the colors. Pick
  the colors from the image. Don't invent a palette.
- **Text**: transcribe the visible text exactly. It becomes the sample data.
- **What the layout implies at other widths**: a row of cards probably wraps,
  and a sidebar probably stacks on top.

If parts of the image are cropped, blurry or ambiguous, make a sensible
choice and say what you assumed in the final message. Don't stop to ask
unless the whole purpose of the UI is unclear.

## 2. Survey the project before building

Spend a few minutes looking at what already exists. The point is for the
result to feel like part of this product, so reuse beats recreation whenever
something fits. Look at the current code rather than relying on this list,
since the project changes:

- `src/components/*/`: existing UI challenges. Skim each folder's main
  `.tsx` file and its props. If the screenshot contains something these
  already do (star ratings, tabs, dialogs, accordions, autocomplete, data
  tables, toasts, phone input, country select, file tree, threaded comments,
  a gallery), import that component and pass it data instead of rebuilding
  it. Check its props interface first, because some are controlled and need
  `value`/`onChange`.
- `src/utilities/styles.module.css`: a large utility-class sheet (flex
  layout, gaps, padding and margin on the 4/8/12/16/24/32 scale, radii
  `br4`–`br128`, `shadow1`–`shadow4`, alpha text and background colors,
  font sizes). Use these for layout plumbing so the spacing scale matches
  the rest of the app. Combine classes with `cx(...)` from `src/utilities`.
- `src/App.css`: the app shell's colors. The accent is `#2563eb` (with
  `#1d4ed8` and `#e8effd`), borders are `#ddd`, the muted surface is
  `#fafafa`, body text is `#333`, and focus rings are a
  `2px solid #2563eb` outline. When the screenshot's colors are close to
  these, use the project's values.
- **Icons**: the project has no icon library or SVG set. Existing
  components use Unicode glyphs (`★ ☆ ▼ ▲ ► ×`). Reuse those where they
  fit. For anything else, write a small inline SVG component inside your
  folder (for example `Name.icons.tsx`), with `aria-hidden="true"` when it
  sits next to visible text, or a `<title>` when it's the only label.
  Don't add an icon package without asking.
- `src/utilities`, `src/hooks`, `src/services`, `src/api`: helpers such as
  `debounce`, a fake API helper and `useFeatureFlag`. Use them only if the
  screenshot implies that behavior.

Before writing code, write down in one or two lines what you're reusing and
what you're building new. That list goes in the final message.

## 3. Build it the way this repo builds components

Follow the conventions in the repo's CLAUDE.md. Create
`src/components/<Name>/` with these files:

| File | What goes in it |
|---|---|
| `<Name>.tsx` | The presentational component. All content comes in through typed props. No hard-coded copy. |
| `<Name>.mock.ts` | The sample data transcribed from the screenshot, typed with the component's prop types. Editing the illustration should mostly mean editing this file. |
| `<Name>.module.css` | The component's styles. |
| `<Name>.example.tsx` | Exports `<Name>Example`, which renders the component with the mock data. Holds any demo state (selected tab, toggles). |
| `readme.md` | A short description in the same style as other folders' readme files: what it is, what's reused, and how to edit it. |

Then register it in two places. Add
`export * from "./<Name>/<Name>.example";` to `src/components/index.ts`, and
add a `{ path, label, Component: lazy(...) }` entry to `challengesRoutes` in
`src/routes.tsx`, copying the existing entries' shape.

### Making it easy to edit

- **Put tokens at the top of the CSS.** Declare the screenshot's colors,
  radii and key sizes as custom properties on the root class (for example
  `.root { --accent: #2563eb; --radius: 12px; }`) and refer to them
  everywhere else. Then a restyle means changing one block of values.
- **Name classes for what they are** (`.planCard`, `.priceRow`), not what
  they look like (`.blueBox`).
- **Use small subcomponents** for the repeated items and keep them in the
  same file unless they get big. A flat 300-line JSX blob is hard to edit.
- Note that `verbatimModuleSyntax` is on, so type-only imports must use
  `import type`. `noUnusedLocals` and `noUnusedParameters` are also on.

### Responsive

Recreate the screenshot at its own width. Then make it hold up from about
320 px wide up to wide desktop screens:

- The demo app always reserves a 240 px sidebar (see `src/App.css`), so the
  component gets about 270 px less than the viewport. Viewport
  `@media` queries therefore fire at the wrong widths. Put
  `container-type: inline-size` on the component's root class and write the
  breakpoints as `@container (max-width: …)` rules, which respond to the
  space the component actually has. Set breakpoints from the component's
  own content widths (for example, the width where a sidebar no longer fits
  beside the main column), not from device sizes.
- Use fluid widths (`max-width`, `%`, `minmax()`, `auto-fit` grids, or
  `flex-wrap`) instead of fixed pixel widths on containers.
- At narrow widths, stack columns, wrap toolbars and hide secondary columns.
  Truncate long single-line text with an ellipsis rather than letting it
  push the layout wider.
- The component shouldn't scroll sideways at a 320 px content width. A tab
  strip can scroll inside its own `overflow-x: auto` wrapper.

### Accessible

- Use semantic elements: `<button>` for actions, `<a href>` for navigation,
  headings in a sensible order, `<ul>`/`<li>` for lists, and
  `<label>`/`<input>` pairs for form fields.
- Every interactive element needs to be reachable with the keyboard and
  have a visible `:focus-visible` style. Use the app's blue outline.
- Give icon-only buttons an `aria-label`. Hide decorative glyphs and SVGs
  with `aria-hidden="true"`.
- Text needs at least 4.5:1 contrast against its background. If the
  screenshot's light-gray text fails, darken it slightly and say so.
- When state is shown only by color (selected, active, error), add a
  non-color signal too, such as `aria-pressed`, `aria-selected`,
  `aria-current`, or a text or icon change.

## 4. Verify

Run all of these, and report what they actually output:

1. `npm run typecheck`. The repo already has some type errors in
   `src/problems/` and `src/App.tsx`, so the command exits non-zero. What
   matters is that your files add none. Check with
   `npm run typecheck 2>&1 | grep -E "src/components/<Name>/|src/routes.tsx|src/components/index.ts"`.
   It should print nothing. Report the existing errors separately as
   already there. Don't fix them unless the user asks.
2. `npm run build`. This must succeed.
3. **Look at it.** Run
   `bash .claude/skills/screenshot-to-component/scripts/shoot.sh <route-path> <out-dir>`.
   The script starts its own Vite server on a dedicated port and takes two
   screenshots with headless Chrome. `desktop.png` is 1280 px wide.
   `narrow.png` uses a 647 px window, which leaves about 375 px for the
   component once the sidebar is taken out. The script then stops the
   server. Read both images:
   - Compare `desktop.png` with the source screenshot side by side, and fix
     obvious differences in layout, spacing, color or text. Usually one
     correction pass is enough. If you change the code, run the script
     again.
   - Check that `narrow.png` has no overflow or clipped controls, and that
     it reads in a sensible order.
   - First confirm the screenshot shows this app's sidebar. Other projects
     on this machine run their own Vite servers, and a reused port can
     quietly serve the wrong app. The script uses `--strictPort` to prevent
     that. If you start a server by hand, do the same.

   **Keyboard check:** tab through the page once to confirm that focus
   moves through the controls in visual order and is visible. The
   Playwright MCP browser can fail to launch here (headful Chrome crashes on
   a GTK settings error). When that happens, use a short Node script with
   the `playwright` package and `chromium.launch({ channel: "chrome",
   headless: true })`. Install the package in a scratch directory, not in
   the project. The script should press Tab repeatedly, log each
   `document.activeElement` and its computed outline, and click the
   interactive bits. If no browser works, say that you skipped the visual
   check.

## 5. Report back

Keep the final message short:

- The route to open and the files created.
- **Reused:** the project components, utility classes and colors you used.
  **New:** what you built from scratch, and why (for example, nothing
  similar existed).
- How to edit it: content lives in `<Name>.mock.ts`, and the look lives in
  the custom properties at the top of `<Name>.module.css`.
- The results of the typecheck, build and visual check, and any
  assumptions you made about unclear parts of the screenshot.

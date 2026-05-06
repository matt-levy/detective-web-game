# Detective Web Game

A React + TypeScript detective-game prototype built with Vite, SCSS design tokens, and Zustand for game state.

## Stack

- `React 19`
- `TypeScript`
- `Vite`
- `SCSS`
- `Zustand`

## Current Direction

The app is being built as a noir/detective UI with tactile, in-world components instead of a generic app shell. Current pieces include:

- `Folder` for case files and modal document reading
- `Button` for themed in-world actions
- `EvidenceCard` for clues and physical items
- `SuspectCard` for dossier-style person profiles
- `EvidenceBoard` for deduction flow and theory building

## State Management

Game state is separated from presentational components with Zustand.

- [src/game/caseData.ts](./src/game/caseData.ts) contains structured case content
- [src/game/store.ts](./src/game/store.ts) contains active game state and board actions

The current store manages:

- active case data
- selected evidence-board item
- theory slot assignments
- theory result state

This keeps React components focused on rendering and user interaction while game rules live in one place.

## Styling

Design tokens live in:

- [src/tokens/tokens.json](./src/tokens/tokens.json)
- [src/tokens/_tokens.scss](./src/tokens/_tokens.scss)
- [src/tokens/tokens.css](./src/tokens/tokens.css)

SCSS component styles should use the generated SCSS tokens rather than hard-coded values where possible.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm run tokens
```

## Project Structure

```text
src/
  components/
    button/
    evidenceBoard/
    evidenceCard/
    folder/
    suspectCard/
  game/
    caseData.ts
    store.ts
  tokens/
    tokens.json
    _tokens.scss
    tokens.css
```

## Notes

- The current app includes a sample Bellweather case wired through the Zustand store.
- The evidence board is intentionally constrained for now: select clues, assign them to theory slots, and submit a deduction.
- Drag-and-drop has not been added yet; the current focus is game flow and state structure first.

# RSE React Library

A TRI-branded React component library used across RSE web projects. It provides
both a ready-made application shell (`TRIApp` with Cognito auth, layout, and
feedback) and a full set of composable UI components built on
[Radix UI](https://www.radix-ui.com/) + [Tailwind CSS](https://tailwindcss.com/),
styled with the TRI design-system tokens.

## Features

- **React + TypeScript** — strongly typed components.
- **Radix UI primitives** — accessible, unstyled building blocks.
- **Tailwind CSS** — utility-first styling, driven by TRI design tokens (`lib/tokens.css`).
- **Storybook** — browse and develop every component in isolation.
- **Vite** — fast library builds (`dist/`), with fonts inlined into the shipped CSS.
- **Vitest, ESLint, Prettier, Husky** — testing, linting, formatting, and pre-commit hooks.
- **GitHub Actions** — automated publish on release.

## Installation

RSE React Library is available as an [npm package](https://www.npmjs.com/package/@toyota-research-institute/rse-react-library).

```sh
# with npm
npm install @toyota-research-institute/rse-react-library

# with yarn
yarn add @toyota-research-institute/rse-react-library
```

### Peer dependencies

Your app must provide these (they are not bundled):

```sh
npm install react react-dom react-router-dom
```

### Import the styles once

The components ship their styles (and the Gellix brand fonts, inlined as base64)
in a single stylesheet. Import it once at your app entry point:

```ts
import '@toyota-research-institute/rse-react-library/style.css';
```

> No `ThemeProvider` is required. (Earlier versions referenced Material Tailwind —
> that is no longer used.)

## Usage

### Option A — individual components

```tsx
import {
  Button,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@toyota-research-institute/rse-react-library';
import '@toyota-research-institute/rse-react-library/style.css';

function Example() {
  return (
    <div>
      <Button variant="default">Save</Button>
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>Details</AccordionTrigger>
          <AccordionContent>Some content.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
```

### Option B — the full application shell

`TRIApp` renders a complete TRI-branded app (header, footer, layout, Cognito auth
gating, feedback button) from a config object:

```jsx
import { createRoot } from 'react-dom/client';
import { TRIApp } from '@toyota-research-institute/rse-react-library';
import '@toyota-research-institute/rse-react-library/style.css';
import config from './tri.app.config';

function App() {
  return <TRIApp config={config} />;
}

createRoot(document.querySelector('#app')).render(<App />);
```

### Optional — extend the Tailwind theme

If your project uses Tailwind and you want to reuse the TRI tokens (colors,
fonts, radii, shadows) in your own utility classes, add the exported preset.
The preset does **not** include `tailwindcss-animate`, so add it yourself for the
components' enter/exit and accordion animations:

```js
// tailwind.config.js
import { tailwindConfig } from '@toyota-research-institute/rse-react-library';

export default {
  presets: [tailwindConfig],
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [require('tailwindcss-animate')],
};
```

## Components

| Category | Components |
| -------- | --------- |
| **App / infrastructure** | `TRIApp`, `CognitoProvider`, `useUserAuth`, `FeedbackButton`, `Highlight` / `Highlighter`, `tailwindConfig` |
| **Form / input** | `Button`, `Input`, `Textarea`, `Label`, `Search`, `Select`, `Multiselect`, `Checkbox`, `Switch`, `RadioGroup`, `Slider`, `Calendar` |
| **Overlays / feedback** | `Dialog`, `Drawer`, `Tooltip`, `Alert`, `Toast` / `Toaster` / `useToast` / `toast` |
| **Display** | `Card`, `Avatar`, `Separator`, `Chip`, `NotificationDot` / `CountBadge`, `List`, `Skeleton`, `Spinner` |
| **Navigation / structure** | `Tabs`, `Accordion`, `Pagination`, `Stepper`, `Table` |

Browse every component, its variants, and props in Storybook (`pnpm dev`).
Source lives under [`lib/components`](lib/components).

## Local development

1. Clone this repository.
2. Install dependencies: `pnpm i` (or `npm i`).
3. Start Storybook: `pnpm dev` → http://localhost:6006.

## Scripts

- `dev`: Starts the local Storybook server — use this to develop and preview components.
- `test`: Runs all tests with Vitest.
- `test:watch`: Runs tests in watch mode.
- `test:ui`: Runs tests with a UI.
- `test:coverage`: Runs tests and generates a coverage report.
- `build`: Builds Storybook as a static web app.
- `build:lib`: Builds the component library with Vite (outputs `dist/`).
- `lint`: Runs ESLint.
- `format`: Formats code with Prettier.
- `typecheck`: Type-checks the project with `tsc`.

## Publishing

Publishing is automated by the `release-package.yml` GitHub Action, which runs
on a new **GitHub Release**: it builds the library (`build:lib`) and runs
`npm publish`. To ship changes: merge to `main`, bump the `version` in
`package.json`, then create a GitHub Release.

## License

MIT

# RSE React Library

This is a collection of react components that RSE uses in majority of React Web projects.

## Features

- React: A JavaScript library for web and native user interfaces.
- TypeScript: A strongly typed superset of JavaScript.
- Tailwind: A utility-first CSS framework.
- Storybook: A frontend workshop for building UI components and pages in isolation.
- Vite: A next generation frontend tooling that runs and builds your library incredibly fast.
- Vitest: A next generation testing framework.
- ESLint: A tool that finds and fixes problems in your code.
- Prettier: A code formatter.
- Husky: A pre-commit hook.
- Github Action: A tool that deploys your Storybook to GitHub page automatically.



## Usage

RSE React Library is available as an [npm package](https://www.npmjs.com/package/@toyota-research-institute/rse-react-library).

```sh
// with npm
npm install @toyota-research-institute/rse-react-library

// with yarn
yarn add @toyota-research-institute/rse-react-library
```

Material Tailwind's `ThemeProvider` must wrap your application for the components to style correctly.
```
import { ThemeProvider } from '@material-tailwind/react';

<ThemeProvider>
    ...
</ThemeProvider>
```

Here is a quick example to get you started:

```jsx
import { createRoot } from 'react-dom/client';
import { TRIApp } from '@toyota-research-institute/rse-react-library';
import '@toyota-research-institute/rse-react-library/style.css';
import config from './tri.app.config';

function App() {
    return <TRIApp config={config} />;
}

createRoot.render(<App />, document.querySelector('#app'));
```

## How to use

1. Clone this repository
2. Install dependencies using `npm i` (or `pnpm i` if you like)


## Get Started

1. Clone this repository
2. Install dependencies using `npm i` (or `pnpm i` if you like)

## Scripts

- `dev`: Starts the local Storybook server, use this to develop and preview your components.
- `test`: Runs all your tests with vitest.
- `test:watch`: Runs tests in watch mode.
- `test:ui`: Runs tests with a UI.
- `test:coverage`: Runs tests and generates a coverage report.
- `build`: Builds your Storybook as a static web application.
- `build:lib`: Builds your component library with Vite.
- `lint`: Runs ESLint.
- `format`: Formats your code with Prettier.

## License

MIT

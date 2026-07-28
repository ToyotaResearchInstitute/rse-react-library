import type { Preview } from '@storybook/react';
import { createElement } from 'react';
// Dev-only Preflight: the shipped library no longer includes Tailwind's reset
// (corePlugins.preflight is off), so Storybook loads it here for fidelity.
// Must come before the library CSS.
import './preflight.css';
import '../lib/global.css';

const preview: Preview = {
  // Wrap every story in `.tri-root` so the opt-in page typography / paint
  // (scoped under .tri-root in tokens.css & global.css) renders in Storybook,
  // mirroring how a consuming app applies the class on its root.
  decorators: [
    (Story) => createElement('div', { className: 'tri-root' }, createElement(Story)),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

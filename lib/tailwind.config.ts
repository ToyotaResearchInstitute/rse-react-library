import type { Config } from 'tailwindcss';

/**
 * Exported TRI Tailwind theme (single source of truth — the repo's root
 * `tailwind.config.js` re-uses this object). Colors/fonts/radii/shadows
 * reference the design-system CSS variables in tokens.css (shipped via the
 * library's style.css).
 *
 * Colors are wrapped in `color-mix(... <alpha-value> ...)` so Tailwind opacity
 * modifiers (e.g. `bg-brand/20`, `ring-error/30`) resolve correctly against the
 * hex-valued CSS variables. Without this the `/<opacity>` utilities silently
 * emit no CSS.
 *
 * IMPORTANT for consumers: this preset does NOT bundle the `tailwindcss-animate`
 * plugin (a build-time tool shouldn't ship in the runtime bundle). Add it
 * yourself so the components' enter/exit + accordion animations work:
 *   import { tailwindConfig } from '@toyota-research-institute/rse-react-library';
 *   export default {
 *     presets: [tailwindConfig],
 *     content: ['./src/** /*.{ts,tsx}'],
 *     plugins: [require('tailwindcss-animate')],
 *   };
 */

/** Wrap a CSS color variable so Tailwind's `<alpha-value>` opacity modifiers work. */
const alpha = (v: string) =>
  `color-mix(in srgb, var(${v}) calc(<alpha-value> * 100%), transparent)`;

const config: Omit<Config, 'content'> = {
  // All utilities are namespaced (`tri-flex`, `tri-bg-background`) so this
  // library's compiled CSS can't collide with a consumer app that also runs
  // Tailwind. Design tokens are likewise namespaced (`--tri-*`) in tokens.css.
  prefix: 'tri-',
  darkMode: ['class'],
  // Do NOT ship Tailwind's Preflight (global reset). A component library must not
  // reset a consumer's elements — the consuming app already applies its own
  // Preflight. Storybook loads Preflight separately for dev fidelity
  // (see .storybook/preview.ts).
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        background: alpha('--tri-bg'),
        foreground: alpha('--tri-fg'),
        card: { DEFAULT: alpha('--tri-bg-elevated'), foreground: alpha('--tri-fg') },
        popover: { DEFAULT: alpha('--tri-bg-elevated'), foreground: alpha('--tri-fg') },
        primary: { DEFAULT: alpha('--tri-neutral-950'), foreground: alpha('--tri-neutral-0') },
        secondary: { DEFAULT: alpha('--tri-bg-muted'), foreground: alpha('--tri-fg') },
        muted: { DEFAULT: alpha('--tri-bg-muted'), foreground: alpha('--tri-fg-muted') },
        accent: { DEFAULT: alpha('--tri-bg-muted'), foreground: alpha('--tri-fg') },
        destructive: { DEFAULT: alpha('--tri-error'), foreground: alpha('--tri-neutral-0') },
        border: alpha('--tri-border'),
        input: alpha('--tri-border'),
        ring: alpha('--tri-border-focus'),
        brand: {
          DEFAULT: alpha('--tri-brand-red'),
          hover: alpha('--tri-brand-red-hover'),
          deep: alpha('--tri-brand-red-deep'),
          ink: alpha('--tri-brand-red-ink'),
          steel: alpha('--tri-brand-steel'),
          sky: alpha('--tri-brand-sky'),
          gray: alpha('--tri-brand-gray'),
          foreground: alpha('--tri-fg-on-brand'),
        },
        info: { DEFAULT: alpha('--tri-info'), bg: alpha('--tri-info-bg') },
        success: { DEFAULT: alpha('--tri-success'), bg: alpha('--tri-success-bg') },
        warning: { DEFAULT: alpha('--tri-warning'), bg: alpha('--tri-warning-bg') },
        error: { DEFAULT: alpha('--tri-error'), bg: alpha('--tri-error-bg') },
        link: { DEFAULT: alpha('--tri-link'), hover: alpha('--tri-link-hover') },
      },
      fontFamily: {
        sans: ['Gellix', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Gellix', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xs: 'var(--tri-radius-xs)',
        sm: 'var(--tri-radius-sm)',
        md: 'var(--tri-radius-md)',
        lg: 'var(--tri-radius-lg)',
        xl: 'var(--tri-radius-xl)',
        '2xl': 'var(--tri-radius-2xl)',
        pill: 'var(--tri-radius-pill)',
      },
      boxShadow: {
        xs: 'var(--tri-shadow-xs)',
        sm: 'var(--tri-shadow-sm)',
        md: 'var(--tri-shadow-md)',
        lg: 'var(--tri-shadow-lg)',
        focus: 'var(--tri-shadow-focus)',
      },
      transitionTimingFunction: {
        out: 'var(--tri-ease-out)',
        std: 'var(--tri-ease-std)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'progress-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(340%)' },
        },
        'dot-bounce': {
          '0%,80%,100%': { opacity: '0.3', transform: 'translateY(0)' },
          '40%': { opacity: '1', transform: 'translateY(-4px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s var(--tri-ease-out)',
        'accordion-up': 'accordion-up 0.2s var(--tri-ease-out)',
        'progress-indeterminate': 'progress-indeterminate 1.6s linear infinite',
        'dot-bounce': 'dot-bounce 1.2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

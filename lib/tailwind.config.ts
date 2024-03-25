/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // TODO: Update this to reflect the actual
    // location of the library package
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Gellix-Regular'],
    },
    extend: {
      fontFamily: {
        medium: ['Gellix-Medium'],
      },
    },
  },
  plugins: [],
});

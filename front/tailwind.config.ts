import type { Config } from "tailwindcss";
const twColors = require('tailwindcss/colors');

const colors = {
  transparent:twColors.transparent,
  black:'#000000',
  yellow:'#F8CB50',
  otherYellow:twColors.yellow,
  neutral:twColors.neutral,
  white:twColors.white,
  green:twColors.green,
  red:twColors.red,
  emerald:twColors.emerald,
  primary:'#9A9A9A',
  secondary:'#333333',
  violet: twColors.violet,
  indigo: twColors.indigo,
  gray: twColors.gray,
  pink:twColors.pink,
  blue:twColors.blue,
}
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

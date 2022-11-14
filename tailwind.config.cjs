/** @type {import('tailwindcss').Config} */
const { unset } = require("lodash");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const resetSelectors = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "figure"];
const resets = {};

resetSelectors.forEach((selector) => {
  resets[selector] = {
    marginTop: null,
    marginBottom: null,
  };
});

module.exports = {
  // darkMode: "media",
  important: true,
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: ({ theme }) => ({
      sans: ["soehne-web", ...defaultTheme.fontFamily.sans],
      serif: ["tiempos-text", ...defaultTheme.fontFamily.serif],
      mono: ["soehne-mono-web", ...defaultTheme.fontFamily.mono],
      "serif-headline": ["tiempos-headline", ...defaultTheme.fontFamily.serif],
    }),
    extend: {
      fontSize: {
        title: `clamp(2rem, 10vmin, 3rem)`,
      },
      gridTemplateRows: {
        base: "auto 1fr auto",
      },
      gridTemplateColumns: {
        "post-card": "1fr auto",
      },
      spacing: {
        inset: "var(--inset-x)",
        feed: "var(--spacing--feed)",
        unset: "unset",
      },
      width: {
        inset: "calc(100% - (2 * var(--inset-x)))",
      },
      maxWidth: {},
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      const themeFontFamilies = theme("fontFamily");
      const fontFamilies = {};

      for (const [key, value] of Object.entries(themeFontFamilies)) {
        fontFamilies[`--font-${key}`] = value.join(", ");
      }

      addBase({
        ":root": {
          "--inset-x": "clamp(1.25rem, 6.25vw, 2rem)",
          ...fontFamilies,
        },
      });
    }),
    plugin(function ({ addVariant }) {
      addVariant("desc", ":where(& *)");
      addVariant("desc-links", ":where(& a)");
    }),
  ],
};

const { fontFamily, fontSize } = require("./constants/fonts");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Font tokens from constants/fonts.js: font-app, font-app-medium, ..., text-caption, text-title, ...
      fontFamily: {
        app: [fontFamily.regular],
        "app-medium": [fontFamily.medium],
        "app-semibold": [fontFamily.semibold],
        "app-bold": [fontFamily.bold],
        "app-extrabold": [fontFamily.extrabold],
      },
      fontSize: Object.fromEntries(
        Object.entries(fontSize).map(([name, [size, lineHeight]]) => [
          name,
          [`${size}px`, { lineHeight: `${lineHeight}px` }],
        ])
      ),
      // Design tokens from Figma — keep in sync with utils/colors.ts
      colors: {
        primary: {
          DEFAULT: "#132D58",
          50: "#D9EFFF",
          100: "#BBE3FF",
          300: "#56BBFF",
        },
        secondary: "#BD8F27",
        success: {
          DEFAULT: "#27C281",
          dark: "#047857",
          darker: "#065F46",
        },
        background: "#FAFAFA",
        surface: "#ECEAE4",
        ink: {
          DEFAULT: "#0B0D10",
          950: "#020617",
          900: "#121316",
          800: "#1E293B",
        },
        muted: "#737378",
        subtle: "#5C6069",
        outline: "#BFBFBF",
        line: "#E2E8F0", // light border on white outline buttons (Welcome)
      },
      borderRadius: {
        input: "12px",
        card: "16px",
      },
    },
  },
  plugins: [],
};
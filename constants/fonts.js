// Font tokens: the single source for tailwind.config.js, app/_layout.tsx (useFonts) and TS code.
// App font = Inter (as in the Figma design). To change it, swap the family names here
// and the font imports in app/_layout.tsx. Nothing else needs to change.

/** Font family per weight. Values are the names registered with useFonts. */
const fontFamily = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extrabold: "Inter_800ExtraBold",
};

/** Text sizes as [fontSize, lineHeight] in px. caption/label come from the Figma type styles. */
const fontSize = {
  micro: [10, 15],     // Inter SemiBold 10/15: "GOD IS ONE" divider, small eyebrows
  caption: [11, 16.5], // Inter/Regular 11/16.5: footer, terms, helper text
  label: [12, 16],     // Body/Bold/12: input labels, small buttons
  body: [14, 20],
  button: [15, 20],
  title: [20, 28],
  heading: [24, 32],
};

module.exports = { fontFamily, fontSize };

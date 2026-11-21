// Design color tokens from Figma (fc_creator || Church app, Auth section variables).
// Keep in sync with `theme.extend.colors` in tailwind.config.js.
// Use these where a className can't be used (icons, ActivityIndicator, navigation options).
export const colors = {
    primary: "#132D58",       // Main Color — navy buttons, titles
    primary50: "#D9EFFF",     // Main Color's Foundation/2
    primary100: "#BBE3FF",    // Main Color's Foundation/3
    primary300: "#56BBFF",    // Main Color's Foundation/5
    secondary: "#BD8F27",     // Secondary Color — gold ("GOD IS ONE" divider)
    success: "#27C281",       // Success
    successDark: "#047857",   // spring green/24 — success text
    successDarker: "#065F46", // spring green/20
    background: "#FAFAFA",    // BG
    surface: "#ECEAE4",       // Cararra — info boxes ("What happens next?")
    white: "#FFFFFF",
    black: "#0B0D10",         // Accent/Black — body text
    ink950: "#020617",        // blue/5
    ink900: "#121316",        // Woodsmoke
    ink800: "#1E293B",        // azure/17
    ink700: "#334155",        // input labels
    ink500: "#64748B",        // feature-card text
    muted: "#737378",         // Black Foundation/6 — secondary text
    subtle: "#5C6069",        // Shuttle Gray — captions, footer
    outline: "#BFBFBF",       // Accent/Outline — input and outline-button borders
    line: "#E2E8F0",          // light border on white outline buttons and inputs
    placeholder: "#94A3B8",   // input placeholder
};

// src/styles/theme.ts
export const theme = {
  fonts: {
    logo: {
      fontFamily: "BagelFatOne-Regular",
      fontSize: "30px",
    },
  },
  colors: {
    primary: "#689E3E",
    logo: "#2C5917",
    black: "#333",
    white: "#fff",
    gray: "#F7F8FA",
    gray2: "#BFBFBF",
    gray3: "#A3A3A3",
  },
} as const;

export type ThemeType = typeof theme;
export default theme;

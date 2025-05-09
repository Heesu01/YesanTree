// src/styles/theme.ts
export const theme = {
  fonts: {
    logo: {
      fontFamily: "'BagelFatOne-Regular', sans-serif",
      fontSize: "30px",
    },
  },
  colors: {
    primary: "#689E3E",
    black: "#333",
    white: "#fff",
  },
} as const;

export type ThemeType = typeof theme;
export default theme;

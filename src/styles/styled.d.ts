// src/styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      logo: {
        fontFamily: string;
        fontSize: string;
      };
      title: {
        fontFamily: string;
      };
    };
    colors: {
      primary: string;
      logo: string;
      black: string;
      white: string;
      gray: string;
      gray2: string;
      gray3: string;
    };
  }
}

// src/styles/globalStyle.ts
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./font.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    margin: 0;
    padding: 0;
    border: 0;
    text-decoration: none;
    box-sizing: border-box;
    color:#333;
    &:visited {
      text-decoration: none;
      color: #333;
    }
  }

  html, body {
    line-height: 1;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  ol, ul {
    list-style: none;
  }
  button {
    border: 0;
    cursor: pointer;
  }
`;

export default GlobalStyle;

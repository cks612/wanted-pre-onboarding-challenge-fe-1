import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
  *{
    box-sizing:border-box;
  }
  html,body{

    font-family: 'Lobster', cursive;
    font-family: 'Noto Sans KR', sans-serif;

   }

`;

export default GlobalStyles;

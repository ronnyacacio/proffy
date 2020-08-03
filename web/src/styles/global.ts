import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    background: var(--background);
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body, input, button, textarea {
    font: 500 1.6rem Poppins;
  }

  .container {
    width: 90vw;
    max-width: 700px;
  }

  @media(min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }

  :root {
    --background: #f0f0f7;
    --primary-lighter: #9871f5;
    --primary-light: #916bea;
    --primary: #8257e5;
    --primary-dark: #774dd6;
    --primary-darker: #6842c2;
    --secundary: #04d361;
    --secundary-dark: #04bf58;
    --title-in-primary: #ffffff;
    --text-in-primary: #d4c2ff;
    --text-title: #32264d;
    --text-complement: #9c98a6;
    --text-base: #6a6180;
    --line-in-white: #e6e6f0;
    --input-background: #f8f8fc;
    --button-text: #ffffff;
    --box-base: #ffffff;
    --box-footer: #fafafc;

    font-size: 60%;
  }
`;

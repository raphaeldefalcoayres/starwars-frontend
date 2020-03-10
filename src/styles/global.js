import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

* {
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  *:focus{
    outline:0;
  }

  html, body, #root{
    height:100%;
  }

  body{
    -webkit-font-smoothing: antialiased;
    background:#1C2938;
    color:#fff;
  }

  body, input, button{
    font:1rem 'Nunito', sans-serif;
  }

`;

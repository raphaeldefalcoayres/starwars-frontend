import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&display=swap');

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
  }

  body, input, button{
    font:1rem 'Nunito', sans-serif;
  }

`;

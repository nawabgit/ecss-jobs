import React from "react";
import ReactDOM from "react-dom";
import Jobs from "./Jobs";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  html, body {
    margin: 0;
    padding: 0;
    background: #F7F8FB;
    font-size: 14pt;
    font-family: Roboto, sans-serif;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: gray gray;
  }
  
  *::-webkit-scrollbar {
    width: 4px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 20px;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Jobs />
  </React.StrictMode>,
  document.getElementById("root")
);

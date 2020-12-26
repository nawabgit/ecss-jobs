import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import axios from "axios";

import Jobs from "features/jobs/Jobs";
import { BrowserRouter as Router } from "react-router-dom";
import App from "App";
import { Provider } from "react-redux";
import store from "store";

// Add /api/ prefix if we are on production
export const api = axios.create({
  baseURL: process.env.NODE_ENV == "production" ? "/api/" : "",
});

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
  }

  html, body, #root, #root>div {
    height: 100%
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #F7F8FB;
    font-size: 12pt;
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
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <GlobalStyle />
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById("root")
);

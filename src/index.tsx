/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import WebFont from 'webfontloader';
import theme from './style/theme';
import App from './App';
import * as serviceWorker from './serviceWorker';

WebFont.load({
  google: {
    families: ['Bebas Neue:400', 'Roboto:300, 400, 500, 600, 700'],
  },
});

const MyGlobalStyle = createGlobalStyle`
   body {
    margin: 0;
    box-sizing: border-box;
    background-color: ${({ theme }): string => theme.background};
    color: ${({ theme }): string => theme.white};
    font-family: ${({ theme }): string => theme.fonts.body};
   }; 
   *, ::after, ::before {
    box-sizing: border-box;
   }`;


ReactDOM.render(

  <ThemeProvider theme={theme}>
    <MyGlobalStyle />
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

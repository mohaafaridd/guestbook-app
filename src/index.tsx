import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Context } from './context';

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <Context>
      <App />
    </Context>
  </ThemeProvider>,
  document.getElementById('root')
);

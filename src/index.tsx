import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Context } from './context';
import { Apollo } from './Apollo';

ReactDOM.render(
  <Apollo>
    <ThemeProvider>
      <CSSReset />
      <Context>
        <App />
      </Context>
    </ThemeProvider>
  </Apollo>,
  document.getElementById('root')
);

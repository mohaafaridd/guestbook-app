import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { Context } from './context';
import { Apollo } from './Apollo';

ReactDOM.render(
  <Context>
    <Apollo>
      <ThemeProvider>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Apollo>
  </Context>,
  document.getElementById('root')
);

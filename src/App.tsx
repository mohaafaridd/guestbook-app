import React from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Error } from './pages/Error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Flex } from '@chakra-ui/core';

export const App = () => {
  return (
    <Router>
      <Flex flexDir='column' minH='100vh'>
        <aside>
          <Nav />
        </aside>
        <Flex flexDir='column' flexGrow={1}>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route component={Error} />
          </Switch>
        </Flex>
      </Flex>
    </Router>
  );
};

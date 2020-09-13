import React from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Error } from './pages/Error';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from './components/Nav';

export const App = () => {
  return (
    <Router>
      <div id='router'>
        <aside>
          <Nav />
        </aside>
        <main id='main'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

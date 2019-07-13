import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import MovieList from './containers/MovieList';
import NotFound from './containers/NotFound';
import PrivateRouter from './containers/routing/PrivateRouter';
import Watch from './containers/Watch';
import ProfilePage from './containers/ProfilePage';

// Testing
import Playground from './containers/Playground';

const Routes = props => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup} />
      <Route path='/playground' exact component={Playground} />
      <PrivateRouter path='/watch/:id' exact component={Watch} />
      <PrivateRouter path='/movielist' exact component={MovieList} />
      <PrivateRouter path='/me' exact component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {};

export default Routes;

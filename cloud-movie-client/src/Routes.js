import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import MovieList from './containers/MovieList';
import NotFound from './containers/NotFound';
import PrivateRouter from './containers/routing/PrivateRouter';
import Playground from './containers/Playground';
import PlayerPage from './containers/PlayerPage';

const Routes = props => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup} />
      <Route path='/playground' exact component={Playground} />
      <PrivateRouter path='/movie/:genre/:title' exact component={PlayerPage} />
      <PrivateRouter path='/movielist' exact component={MovieList} />
      <Route component={NotFound} />
    </Switch>
  );
};

Routes.propTypes = {};

export default Routes;

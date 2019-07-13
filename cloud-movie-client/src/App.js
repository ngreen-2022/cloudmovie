import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './Navigation';
import Routes from './Routes';
import './App.css';
import { loadUser } from './actions/auth';
import { loadProfile } from './actions/profile';

const App = () => {
  useEffect(() => {
    store.dispatch(loadProfile());
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className='App container'>
        <Navigation />
        <Routes />
      </div>
    </Provider>
  );
};

export default App;

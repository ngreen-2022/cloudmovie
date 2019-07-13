import { combineReducers } from 'redux';
import auth from './auth';
import movies from './movies';
import profile from './profile';

export default combineReducers({
  auth,
  movies,
  profile
});

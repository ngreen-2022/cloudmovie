import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_CONFIRM
} from './types';
import Auth from '@aws-amplify/auth';
import { API } from 'aws-amplify';

export const register = ({ email, password }) => async dispatch => {
  try {
    await Auth.signUp(email, password);

    dispatch({ type: REGISTER_SUCCESS });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const registerConfirm = ({
  email,
  password,
  confirmationCode
}) => async dispatch => {
  try {
    await Auth.confirmSignUp(email, confirmationCode);
    const user = await Auth.signIn(email, password);

    // const movies = await API.get('movies', '/movies');

    // console.log(movies);

    await API.post('movies', '/createUser');

    dispatch({ type: REGISTER_CONFIRM, payload: user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const loadUser = () => async dispatch => {
  try {
    const user = await Auth.currentSession();

    dispatch({ type: USER_LOADED, payload: user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const user = await Auth.signIn(email, password);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
  } catch (err) {
    alert(err.message);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  await Auth.signOut();
  dispatch({ type: LOGOUT });
};

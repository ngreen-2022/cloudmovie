import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_CONFIRM,
  BEGIN_USER_LOAD,
} from './types';
import Auth from '@aws-amplify/auth';
import { API } from 'aws-amplify';

export const register = ({ email, name, password }) => async (dispatch) => {
  try {
    await Auth.signUp(email, password);

    dispatch({ type: REGISTER_SUCCESS });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const registerConfirm = ({
  email,
  name,
  password,
  confirmationCode,
}) => async (dispatch) => {
  try {
    await Auth.confirmSignUp(email, confirmationCode);
    const user = await Auth.signIn(email, password);

    // const movies = await API.get('movies', '/movies');

    // console.log(movies);

    await API.post('movies', '/createUser', {
      body: {
        name,
      },
    });

    dispatch({ type: REGISTER_CONFIRM, payload: user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch({ type: BEGIN_USER_LOAD });
  try {
    const authUser = await Auth.currentAuthenticatedUser();

    dispatch({ type: USER_LOADED, payload: authUser });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const user = await Auth.signIn(email, password);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (err) {
    alert(err.message);

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  await Auth.signOut();
  dispatch({ type: LOGOUT });
};

import {
  GET_PROFILE,
  PROFILE_ERROR,
  FILL_USER_LIKES,
  UPDATE_LIKE_IDS,
  USER_LOADED,
  BEGIN_USER_LOAD,
  FINISH_USER_LIKES
} from './types';
import { API } from 'aws-amplify';

export const loadProfile = () => async dispatch => {
  dispatch({ type: BEGIN_USER_LOAD });
  try {
    const profile = await API.get('movies', '/getUser');
    dispatch({ type: USER_LOADED, payload: profile });
  } catch (e) {
    dispatch({ type: PROFILE_ERROR });
  }
};

export const getCurrentProfile = () => async dispatch => {
  dispatch({ type: BEGIN_USER_LOAD });
  try {
    const res = await API.get('movies', '/getUser');

    dispatch({
      type: GET_PROFILE,
      payload: res
    });

    for (const like of res.likes) {
      const movie = await API.get('movies', `/movie/${like}`);
      const { id, title, genre, description } = movie[0];
      const movieMd = {
        id,
        title,
        genre,
        description
      };

      dispatch({ type: FILL_USER_LIKES, payload: movieMd });
    }
    dispatch({ type: FINISH_USER_LIKES });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const addMovieToLikes = likes => async dispatch => {
  try {
    await API.put('movies', '/updateLikes', {
      body: { likes }
    });

    dispatch({ type: UPDATE_LIKE_IDS, payload: likes });
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

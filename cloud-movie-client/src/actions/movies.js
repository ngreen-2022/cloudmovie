import {
  GET_MOVIES_BEGIN,
  GET_MOVIES_FAIL,
  GET_HORROR_SUCCESS,
  GET_DRAMA_SUCCESS,
  GET_FANTASY_SUCCESS
} from '../actions/types';

import { API } from 'aws-amplify';

export const getMovies = genre => async dispatch => {
  dispatch({ type: GET_MOVIES_BEGIN });

  try {
    const movieList = await API.get('movies', `/list/${genre}`);
    if (genre === 'horror') {
      dispatch({ type: GET_HORROR_SUCCESS, payload: movieList });
    } else if (genre === 'drama') {
      dispatch({ type: GET_DRAMA_SUCCESS, payload: movieList });
    } else if (genre === 'fantasy') {
      dispatch({ type: GET_FANTASY_SUCCESS, payload: movieList });
    }
  } catch (err) {
    dispatch({ type: GET_MOVIES_FAIL });
  }
};

export const getHorror = () => async dispatch => {
  dispatch({ type: GET_MOVIES_BEGIN });

  try {
    const horrorList = await API.get('movies', '/list/horror');
    dispatch({ type: GET_HORROR_SUCCESS, payload: horrorList });
  } catch (err) {
    dispatch({ type: GET_MOVIES_FAIL });
  }
};

export const getDrama = () => async dispatch => {
  dispatch({ type: GET_MOVIES_BEGIN });

  try {
    const dramaList = await API.get('movies', '/list/drama');
    dispatch({ type: GET_HORROR_SUCCESS, payload: dramaList });
  } catch (err) {
    dispatch({ type: GET_MOVIES_FAIL });
  }
};

export const getFantasy = () => async dispatch => {
  dispatch({ type: GET_MOVIES_BEGIN });

  try {
    const fantasyList = await API.get('movies', '/list/drama');
    dispatch({ type: GET_HORROR_SUCCESS, payload: fantasyList });
  } catch (err) {
    dispatch({ type: GET_MOVIES_FAIL });
  }
};

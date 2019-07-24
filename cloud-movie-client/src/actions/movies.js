import {
  GET_MOVIES_BEGIN,
  GET_MOVIES_FAIL,
  GET_MOVIE_SUCCESS,
  GET_HORROR_SUCCESS,
  GET_DRAMA_SUCCESS,
  GET_DOCUMENTARY_SUCCESS,
  GET_COMEDY_SUCCESS,
  GET_MYSTERY_SUCCESS,
  GET_SCIFI_SUCCESS
} from '../actions/types';

import { API } from 'aws-amplify';

export const getMovieById = movieId => async dispatch => {
  dispatch({ type: GET_MOVIES_BEGIN });

  try {
    const movie = await API.get('movies', `/movie/${movieId}`);
    const { id, title, content, genre, description } = movie[0];
    const movieMd = {
      id,
      title,
      content,
      genre,
      description
    };

    dispatch({ type: GET_MOVIE_SUCCESS, payload: movieMd });
  } catch (e) {
    dispatch({ type: GET_MOVIES_FAIL });
  }
};

export const getMovies = genre => async dispatch => {
  dispatch({ type: GET_MOVIES_BEGIN });

  try {
    const movieList = await API.get('movies', `/list/${genre}`);
    if (genre === 'horror') {
      dispatch({ type: GET_HORROR_SUCCESS, payload: movieList });
    } else if (genre === 'drama') {
      dispatch({ type: GET_DRAMA_SUCCESS, payload: movieList });
    } else if (genre === 'documentary') {
      dispatch({ type: GET_DOCUMENTARY_SUCCESS, payload: movieList });
    } else if (genre === 'comedy') {
      dispatch({ type: GET_COMEDY_SUCCESS, payload: movieList });
    } else if (genre === 'mystery') {
      dispatch({ type: GET_MYSTERY_SUCCESS, payload: movieList });
    } else if (genre === 'scifi') {
      dispatch({ type: GET_SCIFI_SUCCESS, payload: movieList });
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

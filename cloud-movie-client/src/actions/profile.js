import { GET_PROFILE, PROFILE_ERROR, FILL_USER_LIKES } from './types';
import { API } from 'aws-amplify';
import { getMovieById } from './movies';

export const getCurrentProfile = () => async dispatch => {
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
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

import {
  GET_MOVIES_BEGIN,
  GET_MOVIE_SUCCESS,
  GET_HORROR_SUCCESS,
  GET_DRAMA_SUCCESS,
  GET_FANTASY_SUCCESS,
  GET_MOVIES_FAIL
} from '../actions/types';

const initialState = {
  movie: {},
  horrorList: [],
  dramaList: [],
  fantasyList: [],
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIES_BEGIN:
      return {
        ...state
      };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        movie: payload,
        loading: false
      };
    case GET_HORROR_SUCCESS:
      return {
        ...state,
        horrorList: payload,
        loading: false
      };
    case GET_DRAMA_SUCCESS:
      return {
        ...state,
        dramaList: payload,
        loading: false
      };
    case GET_FANTASY_SUCCESS:
      return {
        ...state,
        fantasyList: payload,
        loading: false
      };
    case GET_MOVIES_FAIL:
      return {
        ...state,
        moviesList: [],
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}

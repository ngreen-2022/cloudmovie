import {
  GET_MOVIES_BEGIN,
  GET_MOVIE_SUCCESS,
  GET_HORROR_SUCCESS,
  GET_DRAMA_SUCCESS,
  GET_MOVIES_FAIL,
  GET_DOCUMENTARY_SUCCESS,
  GET_COMEDY_SUCCESS,
  GET_MYSTERY_SUCCESS,
  GET_SCIFI_SUCCESS
} from '../actions/types';

const initialState = {
  movie: {},
  horrorList: [],
  dramaList: [],
  documentaryList: [],
  comedyList: [],
  mysteryList: [],
  scifiList: [],
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
    case GET_DOCUMENTARY_SUCCESS:
      return {
        ...state,
        documentaryList: payload,
        loading: false
      };
    case GET_COMEDY_SUCCESS:
      return {
        ...state,
        comedyList: payload,
        loading: false
      };
    case GET_MYSTERY_SUCCESS:
      return {
        ...state,
        mysteryList: payload,
        loading: false
      };
    case GET_SCIFI_SUCCESS:
      return {
        ...state,
        scifiList: payload,
        loading: false
      };
    case GET_MOVIES_FAIL:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    default:
      return state;
  }
}

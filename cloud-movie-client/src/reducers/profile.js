import {
  GET_PROFILE,
  PROFILE_ERROR,
  FILL_USER_LIKES,
  UPDATE_LIKE_IDS,
  USER_LOADED,
  BEGIN_USER_LOAD,
  FINISH_USER_LIKES
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  userLikes: [],
  likeIds: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BEGIN_USER_LOAD:
      return {
        ...state,
        loading: true
      };
    case USER_LOADED:
      return {
        ...state,
        likeIds: payload.likes,
        profile: payload,
        userLikes: [],
        loading: false
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: true
      };
    case UPDATE_LIKE_IDS:
      return {
        ...state,
        likeIds: payload,
        loading: false
      };
    case FILL_USER_LIKES:
      return {
        ...state,
        userLikes: [...state.userLikes, payload],
        loading: true
      };
    case FINISH_USER_LIKES:
      return {
        ...state,
        userLikes: [...state.userLikes],
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}

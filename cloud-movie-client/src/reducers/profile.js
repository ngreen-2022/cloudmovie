import { GET_PROFILE, PROFILE_ERROR, FILL_USER_LIKES } from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  userLikes: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload
      };
    case FILL_USER_LIKES:
      return {
        ...state,
        userLikes: [...state.userLikes, payload],
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

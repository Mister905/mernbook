import { GET_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initial_state = {
  profile: null,
  profiles: [],
  loading_profile: true,
  loading_profiles: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading_profile: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading_profile: false
      };
    default:
      return state;
  }
}

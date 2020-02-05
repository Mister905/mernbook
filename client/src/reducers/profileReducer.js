import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_PROFILE_BY_ID,
  UPLOAD_PROFILE_IMAGE
} from "../actions/types";

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
    case CLEAR_PROFILE:
      return {
        profile: null,
        profiles: [],
        loading_profile: true,
        loading_profiles: true
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading_profiles: false
      };
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profile: payload,
        loading_profile: false
      };
    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        profile: payload,
        loading_profile: true
      };
    default:
      return state;
  }
}

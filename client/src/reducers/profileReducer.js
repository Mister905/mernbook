import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  GET_EXPERIENCE_ITEM,
  GET_EDUCATION_ITEM,
  DELETE_EXPERIENCE_ITEM,
  DELETE_EDUCATION_ITEM,
  UPDATE_EXPERIENCE_ITEM,
  UPDATE_EDUCATION_ITEM,
  CLEAR_ACTIVE_EXPERIENCE,
  CLEAR_ACTIVE_EDUCATION
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

    default:
      return state;
  }
}

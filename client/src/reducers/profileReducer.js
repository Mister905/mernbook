import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  GET_EXPERIENCE_ITEM,
  GET_EDUCATION_ITEM
} from "../actions/types";

const initial_state = {
  active_profile: null,
  profiles: [],
  loading_profile: true,
  loading_profiles: true,
  active_experience_item: null,
  loading_active_experience: true,
  active_education_item: null,
  loading_active_education: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        active_profile: payload,
        loading_profile: false
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        active_profile: payload,
        loading_profile: false
      };
    case CREATE_EXPERIENCE:
      return {
        ...state,
        active_profile: payload,
        loading_profile: false
      };
    case CREATE_EXPERIENCE:
      return {
        ...state,
        active_profile: payload,
        loading_profile: false
      };
    case GET_EXPERIENCE_ITEM:
      return {
        ...state,
        active_experience_item: payload,
        loading_active_experience: false
      };
    case GET_EDUCATION_ITEM:
      return {
        ...state,
        active_education_item: payload,
        loading_active_education: false
      };
    default:
      return state;
  }
}

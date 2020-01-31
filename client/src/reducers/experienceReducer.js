import {
  CREATE_EXPERIENCE,
  GET_EXPERIENCE_ITEM,
  DELETE_EXPERIENCE_ITEM,
  UPDATE_EXPERIENCE_ITEM
} from "../actions/types";

const initial_state = {
  active_experience_item: null,
  loading_active_experience: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_EXPERIENCE:
      return {
        ...state,
        profile: payload,
        loading_profile: false
      };

    case GET_EXPERIENCE_ITEM:
      return {
        ...state,
        active_experience_item: payload,
        loading_active_experience: false
      };

    case DELETE_EXPERIENCE_ITEM:
      return {
        ...state,
        loading_profile: true
      };

    case UPDATE_EXPERIENCE_ITEM:
      return {
        ...state,
        profile: payload
      };
    default:
      return state;
  }
}

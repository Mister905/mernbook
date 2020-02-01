import {
  GET_EXPERIENCE,
  CREATE_EXPERIENCE,
  GET_EXPERIENCE_ITEM,
  DELETE_EXPERIENCE_ITEM,
  UPDATE_EXPERIENCE_ITEM
} from "../actions/types";

const initial_state = {
  experience_list: [],
  loading_experience_list: true,
  active_experience_item: null,
  loading_active_experience: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EXPERIENCE:
      return {
        ...state,
        experience_list: payload,
        loading_experience_list: false
      };

    case CREATE_EXPERIENCE:
      return {
        ...state,
        experience_list: payload,
        loading_experience_list: true
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
        loading_active_experience: true,
        loading_experience_list: true
      };

    case UPDATE_EXPERIENCE_ITEM:
      return {
        ...state,
        active_education_item: payload,
        loading_active_experience: true,
        loading_experience_list: true
      };
    default:
      return state;
  }
}

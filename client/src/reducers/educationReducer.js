import {
  GET_EXPERIENCE,
  CREATE_EDUCATION,
  GET_EDUCATION_ITEM,
  DELETE_EDUCATION_ITEM,
  UPDATE_EDUCATION_ITEM,
  GET_EDUCATION,
  ACCOUNT_EDUCATION_DELETED
} from "../actions/types";

const initial_state = {
  education_list: [],
  loading_education_list: true,
  active_education_item: null,
  loading_active_education: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EDUCATION:
      return {
        ...state,
        education_list: payload,
        loading_education_list: false
      };

    case CREATE_EDUCATION:
      return {
        ...state,
        education_list: payload,
        loading_education_list: true
      };

    case GET_EDUCATION_ITEM:
      return {
        ...state,
        active_education_item: payload,
        loading_active_education: false
      };

    case DELETE_EDUCATION_ITEM:
      return {
        ...state,
        loading_active_education: true,
        loading_education_list: true
      };

    case UPDATE_EDUCATION_ITEM:
      return {
        ...state,
        active_education_item: payload,
        loading_active_education: true,
        loading_education_list: true
      };
    case ACCOUNT_EDUCATION_DELETED:
      return {
        education_list: [],
        loading_education_list: true,
        active_education_item: null,
        loading_active_education: true
      };
    default:
      return state;
  }
}

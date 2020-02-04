import {
  GET_COMMENTS,
  COMMENT_CREATED,
  COMMENT_DELETED,
  GET_COMMENT_BY_ID,
  UPDATE_EDUCATION_ITEM,
  UPDATE_COMMENT
} from "../actions/types";

const initial_state = {
  comments: [],
  comment: {},
  loading_comments: true,
  loading_comment: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading_comments: false
      };
    case COMMENT_CREATED:
      return {
        ...state,
        loading_comments: true
      };
    case GET_COMMENT_BY_ID:
      return {
        ...state,
        comment: payload,
        loading_comment: false
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: payload,
        loading_comment: false,
        loading_comments: true
      };
    default:
      return state;
  }
}

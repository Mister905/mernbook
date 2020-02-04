import {
  GET_COMMENTS,
  COMMENT_CREATED,
  COMMENT_DELETED
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

    default:
      return state;
  }
}

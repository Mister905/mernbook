import { GET_POSTS } from "../actions/types";

const initial_state = {
  posts: [],
  post: {},
  loading_posts: true,
  loading_post: true
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading_posts: false
      };
    default:
      return state;
  }
}

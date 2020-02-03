import { GET_POSTS, UPDATE_LIKES } from "../actions/types";

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
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id
            ? { ...post, likes: payload.likes }
            : post
        ),
        loading: false
      };
    default:
      return state;
  }
}

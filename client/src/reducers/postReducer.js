import {
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST_BY_ID,
  CREATE_POST,
  GET_POSTS_BY_USER_ID,
  CLEAR_PROFILE,
  CLEAR_POSTS
} from "../actions/types";

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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading_posts: true
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        post: payload,
        loading_post: false
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading_posts: true
      };
    case GET_POSTS_BY_USER_ID:
      return {
        ...state,
        posts: payload,
        loading_posts: false
      };
    case CLEAR_POSTS:
      return {
        posts: [],
        post: {},
        loading_posts: true,
        loading_post: true
      };
    default:
      return state;
  }
}

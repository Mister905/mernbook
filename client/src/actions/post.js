import {
  GET_POSTS,
  CREATE_POST,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST_BY_ID,
  GET_POSTS_BY_USER_ID,
  CLEAR_POSTS
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_posts = () => async dispatch => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const create_post = (
  profile_id,
  form_data,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  form_data.profile_id = profile_id;

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/api/post", request_body, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Post Created"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Create Post"));
  }
};

export const add_like = post_id => async dispatch => {
  try {
    console.log(post_id);
    const res = await axios.put(`/api/post/${post_id}/like`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const remove_like = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/post/${post_id}/unlike`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_post = (post_id, history) => async dispatch => {
  try {
    const res = await axios.delete(`/api/post/${post_id}`);
    dispatch({
      type: DELETE_POST,
      payload: post_id
    });
    history.push("/");
    dispatch(create_alert("success", "Post Deleted"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Delete Post"));
  }
};

export const get_post_by_id = post_id => async dispatch => {
  try {
    const res = await axios.get(`/api/post/${post_id}`);
    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_posts_by_user_id = user_id => async dispatch => {
  try {
    const res = await axios.get(`/api/post/user/${user_id}`);
    dispatch({
      type: GET_POSTS_BY_USER_ID,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const clear_posts = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_POSTS
    });
  } catch (error) {
    console.log(error);
  }
};

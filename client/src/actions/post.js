import { GET_POSTS, CREATE_POST, UPDATE_LIKES } from "./types";
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

export const create_post = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

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
    console.log(post_id)
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

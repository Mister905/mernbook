import {
  COMMENT_CREATED,
  COMMENT_DELETED,
  GET_COMMENTS,
  GET_COMMENT_BY_ID,
  UPDATE_COMMENT
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_comments = post_id => async dispatch => {
  try {
    const res = await axios.get(`/api/comment/post/${post_id}`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const create_comment = (comment_data, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { post_id } = comment_data;

    let request_body = JSON.stringify(comment_data);

    const res = await axios.post(
      `/api/comment/post/${post_id}`,
      request_body,
      config
    );

    dispatch({
      type: COMMENT_CREATED,
      payload: res.data
    });

    dispatch(create_alert("success", "Comment Posted"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Post Comment"));
  }
};

export const delete_comment = (comment_id, history) => async dispatch => {};

export const update_comment = (
  post_id,
  comment_id,
  comment_data,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(comment_data);

  try {
    const res = await axios.put(
      `/api/comment/${comment_id}`,
      request_body,
      config
    );

    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data
    });

    history.push(`/post/${post_id}`);

    dispatch(create_alert("success", "Updated Comment"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Update Comment"));
  }
};

export const get_comment_by_id = comment_id => async dispatch => {
  try {
    const res = await axios.get(`/api/comment/${comment_id}`);
    dispatch({
      type: GET_COMMENT_BY_ID,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

import {
  CREATE_EDUCATION,
  GET_EDUCATION_ITEM,
  DELETE_EDUCATION_ITEM,
  UPDATE_EDUCATION_ITEM,
  GET_EDUCATION,
  ACCOUNT_EDUCATION_DELETED
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_education = () => async dispatch => {
  try {
    const res = await axios.get("/api/education");
    dispatch({
      type: GET_EDUCATION,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const create_education = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/api/education", request_body, config);
    dispatch({
      type: CREATE_EDUCATION,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Education Created"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Create Experience"));
  }
};

export const get_active_education = education_item_id => async dispatch => {
  try {
    const res = await axios.get(`/api/education/${education_item_id}`);

    dispatch({
      type: GET_EDUCATION_ITEM,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Get Education Item"));
  }
};

export const update_education = (
  education_item_id,
  form_data,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.put(
      `/api/education/${education_item_id}`,
      request_body,
      config
    );

    dispatch({
      type: UPDATE_EDUCATION_ITEM,
      payload: res.data
    });

    history.push(`/education/${education_item_id}`);

    dispatch(create_alert("success", "Updated Education Record"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Update Education Record"));
  }
};

export const delete_education = (
  education_item_id,
  history
) => async dispatch => {
  try {
    const res = await axios.delete(`/api/education/${education_item_id}`);
    dispatch({
      type: DELETE_EDUCATION_ITEM,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Experience Record Deleted"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Delete Education Item"));
  }
};

export const delete_account_education = history => async dispatch => {
  try {
    const res = await axios.delete(`/api/education`);
    dispatch({
      type: ACCOUNT_EDUCATION_DELETED
    });
  } catch (error) {
    console.log(error.message);
  }
};

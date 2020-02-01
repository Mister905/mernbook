import {
  CREATE_EXPERIENCE,
  GET_EXPERIENCE_ITEM,
  DELETE_EXPERIENCE_ITEM,
  UPDATE_EXPERIENCE_ITEM,
  GET_EXPERIENCE,
  ACCOUNT_EXPERIENCE_DELETED
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_experience = () => async dispatch => {
  try {
    const res = await axios.get("/api/experience");
    dispatch({
      type: GET_EXPERIENCE,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const create_experience = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/api/experience", request_body, config);
    dispatch({
      type: CREATE_EXPERIENCE,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Experience Created"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Create Experience"));
  }
};

export const get_experience_by_id = experience_item_id => async dispatch => {
  try {
    const res = await axios.get(`/api/experience/${experience_item_id}`);
    dispatch({
      type: GET_EXPERIENCE_ITEM,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Get Experience Item"));
  }
};

export const delete_experience = (
  experience_item_id,
  history
) => async dispatch => {
  try {
    const res = await axios.delete(`/api/experience/${experience_item_id}`);
    dispatch({
      type: DELETE_EXPERIENCE_ITEM,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Experience Record Deleted"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Delete Experience Item"));
  }
};

export const update_experience = (
  experience_item_id,
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
      `/api/experience/${experience_item_id}`,
      request_body,
      config
    );

    dispatch({
      type: UPDATE_EXPERIENCE_ITEM,
      payload: res.data
    });

    history.push(`/experience/${experience_item_id}`);
    dispatch(create_alert("success", "Experience Record Updated"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Update Experience Record"));
  }
};

export const delete_account_experience = history => async dispatch => {
  try {
    const res = await axios.delete(`/api/experience`);
    dispatch({
      type: ACCOUNT_EXPERIENCE_DELETED
    });
  } catch (error) {
    console.log(error.message);
  }
};
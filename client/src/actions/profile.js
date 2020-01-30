import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  GET_EXPERIENCE_ITEM,
  GET_EDUCATION_ITEM
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_current_profile = () => async dispatch => {
  try {
    const res = await axios.get("/profiles/active");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const update_profile = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.put("/profiles/update", request_body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Update Successful"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Update Failed"));
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
    const res = await axios.post("/profiles/experience", request_body, config);
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

export const create_education = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/profiles/education", request_body, config);
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
    const res = await axios.get(`/profiles/education/${education_item_id}`);
    dispatch({
      type: GET_EDUCATION_ITEM,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Get Education Item"));
  }
};

export const get_active_experience = experience_item_id => async dispatch => {
  try {
    const res = await axios.get(`/profiles/experience/${experience_item_id}`);
    dispatch({
      type: GET_EXPERIENCE_ITEM,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Get Experience Item"));
  }
};
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  CREATE_EXPERIENCE,
  CREATE_EDUCATION,
  GET_EXPERIENCE_ITEM,
  GET_EDUCATION_ITEM,
  DELETE_EXPERIENCE_ITEM,
  DELETE_EDUCATION_ITEM,
  UPDATE_EXPERIENCE_ITEM,
  UPDATE_EDUCATION_ITEM,
  CLEAR_ACTIVE_EXPERIENCE,
  CLEAR_ACTIVE_EDUCATION
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_profile = () => async dispatch => {
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

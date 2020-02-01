import { GET_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE, GET_PROFILES } from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_profile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles/active");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const get_profiles = () => async dispatch => {
  try {
    const res = await axios.get("/api/profiles");
    dispatch({
      type: GET_PROFILES,
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
    const res = await axios.put("/api/profiles/update", request_body, config);
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

export const clear_profile = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });
};

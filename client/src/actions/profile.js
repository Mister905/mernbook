import {
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_PROFILE_BY_ID,
  UPLOAD_PROFILE_IMAGE
} from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const get_profile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/active");
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
    const res = await axios.get("/api/profile");
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
    const res = await axios.put("/api/profile/update", request_body, config);
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

export const get_profile_by_id = profile_id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/${profile_id}`);
    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const upload_profile_image = (
  profile_id,
  form_data,
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    let processed_form_data = new FormData();

    processed_form_data.append("profile_image", form_data.profile_image);

    const res = await axios.post(
      `/api/profile/${profile_id}/upload-profile-image`,
      processed_form_data
    );
    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: res.data
    });

    history.push('/');

    dispatch(create_alert("success", "Updated Profile Image"));

  } catch (error) {
    console.log(error.message);
  }
};

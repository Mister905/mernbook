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

export const delete_experience = (
  experience_item_id,
  history
) => async dispatch => {
  try {
    const res = await axios.delete(
      `/profiles/experience/${experience_item_id}`
    );
    dispatch({
      type: DELETE_EXPERIENCE_ITEM,
      payload: res.data
    });
    history.push("/");
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
      `/profiles/experience/${experience_item_id}`,
      request_body,
      config
    );

    dispatch({
      type: UPDATE_EXPERIENCE_ITEM,
      payload: res.data
    });

    // const updated_experience_id = res.data._id;

    console.log(res.data)

    // history.push(`/experience/${updated_experience_id}`);
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Update Experience Item"));
  }
};

export const update_education = (
  education_item_id,
  history
) => async dispatch => {
  try {
    const res = await axios.put(`/profiles/education/${education_item_id}`);
    dispatch({
      type: UPDATE_EDUCATION_ITEM,
      payload: res.data
    });
    history.push("/");
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Update Education Item"));
  }
};

export const delete_education = (
  education_item_id,
  history
) => async dispatch => {
  try {
    const res = await axios.delete(`/profiles/education/${education_item_id}`);
    dispatch({
      type: DELETE_EDUCATION_ITEM,
      payload: res.data
    });
    history.push("/");
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Delete Education Item"));
  }
};

export const clear_active_experience = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_ACTIVE_EXPERIENCE
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const clear_active_education = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_ACTIVE_EDUCATION
    });
  } catch (error) {
    console.log(error.message);
  }
};

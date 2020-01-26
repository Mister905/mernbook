import { GET_PROFILE } from "./types";
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
    history.push("/dashboard");
    dispatch(create_alert("success", "Update Successfull"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Update Failed"));
  }
};

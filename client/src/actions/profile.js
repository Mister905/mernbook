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
    dispatch(create_alert("error", "Failed to Load Profile"));
  }
};

import { GET_PROFILE, UPDATE_PROFILE, CLEAR_PROFILE } from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const delete_account = () => async dispatch => {
  try {
    const res = await axios.delete("/api/profile");
    dispatch(create_alert("success", "Account and Profile Deleted"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Failed to Delete Account"));
  }
};

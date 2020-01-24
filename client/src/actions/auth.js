import { display_alert } from "../actions/alert";
import { REGISTER_USER, LOGIN_USER } from "./types";
import axios from "axios";

export const register_user = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/auth/register", request_body, config);

    dispatch(display_alert("Registration Successful", "success"));

    history.push('/login');
  } catch (error) {
    console.log(error.message);
    dispatch(display_alert("Registration Failed", "error"));
  }
};

export const login_user = (form_data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await axios.post("/auth/login", request_body, config);

    dispatch(display_alert("Login Successful", "success"));

    history.push('/dashboard');
  } catch (error) {
    console.log(error.message);
    dispatch(display_alert("Login Failed", "error"));
  }
};

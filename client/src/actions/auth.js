import { display_alert } from "../actions/alert";
import { LOGIN_USER, USER_LOADED, LOGOUT_USER, AUTH_ERROR } from "./types";
import axios from "axios";
import set_auth_token from "../utils/set_auth_token";

export const load_user = () => async dispatch => {
  if (localStorage.token) {
    set_auth_token(localStorage.token);
  }
  try {
    const res = await axios.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
    console.log(error.message);
  }
};

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

    history.push("/login");
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

    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });

    dispatch(display_alert("Login Successful", "success"));

    history.push("/dashboard");
  } catch (error) {
    console.log(error.message);
    dispatch(display_alert("Login Failed", "error"));
  }
};

export const logout_user = history => async dispatch => {
  dispatch({ type: LOGOUT_USER });
  history.push("/");
};

import { LOGIN_USER, USER_LOADED, LOGOUT_USER, AUTH_ERROR } from "./types";
import axios from "axios";
import set_auth_token from "../utils/set_auth_token";
import { create_alert } from "../actions/alert";

export const load_user = () => async dispatch => {
  if (localStorage.token) {
    set_auth_token(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/active_user");

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
    const res = await axios.post("/api/auth/register", request_body, config);
    history.push("/login");
    dispatch(create_alert("success", "Registration Successful"));
  } catch (error) {
    console.log(error.message);
    dispatch(create_alert("error", "Registration Error"));
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
    const res = await axios.post("/api/auth/login", request_body, config);
    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });
    history.push("/");
    dispatch(create_alert("success", "Welcome Back"));
  } catch (error) {
    dispatch(create_alert("error", "Login Error"));
  }
};

export const logout_user = history => async dispatch => {
  dispatch({ type: LOGOUT_USER });
  history.push("/");
};

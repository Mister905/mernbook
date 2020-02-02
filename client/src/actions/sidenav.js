import { SIDENAV_CLICK, RESET_SIDENAV } from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const sidenav_click = component => async dispatch => {
  dispatch({
    type: SIDENAV_CLICK,
    payload: component
  });
};

export const reset_sidenav = () => async dispatch => {
  dispatch({
    type: RESET_SIDENAV
  });
};
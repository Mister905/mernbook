import { SIDENAV_CLICK } from "./types";
import axios from "axios";
import { create_alert } from "../actions/alert";

export const sidenav_click = component => async dispatch => {
  dispatch({
    type: SIDENAV_CLICK,
    payload: component
  });
};

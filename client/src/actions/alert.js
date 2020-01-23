import uuid from "uuid";
import { SHOW_ALERT_MESSAGE } from "./types";

export const show_alert = (msg, type) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SHOW_ALERT_MESSAGE,
    payload: {
      id,
      show: true,
      msg,
      type
    }
  });
};

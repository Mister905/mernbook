import uuid from "uuid";
import { DISPLAY_ALERT } from "./types";

export const display_alert = (message, type) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: DISPLAY_ALERT,
    payload: {
      id,
      show: true,
      message,
      type
    }
  });
};

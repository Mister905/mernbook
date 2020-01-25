import uuid from "uuid";
import { CREATE_ALERT, REMOVE_ALERT } from "./types";

export const create_alert = (type, message) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: CREATE_ALERT,
    payload: {
      id,
      type,
      message
    }
  });
};

export const remove_alert = alert_id => dispatch => {
  dispatch({
    type: REMOVE_ALERT,
    payload: alert_id
  });
};

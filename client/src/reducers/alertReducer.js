import { CREATE_ALERT, REMOVE_ALERT } from "../actions/types";

const initial_state = {
  new_alert_id: "",
  alerts: []
};

export default function(state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ALERT:
      return {
        ...state,
        new_alert_id: payload.id,
        alerts: [...state.alerts, payload]
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== payload)
      };
    default:
      return state;
  }
}

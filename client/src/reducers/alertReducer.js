import { DISPLAY_ALERT } from "../actions/types";

const initial_state = {
  alert: {
    id: "",
    show: false,
    message: "",
    type: "info"
  }
};

export default function(state = initial_state, action) {
  const { type, payload } = action;

  switch (type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        alert: {
          id: payload.id,
          show: true,
          message: payload.message,
          type: payload.type
        }
      };

    default:
      return state;
  }
}

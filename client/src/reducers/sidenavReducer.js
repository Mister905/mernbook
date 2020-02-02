import { SIDENAV_CLICK, RESET_SIDENAV } from "../actions/types";

const initial_state = {
  active_component: "profile"
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case SIDENAV_CLICK:
      return {
        ...state,
        active_component: payload
      };
      case RESET_SIDENAV:
        return {
          ...state,
          active_component: "profile"
        }
    default:
      return state;
  }
}

import { SIDENAV_CLICK } from "../actions/types";

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

    default:
      return state;
  }
}

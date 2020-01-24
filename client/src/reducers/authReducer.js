import { LOGIN_USER } from "../actions/types";

const initial_state = {
  token: localStorage.getItem("token"),
  is_authenticated: false,
  loading_user: true,
  user: null
};

export default function(state = initial_state, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        is_authenticated: true,
        loading_user: false,
        user: payload
      };
    default:
      return state;
  }
}

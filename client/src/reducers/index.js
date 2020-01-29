import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import sidenavReducer from "./sidenavReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
  sidenav: sidenavReducer
});

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import profileReducer from "./profileReducer";
import sidenavReducer from "./sidenavReducer";
import experienceReducer from "./experienceReducer";
import educationReducer from "./educationReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
  sidenav: sidenavReducer,
  experience: experienceReducer,
  education: educationReducer,
  post: postReducer,
  comment: commentReducer
});

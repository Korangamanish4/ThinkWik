import { combineReducers } from "redux";

import commonReducer from "./commonReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  common: commonReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  // Clear all reducer data in logout
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
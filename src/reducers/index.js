import { combineReducers } from "redux";
import cuisinesReducer from "./cuisines"

export default combineReducers({
  cuisines: cuisinesReducer,
});
 
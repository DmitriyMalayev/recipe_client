import { combineReducers } from "redux";
import cuisinesReducer from "./cuisine";

export default combineReducers({
  cuisines: cuisinesReducer,
});
 
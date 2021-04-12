import { combineReducers } from "redux"; 
import cuisinesReducer from "./cuisines";
import recipesReducer from "./recipes";

export default combineReducers({
  cuisines: cuisinesReducer,
  recipes: recipesReducer,
});

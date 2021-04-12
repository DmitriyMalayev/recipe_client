import {
  //reducers/cuisines
  START_LOADING_CUISINES,
  START_LOADING_CUISINE,
  SUCCESSFULLY_LOADED_CUISINES,
  SUCCESSFULLY_LOADED_CUISINE_RECIPES,
  // FAILED_LOADING_CUISINES,
} from "../actions";

const initialState = {
  //default
  cuisinesLoadingState: "notStarted",
  cuisineLoadingState: "notStarted",
  list: [],
};

export default function cuisinesReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_CUISINES:
      return { ...state, cuisinesLoadingState: "inProgress" };
    case START_LOADING_CUISINE:
      return { ...state, cuisineLoadingState: "inProgress" };
    case SUCCESSFULLY_LOADED_CUISINES:
      return { list: action.payload, cuisinesLoadingState: "successful" };
    case SUCCESSFULLY_LOADED_CUISINE_RECIPES:
      const foundCuisine = state.list.find(cuisine => cuisine.id === action.payload.cuisine.id)
      if (foundCuisine) {
        return state
      } else {
        return {
          ...state,
          list: state.list.concat(action.payload.cuisine),
        };
      }
    default:
      return state;
  }
}
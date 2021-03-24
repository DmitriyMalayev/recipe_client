import {
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
      const foundCuisine = state.list.find(cuisine => cuisine.id == action.payload.cuisine.id)
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

//When you init there will not be a state task for our reducers.
//All of our reducers need to have a default value for the state, because the first action will not have an argument for state. It should be the same state shape that we would like to build.

// loading_state ??
// Object spread made for arrays but also works in objects

// PAYLOAD
// While action types allow you tell your reducer what action it should take, the payload is the data that your reducer will use to update the state.

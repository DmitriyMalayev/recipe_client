import { START_LOADING_RECIPES, SUCCESSFULLY_LOADED_RECIPES } from "../actions";

const initialState = {
  loadingState: "notStarted",
  list: [],
};

export default function cuisinesReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_RECIPES:
      return { ...state, loadingState: "inProgress" };
    case SUCCESSFULLY_LOADED_RECIPES:
      return { list: action.payload, loadingState: "successful" };
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

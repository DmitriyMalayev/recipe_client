import {
  ADD_CUISINE,
  START_LOADING_CUISINES,
  SUCCESSFULLY_LOADED_CUISINES,
  FAILED_LOADING_CUISINES
} from "../actions";

const initialState = {
  loadingState: "notStarted",
  list: [],
};

export default function cuisinesReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING_CUISINES:
      return { ...state, loadingState: "inProgress" };
    case SUCCESSFULLY_LOADED_CUISINES:
      return { list: action.payload, loadingState: "successful" };
    default:
      return state;
  }
}

//When you init there will not be a state task for our reducers.
//All of our reducers need to have a default value for the state, because the first action will not have an argument for state. It should be the same state shape that we would like to build.

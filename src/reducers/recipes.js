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
import {
  START_LOADING_CUISINES,
  START_LOADING_CUISINE,
  SUCCESSFULLY_LOADED_CUISINES,
  SUCCESSFULLY_LOADED_CUISINE_RECIPES,
} from "./index";

export const fetchCuisines = () => {
  //If it's a named export (not default) we need to use curly braces when importing them.
  return (dispatch) => {
    dispatch({ type: START_LOADING_CUISINES });
    fetch("http://localhost:3001/cuisines", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((cuisineRecipesJson) => {
        //Instead of calling setState we are invoking dispatch
        dispatch({
          type: SUCCESSFULLY_LOADED_CUISINES,
          payload: cuisineRecipesJson,
        });
      });
  };
};

export const fetchCuisine = (cuisineId) => {
  //If it's a named export (not default) we need to use curly braces when importing them.
  return (dispatch) => {
    dispatch({ type: START_LOADING_CUISINE, payload: cuisineId });
    fetch(`http://localhost:3001/cuisines/${cuisineId}`)
      .then((res) => res.json())
      .then((cuisineRecipesJson) => {
        dispatch({ type: SUCCESSFULLY_LOADED_CUISINE_RECIPES, payload: cuisineRecipesJson });
      });
  };
};

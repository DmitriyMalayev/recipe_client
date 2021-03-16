import { START_LOADING_RECIPES, SUCCESSFULLY_LOADED_RECIPES } from "./index";

export const fetchRecipes = () => {
  return (dispatch) => {
    dispatch({ type: START_LOADING_RECIPES });
    fetch("http://localhost:3001/Recipes", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: SUCCESSFULLY_LOADED_RECIPES });, payload: data });
      });
  };
};

// fetchRecipes doesn't need an argument because it's sole purpose it to hit an endpoint
// To be able to access dispatch after the function is called we want to return a function that accepts dispatch as an argument and then that function will be able to do our fetch.

//fetchCuisines returns a function.

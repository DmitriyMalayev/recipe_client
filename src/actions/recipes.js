import {
  START_LOADING_RECIPES,   
  SUCCESSFULLY_LOADED_RECIPES,
  ADD_RECIPE,
} from "./index";

export const fetchRecipes = () => {    //files in actions directory are never components
  return (dispatch) => {
    dispatch({ type: START_LOADING_RECIPES });
    fetch("http://localhost:3001/recipes", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: SUCCESSFULLY_LOADED_RECIPES, payload: data });
      });
  };
};

export const createRecipe = (recipe) => {
  return (dispatch) => {
    return fetch("http://localhost:3001/recipes", {
      method: "POST",
      body: recipe,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((errors) => Promise.reject(errors));
        }
      })
      .then((data) => {
        dispatch({ type: ADD_RECIPE, payload: data });
      });
  };
};

// fetchRecipes doesn't need an argument because it's sole purpose it to hit an endpoint
// To be able to access dispatch after the function is called we want to return a function that accepts dispatch as an argument and then that function will be able to do our fetch.

//fetchCuisines returns a function.


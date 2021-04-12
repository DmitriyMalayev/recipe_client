import {
  START_LOADING_RECIPES,
  SUCCESSFULLY_LOADED_RECIPES,
  ADD_RECIPE,
} from "./index";

export const fetchRecipes = () => {
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
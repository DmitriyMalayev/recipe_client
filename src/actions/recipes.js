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
      method: "POST",   //Using POST because we want to submit data to the server. 
      body: recipe,  //passing in the argument
    })
      .then((res) => {
        if (res.ok) {   //Any response is constitutes a fulfilled promise this is why we need to check if the response was also successful on the server side, so we can do something different if it's not. 
          return res.json();
        } else {
          return res.json().then((errors) => Promise.reject(errors));   //Creates a new rejected promise for the provided reason.
        }
      })
      .then((data) => {
        dispatch({ type: ADD_RECIPE, payload: data });  //adding data 
      });
  };
};

// fetchRecipes doesn't need an argument because it's sole purpose it to hit an endpoint
// To be able to access dispatch after the function is called we want to return a function that accepts dispatch as an argument and then that function will be able to do our fetch.

//fetchCuisines returns a function.


import {
  START_LOADING_CUISINES,
  START_LOADING_CUISINE,
  SUCCESSFULLY_LOADED_CUISINES,
  SUCCESSFULLY_LOADED_CUISINE_RECIPES,
} from "./index";

export const fetchCuisines = () => {
  //If it's a named export (not default) we need to use curly braces when importing them.
  return (dispatch) => {
    dispatch({ type: START_LOADING_CUISINES }); //dispatching an action
    fetch("http://localhost:3001/cuisines", {
      //fetching cuisines from api
      method: "GET", //GET to retrieve data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) //converting response to json
      .then((cuisineRecipesJson) => {
        //Instead of calling setState we are invoking dispatch
        dispatch({
          //dispatching an action
          type: SUCCESSFULLY_LOADED_CUISINES, //describing action??
          payload: cuisineRecipesJson, //payload contains data we are interested in transporting.
        });
      });
  };
};

export const fetchCuisine = (cuisineId) => {
  //fetchCuisine takes an argument
  //If it's a named export (not default) we need to use curly braces when importing them.
  return (dispatch) => {
    //returning dispatch method
    dispatch({ type: START_LOADING_CUISINE, payload: cuisineId }); //type describes action. payload contains data we are interested. 
    fetch(`http://localhost:3001/cuisines/${cuisineId}`) //fetching cuisines from api using an interpolated argument
      .then((res) => res.json())
      .then((cuisineRecipesJson) => {
        dispatch({
          type: SUCCESSFULLY_LOADED_CUISINE_RECIPES,
          payload: cuisineRecipesJson, //payload contains data we are interested in transporting. 
        });
      });
  };
};

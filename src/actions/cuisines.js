import { START_LOADING_CUISINES, SUCCESSFULLY_LOADED_CUISINES } from "./index";

export const fetchCuisines = () => {
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
      .then((data) => {
        dispatch({ type: SUCCESSFULLY_LOADED_CUISINES, payload: data });
      });
  };
};

// fetchCuisines doesn't need an argument because it's sole purpose it to hit an endpoint
// To be able to access dispatch after the function is called we want to return a function that accepts dispatch as an argument and then that function will be able to do our fetch.

//fetchCuisines returns a function. 

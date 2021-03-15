export const fetchCuisines = () => {
  return (dispatch) => {
    fetch("http://localhost:3001/cuisines", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ cuisines: data, loading: false });
      });
  };
};

// fetchCuisines doesn't need an argument because it's sole purpose it to hit an endpoint
// To be able to access dispatch after the function is called we want to return a function that accepts dispatch as an argument and then that function will be able to do our fetch.

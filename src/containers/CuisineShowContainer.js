import React, { Component } from "react";
import { Link } from "react-router-dom"; //Allows us to add links that we can convert to routes
import { connect } from "react-redux";
import { fetchCuisine } from "../actions/cuisines"; //We're using {} because it's const fetchCuisines in cuisines

// We're adding centering logic to render and also a a conditional statement that will render a spinner if loading is true and the content if loading is false. Also we want to setState() after we get the data from the API, setting loading to false in the process. This will allow us to trigger a re-render that will replace the spinner with our content.

class CuisineShowContainer extends Component {
  state = {
    cuisine: {},
    recipes: [],
    loading: true,
  };

  //We're adding a componentDidMount() so we can trigger a fetch and get the cuisine and it's recipes. Because we have configured a route to point to our container component React Router provides a match prop that contains route parameters including :cuisineId

  componentDidMount() {
    const cuisineId = this.props.match.params.cuisineId;
    fetch(`http://localhost:3001/cuisines/${cuisineId}`)
      .then((res) => res.json())
      .then(({ cuisine, recipes }) => {
        this.setState({
          cuisine,
          recipes,
          loading: false,
        });
      });
  }
  //We will not render the component contents until we have the data from the API, we don't need conditional logic to our second return statement's JSX.
  render() {
    if (this.state.loading) {
      return <div>Loading Spinner</div>;
    }
    return (
      <section className="max-w-6xl w-11/12 mx-auto mt-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          {this.state.cuisine.name}
        </h1>
        <p className="my-2">
          <Link to={`/cuisines/${this.state.cuisine.id}/recipes/new`}>
            Add a Recipe
          </Link>
        </p>
        <div className="grid grid-cols-3">
          {this.state.recipes.map((recipe) => (
            <figure className="p-4 shadow">
              <img className="" alt={recipe.name} />
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
            </figure>
          ))}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const cuisineId = match.params.cuisineId;
  return {
    cuisine: state.cuisines.list.find(
      (cuisine) => cuisine.id === parseInt(cuisineId)
    ),
    recipes: state.recipes.list.filter(
      (recipe) => recipe.cuisine_id === parseInt(cuisineId)
    ), //converting string to integer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchCuisine: (cuisineId) => dispatch(fetchCuisine(cuisineId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CuisineShowContainer);
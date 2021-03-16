import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CuisineShowContainer extends Component {
  state = {
    cuisine: {},
    recipes: [],
    loading: true,
  };

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
              <img className="" alt={recipe.name} src={"??"} />
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
            </figure>
          ))}
        </div>
      </section>
    );
  }
}

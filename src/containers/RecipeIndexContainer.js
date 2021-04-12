import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../actions/recipes";
import { fetchCuisines } from "../actions/cuisines";
import RecipesList from "../components/RecipesList";

class RecipeIndexContainer extends Component {
  state = {
    selectedCuisine: "All",
  };

  componentDidMount() {
    this.props.dispatchFetchRecipes();
    this.props.dispatchFetchCuisines();
  }

  filterByCuisine = () => {
    return this.props.recipes.filter(
      (recipe) => recipe.cuisine_name === this.state.selectedCuisine
    );
  };

  handleCuisineChange = (event) => {
    this.setState({ selectedCuisine: event.target.value });
  };

  render() {
    if (this.props.loadingState === "notStarted") {
      return null;
    }
    let recipes =
      this.state.selectedCuisine === "All"
        ? this.props.recipes
        : this.filterByCuisine();

    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.props.loadingState === "inProgress" ? (
          "loading spinner"
        ) : (
          <RecipesList
            recipes={recipes}
            cuisines={this.props.cuisines}
            selectedCuisine={this.state.selectedCuisine}
            handleCuisineChange={this.handleCuisineChange}
          />
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.list,
    cuisines: state.cuisines.list,
    loadingState: state.recipes.loadingState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchRecipes: () => dispatch(fetchRecipes()),
    dispatchFetchCuisines: () => dispatch(fetchCuisines()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeIndexContainer);

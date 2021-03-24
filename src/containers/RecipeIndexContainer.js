import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../actions/recipes";
import RecipesList from "../components/RecipesList";

class RecipeIndexContainer extends Component {  //RecipeIndexContainer is a component (extends means part of)
  componentDidMount() {
    this.props.dispatchFetchRecipes();    //The parent is connect()
  }

  render() {
    if (this.props.loadingState === "notStarted") {
      return null;
    }
    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.props.loadingState === "inProgress" ? (
          "loading spinner"
        ) : (
          <RecipesList recipes={this.props.recipes}  />  
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {  //Take the state and make it accessible as props
  
  return {
    recipes: state.recipes.list,
    loadingState: state.recipes.loadingState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchRecipes: () => dispatch(fetchRecipes()),
  };
};
// The purpose of mapDispatchToProps to props is to give us functions that will dispatch the return values of action creators.

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeIndexContainer);

  //super parent 

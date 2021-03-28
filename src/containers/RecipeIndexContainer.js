import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../actions/recipes";
import RecipesList from "../components/RecipesList";

class RecipeIndexContainer extends Component {
  //RecipeIndexContainer is a component (extends means part of)
  
  componentDidMount() {
    this.props.dispatchFetchRecipes(); //The parent is connect()
  }




  
  

  filterRecipes = (cuisineName) =>
    this.props.recipes.filter((recipe) => recipe.cuisine_name === cuisineName);
  
  handleSelect = e => {
    // depending on value of option (4 options total),
    // return filterRecipes(valueName)

    // if value === all, return this.props.recipes
  }
  
  
  // <label htmlFor="cuisines">
  //             Please Choose a Pre-Selected Cuisine:
  //             <select
  //               className="text-blue-800 bg-blue-100"
  //               name="cuisine_id"
  //               id="cuisine_id"
  //             >
  //               {this.props.cuisines.map((cuisine) => (
  //                 <option key={cuisine.id} value={cuisine.id}>
  //                   {cuisine.name}
  //                 </option>
  //               ))}
  //             </select>
  //           </label>
  

  render() {
    if (this.props.loadingState === "notStarted") {
      return null;
    }

    const filteredRecipes = //

    return (
      <section className="max-w-6xl mx-auto mt-16">
        {this.props.loadingState === "inProgress" ? (
          "loading spinner"
        ) : (
          <RecipesList recipes={this.props.recipes} handleSelect={this.handleSelect}/>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  //Take the state and make it accessible as props

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

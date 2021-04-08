import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRecipes } from "../actions/recipes";
import { fetchCuisines } from "../actions/cuisines";
import RecipesList from "../components/RecipesList";

class RecipeIndexContainer extends Component {
  state = {
    selectedCuisine: "All",
  };

  //RecipeIndexContainer is a component (extends means is a component (as well) we're inheriting from Component. )

  componentDidMount() {
    this.props.dispatchFetchRecipes(); //The parent is connect()
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
  //Take the state and make it accessible as props
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
// The purpose of mapDispatchToProps to props is to give us functions that will dispatch the return values of action creators. We're dispatching the return value of fetchRecipes()

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeIndexContainer);
//super parent

// filterByCuisine(){
//   if(this.state.selectedCuisine === "Italian") {
//     this.props.recipes ===
//   }

//   return
//   <fieldset className="">
//     <label htmlFor="filterByCuisine" className="font-semibold"></label>
//     Filter By Cuisine:
//     <select className="text-orange-800" name="cuisine_id" id="cuisine_id">
//       {this.props.cuisines.map((cuisine) => (
//         <option key={cuisine.id} value={cuisine.id}>
//           {" "}
//           {cuisine.name}
//         </option>
//       ))}
//     </select>
//   </fieldset>;
// }

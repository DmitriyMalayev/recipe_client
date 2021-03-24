import React, { Component } from "react";
import { createRecipe } from "../actions/recipes";
import { fetchCuisines } from "../actions/cuisines";
import { connect } from "react-redux"; //connecting react and redux
class NewRecipeContainer extends Component {
  state = {
    cuisines: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const body = new FormData(); //Our FormData needs recipe keys and values

    body.append("recipe[name]", form.name.value);
    body.append("recipe[description]", form.description.value);
    body.append("recipe[cuisine_id]", form.cuisine_id.value);

    form.recipe_image.files[0] &&
      body.append(
        "recipe[recipe_image]",
        form.recipe_image.files[0],
        form.recipe_image.value
      );

    this.props
      .dispatchCreateRecipe(body)
      .then((recipeJson) => {
        this.props.history.push(`/recipes`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };

  //componentDidMount() is called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.props.fetchCuisines();
  }

  render() {
    return (
      <form
        className="max-w-4xl w-11/12 mx-auto shadow-lg px-8 py-6"
        onSubmit={this.handleSubmit}
      >
        <h1 className="text-3xl text-center font-semibold mb-8">New Recipe</h1>
        <fieldset className="">
          <label htmlFor="cuisines">
            Please Choose a Pre-Selected Cuisine:
            <select name="cuisine_id" id="cuisine_id">
              {this.props.cuisines.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.id}>
                  {cuisine.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="name" className="block uppercase">
            Recipe Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full border-2 p-4 my-4"
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="description" className="block uppercase">
            Recipe Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            className="w-full border-2 p-4 my-4"
          ></textarea>
        </fieldset>
        <fieldset className="">
          <label htmlFor="recipe_image" className="block uppercase">
            Recipe Image
          </label>

          <input
            type="file"
            name="recipe_image"
            id="recipe_image"
            className="w-full my-4"
          />
        </fieldset>
        <button
          type="submit"
          className="w-full p-4 bg-blue-300 mt-4 hover:bg-blue-400 transition-all duration-200"
        >
          Add Recipe
        </button>
      </form>
    );
  }
}

export default connect((state) => ({ cuisines: state.cuisines.list }), {
  fetchCuisines,
  dispatchCreateRecipe: createRecipe,
})(NewRecipeContainer);

// This creates a new recipe. The inputs in the form need to match the schema.
// For our recipe_image we implement has_one_attached :recipe_image.
// It uses ActiveStorage

//We need to add the Data from the Form into this body (FormData) object using the append method. When we do, we want to be thinking about how the rails API is expecting the event_params to look.
//We're pulling out data from out of the target of our submit event and attach it to a formData object we're building so we can send that as a body of our post request to create the new event.

//We add a link from the CuisineShowContainer to the route where we can add a recipe to the cuisine. ??

//mapStateToProps => Subscriber, Provide data and access to updates so it can  to update to the data.  Does not provide the ability to make changes, just to be able to receive updates made by others.

//mapDispatchToProps => Publisher, Provides functions that would publish to all subscribers. Provides the ability to make new issues for all subscribers.

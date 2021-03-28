import React, { Component } from "react";
import { createRecipe } from "../actions/recipes";
import { fetchCuisines } from "../actions/cuisines";
import { connect } from "react-redux";
let newImage = "new_recipe_banner.gif";

class NewRecipeContainer extends Component {
  state = {
    errors: {}, //works in conjunction with this.setState({errors})
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
      .then(() => {
        this.props.history.push(`/recipes`);
      })
      .catch((errors) => {
        this.setState({ errors }); //Object property shorthand same as errors:errors   updates state with errors
      });
  };

  componentDidMount() {
    this.props.dispatchFetchCuisines();
  }

  render() {
    return (
      <div>
        
        <img
          className="w-full transform hover:scale-150 border-4 border-blue-500 shadow-lg"
          src={`http://localhost:3000/${newImage}`}
          alt={"recipe banner"}
        />
        <form
          className="max-w-4xl w-11/12 mx-auto shadow-lg px-8 py-6"
          onSubmit={this.handleSubmit}
        >
          <div></div>
          <h1 className="text-3xl text-center font-semibold mb-8">
            New Recipe
          </h1>

          <fieldset className="">
            <label htmlFor="cuisines">
              Please Choose a Pre-Selected Cuisine:
              <select
                className="text-blue-800 bg-blue-100"
                name="cuisine_id"
                id="cuisine_id"
              >
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cuisines: state.cuisines.list,
  };
};
//state is from store

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchCuisines: () => dispatch(fetchCuisines()),
    dispatchCreateRecipe: (recipe) => dispatch(createRecipe(recipe)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewRecipeContainer);
/*
CHECK??
  This creates a new recipe. The inputs in the form need to match the schema.
  For our recipe_image we implement has_one_attached :recipe_image.
  It uses ActiveStorage

  We need to add the Data from the Form into this body (FormData) object using the append method. When we do, we want to be thinking about how the rails API is expecting the event_params to look.
  We're pulling out data from out of the target of our submit event and attach it to a formData object we're building so we can send that as a body of our post request to create the new event.

  We add a link from the CuisineShowContainer to the route where we can add a recipe to the cuisine. ??
*/

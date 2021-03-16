import React, { Component } from "react";
export default class NewRecipeContainer extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const body = new FormData();
    //We need to add the Data from the Form into this body (FormData) object using the append method. When we do, we want to be thinking about how the rails API is expecting the event_params to look.

    body.append("recipe[name]", form.name.value);
    body.append("recipe[description]", form.description.value);
    body.append(
      "recipe[recipe_image]",
      form.poster.files[0],
      form.poster.value
    );

    fetch("http://localhost:3001/recipes", {
      method: "POST",
      body,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <form className="max-w-4xl w-11/12 mx-auto shadow-lg px-8 py-6">
        <h1 className="text-3xl text-center font-semibold mb-8">New Recipe</h1>
        <fieldset className="">
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

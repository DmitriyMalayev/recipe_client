import React from "react";
import RecipeListItem from "./RecipeListItem";
let banner = "recipe_banner.gif";

const RecipesList = ({ recipes, cuisines, selectedCuisine, handleCuisineChange }) => {
  //destructured recipes, same as this.props.recipes
  return (
    <>
      {/* <h1 className="font-serif font-family:Cambria text-3xl">Recipes List</h1> */}
      <img
        className="w-full transform hover:scale-150 border-4 border-blue-500 shadow-lg"
        src={banner}
        alt={"recipe banner"}
      />
      <label
        htmlFor="filterByCuisine"
        className="font-semibold text-lg text-blue-800 block bg-blue-300"
      >
        Filter By Cuisine: &nbsp;
        <select
          className="text-red-900 font-semibold bg-blue-100"
          name="cuisine_id"
          id="cuisine_id"
          value={selectedCuisine}
          onChange={handleCuisineChange}
        >
          <option selected value="All">
            {" "}
            All
          </option>

          {cuisines.map((cuisine) => (
            <option key={cuisine.id} value={cuisine.name}>
              {cuisine.name}
            </option>
          ))}
        </select>
      </label>

      <ul className="grid grid-cols-3 gap-10 place-items-auto border-4 border-blue-500 shadow-lg transition-hover:scale-110">
        {recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            cuisine={recipe.cuisine_name}
            cuisine_id={recipe.cuisine_id}
          />
          //sending props to RecipeListItem .
          //Presentational component, taking in data and returning JSX.
        ))}
      </ul>
    </>
  );
};
export default RecipesList;
//Main recipe list

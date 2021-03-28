import React from "react";
import RecipeListItem from "./RecipeListItem";
let banner = "recipe_banner.gif";

const RecipesList = ({ recipes }) => {
  //destructured recipes, same as this.props.recipes
  return (
    <>
      {/* <h1 className="font-serif font-family:Cambria text-3xl">Recipes List</h1> */}
      <img
        className="w-full transform hover:scale-150 border-4 border-blue-500 shadow-lg"
        src={banner}
        alt={"recipe banner"}
      />
      <select onSelect={handleSelect}>
        <option></option>
        <option></option>
        <option></option>
        <option></option>
      </select>
      <ul className="grid grid-cols-3 grid-rows-5 gap-10 place-items-auto border-4 border-blue-500 shadow-lg transition-hover:scale-110">
        {recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            cuisine={recipe.cuisine_name}
            cuisine_id={recipe.cuisine_id}
          />
        ))}
      </ul>
    </>
  );
};
export default RecipesList;
//Main recipe list

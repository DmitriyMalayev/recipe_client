import React from "react";
import RecipeListItem from "./RecipeListItem";

const RecipesList = ({ recipes }) => {
  //destructured recipes, same as this.props.recipes
  return (
    <>
      <h1>Recipes List</h1>
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

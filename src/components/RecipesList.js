import React from "react";
import RecipeListItem from "./RecipeListItem";

const RecipesList = ({ recipes }) => {   //destructured recipes, same as this.props.recipes
  return (
    <>
      <h1>Recipes List</h1>
      <ul>
        {recipes.map((recipe) => (
          <RecipeListItem key={recipe.id} recipe={recipe} cuisine={recipe.cuisine_name} cuisine_id={recipe.cuisine_id} />
        ))}
      </ul>
    </>
  );
};
export default RecipesList;
//Main recipe list

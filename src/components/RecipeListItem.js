import React from "react";
const RecipeListItem = ({ recipe }) => {
  return (
    <li className="" key={recipe.id}>
      {recipe.name}
      <img src={recipe.recipe_image_url} alt={recipe.name} />
    </li>
  );
};

export default RecipeListItem;


//Renders each recipe item


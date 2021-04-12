import React from "react";
const RecipeListItem = ({ recipe }) => {
  let item = "default_image.jpeg";

  return (
    <li key={recipe.id}>
      <strong>
        <h1 className="font-sans">{recipe.name}</h1>
      </strong>
      <p className="bg-blue-200 bg-auto h-36">{recipe.description}</p>
      <img
        className="w-full transform hover:scale-150 border-4 border-blue-500 shadow-lg"
        src={recipe.recipe_image_url || item}
        alt={recipe.name}
      />
    </li>
  );
};

export default RecipeListItem;

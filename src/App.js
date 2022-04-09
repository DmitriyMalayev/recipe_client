import NewRecipeContainer from "./containers/NewRecipeContainer";
import CuisineIndexContainer from "./containers/CuisinesIndexContainer";
import RecipeIndexContainer from "./containers/RecipeIndexContainer";
import NavigationBar from "./NavigationBar";

import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="text-center bg-blue-900 text-yellow-100 p-4">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<RecipeIndexContainer />} />
        <Route path="/recipes/new" element={<NewRecipeContainer />} />
        <Route path="/recipes" element={<RecipeIndexContainer />} />
        <Route path="/cuisines" element={<CuisineIndexContainer />} />
      </Routes>
    </div>
  );
}

export default App;

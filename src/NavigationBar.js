import React from "react";  
import { NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="NavigationBar">
      <nav className="text-center bg-blue-900 text-yellow-100 p-4">
        <NavLink
          className="inline-block px-4 py-2"
          activeClassName="text-yellow-300"
          exact
          to="/"
        >
          Recipes
        </NavLink>

        <NavLink
          className="inline-block px-4 py-2"
          activeClassName="text-yellow-300"
          exact
          to="/cuisines"
        >
          Cuisine Collage
        </NavLink>

        <NavLink
          className="inline-block px-4 py-2"
          activeClassName="text-yellow-300"
          exact
          to="/recipes/new"
        >
          New Recipe
        </NavLink>
      </nav>
    </div>
  );
}

export default NavigationBar;
import CuisineIndexContainer from "./containers/CuisinesIndexContainer";
import CuisineFormContainer from "./containers/CuisineFormContainer";
import NewRecipeContainer from "./containers/NewRecipeContainer";
import CuisineShowContainer from "./containers/CuisineShowContainer";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="text-center bg-blue-900 text-yellow-100 p-4">
          <NavLink
            className="inline-block px-4 py-2"
            activeClassName="text-yellow-300"
            exact
            to="/"
          >
            Cuisines
          </NavLink>

          <NavLink
            className="inline-block px-4 py-2"
            activeClassName="text-yellow-300"
            exact
            to="/recipes"
          >
            Recipes
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

        <Switch>
          <Route exact path="/">
            <CuisineIndexContainer />
            Cuisines
          </Route>

          <Route path="/cuisines/new" component={CuisineFormContainer}>
            <CuisineFormContainer />
            New Cuisine
          </Route>

          <Route path="/recipes/new" component={NewRecipeContainer}>
            <NewRecipeContainer />
            New Cuisine
          </Route>
          <Route path="/cuisines/:cuisineId" component={CuisineShowContainer}>
            <CuisineFormContainer />
            Cuisine
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

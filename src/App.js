import NewRecipeContainer from "./containers/NewRecipeContainer";
import CuisineIndexContainer from "./containers/CuisinesIndexContainer";
import RecipeIndexContainer from "./containers/RecipeIndexContainer";

import React from "react";
import {
  BrowserRouter as Router,
  Switch, //only allows a single matching route, therefore order matters.
  Route,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="text-center bg-blue-900 text-yellow-100 p-4">
          {/* If the URL exactly matches the to= property then the active className will be applied.  */}
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
            Cuisines
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
          <Route exact path="/recipes/new" component={NewRecipeContainer} />
          <Route exact path="/recipes" component={RecipeIndexContainer} />
          <Route exact path="/cuisines" component={CuisineIndexContainer} />
          <Route exact path="/">
            <RecipeIndexContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}




export default App;




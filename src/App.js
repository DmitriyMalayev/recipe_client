import NewRecipeContainer from "./containers/NewRecipeContainer";
import CuisineIndexContainer from "./containers/CuisinesIndexContainer";
import RecipeIndexContainer from "./containers/RecipeIndexContainer";
import CuisineShowContainer from "./containers/CuisineShowContainer";
import NavigationBar from "./NavigationBar";
// import RecipeShowContainer from "./containers/RecipeShowContainer";

import React from "react";
import {
  BrowserRouter as Router,
  Switch, //only allows a single matching route, therefore order matters.
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="text-center bg-blue-900 text-yellow-100 p-4">
          {/* If the URL exactly matches the to= property then the active className will be applied.  */}
          <NavigationBar />
        </nav>

        <Switch>
          <Route exact path="/recipes/new" component={NewRecipeContainer} />
          <Route exact path="/recipes" component={RecipeIndexContainer} />
          <Route exact path="/cuisines" component={CuisineIndexContainer} />
          <Route
            exact
            path="/cuisines/:cuisineId"
            component={CuisineShowContainer}
          />
          <Route exact path="/">
            <RecipeIndexContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

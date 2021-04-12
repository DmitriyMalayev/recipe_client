import NewRecipeContainer from "./containers/NewRecipeContainer";
import CuisineIndexContainer from "./containers/CuisinesIndexContainer";
import RecipeIndexContainer from "./containers/RecipeIndexContainer";
import NavigationBar from "./NavigationBar";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";








function App() {
  return (
    <div className="App">
      <Router>
        <nav className="text-center bg-blue-900 text-yellow-100 p-4">
          <NavigationBar />
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

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


// this.mapStateToProps()


// Transitioning to Redux will mean that most of our React component’s state will move to the store instead and access via mapStateToProps(). And, the places where we would be calling setState, we’ll instead be invoking an action creator that we’ve used mapDispatchToProps to connect to dispatch. I highly recommend reading through the guides on react-redux.js.org for the connect function.
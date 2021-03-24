# combineReducers(reducers)

As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state.
`The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.`

The resulting reducer calls every child reducer, and gathers their results into a single state object.
The state produced by combineReducers() namespaces the states of each reducer under their keys as passed to combineReducers()

```js
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// This would produce the following state object
{
  potato: {
    // ... potatoes, and other state managed by the potatoReducer ...
  },
  tomato: {
    // ... tomatoes, and other state managed by the tomatoReducer, maybe some nice sauce? ...
  }
}
```

# getState()

Returns the current state tree of your application. It is equal to the last value returned by the store's reducer.

# dispatch(action)

Dispatches an action. This is the only way to trigger a state change.

The store's reducing function will be called with the current getState() result and the given action synchronously. Its return value will be considered the next state. It will be returned from getState() from now on, and the change listeners will immediately be notified.

# Redux Thunk

Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

# applyMiddleware(...middleware)

Middleware is the suggested way to extend Redux with custom functionality. Middleware lets you wrap the store's dispatch method for fun and profit. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

<!-- The main thing to keep in mind here is that middleware is away of extending the functionality normally triggered by the dispatch method. Every time we invoke dispatch all of our middleware functions are invoked with the getState and dispatch methods as arguments, allowing us to access the store’s state and trigger additional actions via dispatch if we wish. We can also prevent the dispatch from going through by not invoking next within the middleware function. A key part of the description to note is that all redux middleware must conform to this signature:

;({ getState, dispatch }) => (next) => action

In this signature, the next function refers to the dispatch function of the next function in the middleware chain. If we’re at the last link in the chain, then next will refer to the real dispatch function that will update the store state. This is important to keep in mind in our case because we only have a single middleware, Redux Thunk. -->

# CreateThunkMiddleware()

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
// So, the main thing that redux-thunk does is that it checks if the action that is dispatched is a function. If it is, it will invoke the function, passing in dispatch and getState as arguments (no extraArgument in our case because of how we imported). It will then return the return value of the action function. This will be useful to us later when we want to trigger a react router redirect after an action creator successfully updates the store.
```

`...middleware (arguments)`
Functions that conform to the Redux middleware API. Each middleware receives Store's dispatch and getState functions as named arguments, and returns a function. That function will be given the next middleware's dispatch method, and is expected to return a function of action calling next(action) with a potentially different argument, or at a different time, or maybe not calling it at all.
The last middleware in the chain will receive the real store's dispatch method as the next parameter, thus ending the chain. So, the middleware signature is ({ getState, dispatch }) => next => action.

RETURNS
`(Function)`
A store enhancer that applies the given middleware. The store enhancer signature is createStore => createStore but the easiest way to apply it is to pass it to createStore() as the last enhancer argument.

# mapStateToProps?: (state, ownProps?) => Object#

If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

PARAMETERS

state: Object
ownProps?: Object

A mapStateToProps function takes a maximum of two parameters.
The number of declared function parameters affects when it will be called. This also determines whether the function will receive ownProps.

`state`
If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.

```js
const mapStateToProps = (state) => ({ todos: state.todos });
```

`ownProps`
If your mapStateToProps function is declared as taking two parameters, it will be called whenever the store state changes or when the wrapper component receives new props (based on shallow equality comparisons). It will be given the store state as the first parameter, and the wrapper component's props as the second parameter.

The second parameter is normally referred to as ownProps by convention.

```js
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id],
});
```

RETURNS
Your `mapStateToProps` functions are expected to return an object.
This object, normally referred to as `stateProps`, will be merged as props to your connected component. If you define `mergeProps`, it will be supplied as the first parameter to `mergeProps`.

The return of the mapStateToProps determine whether the connected component will re-render.

You may define mapStateToProps and mapDispatchToProps as a factory function, i.e., you return a function instead of an object. In this case your returned function will be treated as the real mapStateToProps or mapDispatchToProps, and be called in subsequent calls. You may see notes on Factory Functions or our guide on performance optimizations.

# render()

The render() method is the only required method in a class component.
When called, it should examine this.props and this.state and return one of the following types:

`React elements`
Typically created via JSX.
For example, <div /> and <MyComponent /> are React elements that instruct React to render a DOM node, or another user-defined component, respectively.
`Arrays and fragments.`
Let you return multiple elements from render.
`String and numbers.`
These are rendered as text nodes in the DOM.
`Booleans or null.`
Render nothing. Mostly exist to support return test && <Child /> pattern, where test is boolean.

The render() function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser.
If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead. Keeping render() pure makes components easier to think about. Note => render() will not be invoked if shouldComponentUpdate() returns false.

# constructor(props)

If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.The constructor for a React component is called before it is mounted.
When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.

`Typically, in React constructors are only used for two purposes:`

Initializing local state by assigning an object to this.state. Binding event handler methods to an instance.
`You should not call setState() in the constructor().`
Instead, if your component needs to use local state, assign the initial state to this.state directly in the constructor:

```js
constructor(props) {
  super(props);
  this.state = { counter: 0 }; // Don't call this.setState() here!
  this.handleClick = this.handleClick.bind(this);
}
```

Constructor is the only place where you should assign this.state directly. In all other methods, you need to use this.setState() instead.Avoid introducing any side-effects or subscriptions in the constructor. For those use cases, use componentDidMount() instead.

# ComponentDidMount()

componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
Initialization that requires DOM nodes should go here.
If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().

`You may call setState() immediately in componentDidMount().`
It will trigger an extra rendering, but it will happen before the browser updates the screen.
This guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.
Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the constructor() instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.

# componentDidUpdate(prevProps, prevState, snapshot)

componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.
Use this as an opportunity to operate on the DOM when the component has been updated.
This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

```js
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

`You may call setState() immediately in componentDidUpdate() but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop.`
It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead. Read more about why copying props into state causes bugs.
Note => componentDidUpdate() will not be invoked if shouldComponentUpdate() returns false.

# componentWillUnmount()

componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().
You should not call setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

# checked

The checked attribute is supported by <input> components of type checkbox or radio. You can use it to set whether the component is checked.
This is useful for building controlled components. `defaultChecked` is the uncontrolled equivalent, which sets whether the component is checked when it is first mounted.
className To specify a CSS class, use the className attribute. This applies to all regular DOM and SVG elements like <div>, <a>, and others.

# htmlFor

Since for is a reserved word in JavaScript, React elements use htmlFor instead.

# onChange

The onChange event behaves as you would expect it to: whenever a form field is changed, this event is fired.
We intentionally do not use the existing browser behavior because onChange is a misnomer for its behavior and React relies on this event to handle user input in real time.

# selected

If you want to mark an <option> as selected, reference the value of that option in the value of its <select> instead. Check out “The select Tag” for detailed instructions.

# style

Note, Some examples in the documentation use style for convenience, but using the style attribute as the primary means of styling elements is generally not recommended. In most cases, className should be used to reference classes defined in an external CSS stylesheet. style is most often used in React applications to add dynamically-computed styles at render time.

The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes. For example:

```js
const divStyle = {
  color: "blue",
  backgroundImage: "url(" + imgUrl + ")",
};
```

# value

The value attribute is supported by <input>, <select> and <textarea> components. You can use it to set the value of the component. This is useful for building controlled components. defaultValue is the uncontrolled equivalent, which sets the value of the component when it is first mounted.

# Configure the Store to utilize the Redux DevTools and Redux Thunk Middleware

We need to access methods from redux and react-redux.
We need to ensure that our app can support multiple reducers.
We use `combineReducers() method from redux` so that we can create a `rootReducer` that will encapsulate all of our different pieces of state into a single reducer that we can pass to `createStore()`

# combineReducers() =>

cuisines: cuisinesReducer =>
currentUser: currentUserReducer => rootReducer
recipes: recipesReducer =>

# createStore(reducer, [preloadedState], [enhancer])

In order to create the store object in our app, we will use createStore() method from redux.
Creates a Redux Store that holds the complete state tree of your app.
There should only be a single store in your app.

# reducer (Function):

A reducing function that returns the next state tree, given the current state tree and an action to handle.

# [preloadedState] (any)

The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your reducer can understand. <!-- If we wanted to store our redux state in local storage we could load it from there and it would hydrate our redux store with an initial state. -->

# [enhancer] (Function):

The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is applyMiddleware().

<!-- We will be using applyMiddleware() like thunk as well as Redux DevTools  -->

# RETURNS

# Store

An object that holds the complete state of your app.
The only way to change its state is by dispatching actions.
You may also subscribe to the changes to its state to update the UI.

EXAMPLE

```js
import { createStore } from "redux";

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]); //   
    default:
      return state;
  }
}

const store = createStore(todos, ["Use Redux"]);

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs",
});

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
```

# Create Store

To create our store we will use our rootReducer as the first argument but we also pass an enhancer function to add redux-thunk middleware to allow us to invoke dispatch within async promise callback functions (in our action creators).

`Redux DevTools Chrome Extension`
Helps us visualize and debug redux in the browser
We will be importing a function from the redux-devtools-extension package.

`Code for using the library with all of the default options`

```js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
```

Create a file src/store.js and export it
Because we want to add redux-thunk middleware that we're adding to our app, we're using combineReducers() to generate a rootReducer.  
Add imports from redux, redux-thunk and redux-devtools-extension packages and create the store.

```js
//store.js
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
```

Before this will work, we need to create our rootReducer.

mkdir src/reducers
mkdir src/actions
touch src/reducers/index.js

`reducers/index.js`
Use the combineReducers() method to create the rootReducer. Pass in an empty object for now.

```js
import { combineReducers } from "redux";
export default combineReducers({});
```

We will be adding reducers to the app and then adding key value pairs to this object as we add new reducers to handle pieces of state in the store.

# Wrap our App component in the Provider tag from react-redux

Import the store from src/store.js
Wrap our component in a Provider component that's imported from react-redux
Pass the store as a prop to it.

```js
// src/index.js
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import App from "./App"
import store from "./store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```
After adding the provider tag and passing in the store object, we can boot up our Dev Server using yarn start and check out the Dev Tools in the Browser. 

# Use the connect Higher Order Component (HOC) to connect components to the store's state and dispatch
Transitioning to redux will mean that most of our React Component's State will move to the store instead and accessible via mapStateToProps(). 
The places where we would be calling setState() we will instead be invoking an action creator that we've used mapDispatchToProps to connect dispatch

As we approach reduxification of our project we will start with CuisineIndexContainer. We'll do each of the containers in the following stages. 

1. Introducing the necessary action creators 
2. Introducing the Corresponding Reducers and Reducer Cases
3. Wrapping our container in connect so we can access state and dispatch actions 

# Redux Thunk Data Flow 
Thunk is Redux Middleware
When we configured our store earlier, we invoked the applyMiddleware() function from redux.
This function is used to connect a series of middleware functions to the Redux Flow which begins when an action is dispatched. 

# applyMiddleware() function arguments 
Middleware is a way of extending the functionality normally triggered by the dispatch method. 
Every time when we invoke dispatch all of our middleware functions are invoked with the getState and dispatch methods as arguments, allowing us to access the store's state and trigger additional actions via dispatch if we wish.  

We can prevent dispatch from going through by not invoking next within the middleware function. 

# All Redux Middleware Must Conform To This Signature
({getState, dispatch}) => (next) => action

`next`
The next function refers to the dispatch function of the next function in the middleware chain.
If we're at the last link in the chain, then next will refer to the real dispatch function that will update the store state.

# Redux Thunk Source Code


```js

function createThunkMiddleware(extraArgument){
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof next === 'function'){
      return action(dispatch, getState, extraArgument)
    }
    return next(action)
  }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware
export default thunk
```


# Redux-Thunk
The main thing that redux-thunk does is that it checks if the action that's dispatched is a function. 
If it is, it will invoke the function passing dispatch and getState as arguments. 
No extraArgument in our case because of how we imported.

It will then return the return value of the action function.
This will be useful to us later when we want to trigger a react router redirect after an action creator successfully updates the store.

# Reduxifying The CuisinesIndexContainer 
`Currently`

```js
import React, { Component } from 'react'
import GroupsList from '../components/GroupsList'

export default class GroupsIndexContainer extends Component {
  state = {
    groups: [],
    loading: true,
  }

  componentDidMount() {
    // we'd probably want to store the API_URL in an environment variable
    // so this would work in deployment as well but for now we'll hard code the hostname
    fetch('http://localhost:3001/groups', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((groupsJson) => {
        console.log('groups', groupsJson)
        this.setState({
          groups: groupsJson,
          loading: false,
        })
      })
  }

  render() {
    return (
      <section className="max-w-6xl w-11/12 mx-auto mt-16">
        {this.state.loading ? (
          'loading spinner'
        ) : (
          <GroupsList groups={this.state.groups} />
        )}
      </section>
    )
  }
}
```
Starting with our list of groups, we’ll need to have an action creator for loading all of the groups. This action creator will be a thunk so that we’re able to invoke dispatch after we get the response from our API.

touch src/actions/groups.js

Inside of this file, we’ll create an actionCreator called fetchGroups that will return a function (called a thunk) that will be invoked with dispatch as an argument when the redux-thunk middleware kicks in.
```

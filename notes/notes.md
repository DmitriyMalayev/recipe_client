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

# createStore(reducer, [preloadedState], [enhancer])

Creates a Redux store that holds the complete state tree of your app.
There should only be a single store in your app.

`Arguments`
reducer (Function):
A reducing function that returns the next state tree, given the current state tree and an action to handle.

[preloadedState]
(any): The initial state.
You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it. Otherwise, you are free to pass anything that your reducer can understand. <!-- If we wanted to store our redux state in local storage we could load it from there and it would hydrate our redux store with an initial state. -->

[enhancer]
(Function): The store enhancer.
You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is applyMiddleware().

<!-- We will be using applyMiddleware() like thunk as well as Redux DevTools  -->

RETURNS
`(Store):`
An object that holds the complete state of your app.
The only way to change its state is by dispatching actions.
You may also subscribe to the changes to its state to update the UI.

EXAMPLE

```js
import { createStore } from "redux";

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
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
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
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

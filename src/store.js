import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./reducers/index" 

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store 


// applyMiddleware()
// Creates a store enhancer that applies middleware to the dispatch method of the Redux store. This is handy for a variety of tasks, such as expressing asynchronous actions in a concise manner, or logging every action payload.
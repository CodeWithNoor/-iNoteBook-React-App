// asyncchronous function ko reduce kren ma help krta hai
// Middleware is to support asynchronous actions without much boilerplate code
// This is handy for a variety of tasks, such as expressing asynchronous actions in a concise manner, or logging every action payload.

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";


 export const store = createStore(reducers, {}, applyMiddleware(thunk))
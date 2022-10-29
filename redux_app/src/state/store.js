// asynchronous function ko reduce kren ma help krta hai
// Middleware is to support asynchronous actions without much boilerplate code
// This is handy for a variety of tasks, such as expressing asynchronous actions in a concise manner, or logging every action payload.

import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import amountReducer from "./reducers/amountReducer";

const Middleware = applyMiddleware(thunk);
 export const store = configureStore({
    reducer: {
        amount: amountReducer 
    }, Middleware })

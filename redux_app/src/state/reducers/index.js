// combineReducers --> As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state.

import { combineReducers } from "redux";
import amountReducer from "./amountReducer";

const reducers = combineReducers({
    amount: amountReducer
})

 
export default reducers
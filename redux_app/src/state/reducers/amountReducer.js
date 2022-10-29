// Reducer is a function they take the state so far and the action, and return the next state.

 const reducer = (state=0, action) => {
    if(action.type === 'deposite'){
        return state + action.payload;
    }
    else if(action.type === 'withdraw'){
        return state - action.payload;
    }
    else{
        return state;
    }
}

export default reducer
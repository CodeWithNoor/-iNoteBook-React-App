export default reducerMoney = (state=0, action) => {
    if(action.type = 'deposite'){
        return state + action;
    }
    else if(action.type = 'withdarw'){
        return state - action;
    }
    else{
        return state;
    }
}
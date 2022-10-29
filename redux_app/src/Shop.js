import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';

const Shop = () => {
    const dispatch = useDispatch()
    const {withdrawMoney, depositMoney} = bindActionCreators(actionCreators, dispatch)
    const balance = useSelector(state => state.amount)

    return (
        <div className='container m-5'>
            <h3>Deposit/WithDraw Money</h3>
            <button type="button" className="btn btn-dark btn-sm mx-2 my-4" onClick = {()=>{withdrawMoney(100)}}>-</button>
            Update Balance: {(balance)}
            <button type="button" className="btn btn-dark btn-sm mx-2 my-4" onClick = {()=>{depositMoney(100)}}>+</button>
        </div>
    )
}

export default Shop;

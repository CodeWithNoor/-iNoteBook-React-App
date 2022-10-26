import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return (
        <div className="container" style={{height: '60px'}}>
            <div className={`alert alert-${props.type} alert-dismissible fade show text-white`} role="alert">
                 <strong>{capitalize(props.type)}</strong> : {props.message}
             </div>
        </div>
    )
}

export default Alert

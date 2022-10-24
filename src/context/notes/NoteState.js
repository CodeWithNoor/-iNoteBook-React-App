// import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const s1 = {
        name: "Noor",
        class: "3rd year"
    }

    const [state, setState] = useState(s1)
    
    const update = () => {
        setTimeout(() => {
            setState({name: "Abbas", class: "3rd year"})
        }, 3000);
    }
    return (
        // if any element provide in value
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

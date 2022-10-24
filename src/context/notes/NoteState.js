// import React from "react";
// import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    return (
        // if any element provide in value
        <NoteContext.Provider value={{}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

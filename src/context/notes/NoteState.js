// import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [{
        "_id": "6355b98eb298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      },
      {
        "_id": "6355b98eb298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      },
      {
        "_id": "6355b98eb298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      },
      {
        "_id": "6355b98eb298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      }
    ]

    const [notes, setNotes] = useState(notesInitial)
    return (
        // if any element provide in value
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

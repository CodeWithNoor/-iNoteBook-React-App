// import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [{
        "_id": "6355b928eb298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      },
      {
        "_id": "6355b983eb298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      },
      {
        "_id": "6355b98e4b298ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      },
      {
        "_id": "6355b98eb2985ff9cc347a41a",
        "user": "63558fd10455017fcd515633",
        "title": "Hello",
        "description": "Hello! everyone",
        "tag": "greeting",
        "date": "2022-10-23T22:00:46.516Z",
        "__v": 0
      }
    ]

    const [notes, setNotes] = useState(notesInitial)
    console.log("Adding a new note")

    // Add Note
    const addNote = (title, description, tag)=>{
      // TODO --> API CALL
      const note = {"_id": "6355b98eb2985ff9cc347a41a",
      "user": "63558fd10455017fcd515633",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-10-23T22:00:46.516Z",
      "__v": 0}
      setNotes(notes.concat(note))
    }

    // Delete Note
    const deleteNote = (title, description, tag)=>{
      const note = {"_id": "6355b98eb2985ff9cc347a41a",
      "user": "63558fd10455017fcd515633",
      "title": "ADD NOTE",
      "description": "Hello! everyone [ADDED]",
      "tag": "greeting",
      "date": "2022-10-23T22:00:46.516Z",
      "__v": 0}
      setNotes(note.delete(note))
    }
    
    // Update Note
    const updateNote = (title, description, tag)=>{

    }

    return (
        // if any element provide in value
        <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState

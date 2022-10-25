// import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  // ******************* getNote *************************

  const getNote = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1NThmZDEwNDU1MDE3ZmNkNTE1NjMzIn0sImlhdCI6MTY2NjU1MTkyOH0.EQ9wzm5ptfSpTPWLr0-cdTcd7gkIMVw7rvILWxI2Zao"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }


  // ******************* addNote *************************

  // Add Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1NThmZDEwNDU1MDE3ZmNkNTE1NjMzIn0sImlhdCI6MTY2NjU1MTkyOH0.EQ9wzm5ptfSpTPWLr0-cdTcd7gkIMVw7rvILWxI2Zao"
      },
      body: JSON.stringify({ title, description, tag })
    });

    // TODO --> API CALL
    console.log("Adding a new note")
    const note = {
      "_id": "6355b98eb2985ff9cc347a41a",
      "user": "63558fd10455017fcd515633",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-10-23T22:00:46.516Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }


  // ******************* deleteNote *************************

  // Delete Note
  // TODO --> API CALL
  const deleteNote = (id) => {
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return (note._id !== id) })
    setNotes(newNotes)
  }


  // ******************* updateNote *************************

  // Update Note
  // API CALL  --> fetch with headers

  const editNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/api/notes/updatenotes/6355b98eb298ff9cc347a41a`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1NThmZDEwNDU1MDE3ZmNkNTE1NjMzIn0sImlhdCI6MTY2NjU1MTkyOH0.EQ9wzm5ptfSpTPWLr0-cdTcd7gkIMVw7rvILWxI2Zao"
      },

      // body data type must match "Content-Type" header
      body: JSON.stringify({ title, description, tag })
    });

  }

  // Logic to edit in client
  const updateNote = (id, title, description, tag) => {
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

  }

  return (
    // if any element provide in value
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState

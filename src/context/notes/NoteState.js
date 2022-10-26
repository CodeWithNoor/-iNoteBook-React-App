import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  // ******************* getNotes ************************************

  // Get all Notes
  const getNotes = async () => {
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


// ******************* addNotes ************************************

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1NThmZDEwNDU1MDE3ZmNkNTE1NjMzIn0sImlhdCI6MTY2NjU1MTkyOH0.EQ9wzm5ptfSpTPWLr0-cdTcd7gkIMVw7rvILWxI2Zao"
      },
      body: JSON.stringify({title, description, tag})
    });
     

    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }


// ******************* deleteNotes ************************************

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1NThmZDEwNDU1MDE3ZmNkNTE1NjMzIn0sImlhdCI6MTY2NjU1MTkyOH0.EQ9wzm5ptfSpTPWLr0-cdTcd7gkIMVw7rvILWxI2Zao"
      }
    });
    const json = await response.json();
    console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


// ******************* editNotes ************************************


  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1NThmZDEwNDU1MDE3ZmNkNTE1NjMzIn0sImlhdCI6MTY2NjU1MTkyOH0.EQ9wzm5ptfSpTPWLr0-cdTcd7gkIMVw7rvILWxI2Zao"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))  // deep copy
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState


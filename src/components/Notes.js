import noteContext from '../context/notes/noteContext'
import React, { useContext, useEffect } from 'react'
import NoteItem from './NoteItem'
import AddNote from './AddNote'


const Notes = () => {
  const context = useContext(noteContext)
  const {notes,getNote} = context;
  useEffect(()=>{
    getNote()
  }, [])
  
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;   // note send a props as note 
        })}
      </div>
    </>
  )
}

export default Notes

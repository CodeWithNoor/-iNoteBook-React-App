import noteContext from '../context/notes/noteContext'
import React, { useContext } from 'react'
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, setNotes} = context
  return (
    <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note)=>{
          return <NoteItem note={note}/>;   // note send a props as note 
        })}
      </div>
  )
}

export default Notes

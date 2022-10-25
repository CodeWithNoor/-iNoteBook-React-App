import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3">
            <div className="card my-2">
                <div className="card-body">
                    <div className="container d-flex ustify-content-center align-items-center">
                    <h5 className="card-title">{note.title}</h5> 
                    <i className="fa-sharp fa-solid fa-trash-can mx-2"></i>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                
                </div>
            </div>

        </div>

    )
}

export default NoteItem

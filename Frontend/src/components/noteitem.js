import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notecontext';
const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const {DeleteNote}=context;
    const {notes1,updateNote}=props;
  return (
    <div className="col-md-3">
         
         <div className="card">
  <div className="card-body">
    <div className="d-flex align-items-right">
    <h5 className="card-title">{notes1.title}</h5>
    
    <i className="fa-solid fa-trash mx-3" onClick={()=>DeleteNote(notes1._id)}></i>
    <i className="fa-solid fa-file-pen mx-2" onClick={()=>updateNote(notes1)}></i>
    
    </div>
    <p className="card-text">{notes1.description}</p>
    
  </div>
</div>

    </div>
  )
}

export default NoteItem
 
import React, { useState } from 'react'
import NoteContext from '../context/notecontext';
import { useContext } from 'react';
const Addnote = (props) => {
    
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [notes,setnotes]=useState({title:"",description:""});
   const addnote1=(e)=>{
    e.preventDefault();
addNote(notes.title,notes.description);
setnotes({title:"",description:""});
props.showalert("Note added successfully","success");
   }
   const onchange=(e)=>{
    setnotes({...notes,[e.target.name]:e.target.value});
      }    

  return (
    <div>
          <div className='container'>
    <h2>Add a note</h2>
    <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text"   className="form-control" id="title" name="title" value={notes.title} onChange={onchange} minLength={5} required aria-describedby="title"/>

  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Enter content</label>
    <input type="text" className="form-control" name="description"  onChange={onchange} minLength={5} value={notes.description} required id="description"/>
  </div>
  <button type="submit" disabled={notes.title.length<5 || notes.description.length<5} onClick={addnote1} className="btn btn-primary">Add</button>
</form>
<h2>Your Notes</h2>        
    </div>
    </div>
  )
}

export default Addnote

import React from 'react'
import NoteContext from '../context/notecontext';
import { useContext } from 'react';
import NoteItem from './noteitem';
import Addnote from './Addnote';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import {useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context=useContext(NoteContext);
    const {notes,fetchallnotes,UpdateNote}=context;
    let navigate=useNavigate();
     useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        fetchallnotes();
      }
      else  {
        navigate('/login');
      }
       
     })
    const ref = useRef('');

     
    
    const [note,setnote]=useState({etitle:"",edescription:""});
    const updateNote=(currentnotes)=>{
      ref.current.click();
      setnote({etitle:currentnotes.title,edescription:currentnotes.description});
}
  
    const addnote1=(e)=>{
      ref.current.click();
      UpdateNote(note._id,note.etitle,note.edescription);
    e.preventDefault();

   }
   const onchange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value});
   }    
      
   const {showalert}=props;
  return (
    <div>
    <Addnote showalert={showalert} ></Addnote>
    
<Modal
        backdrop="static"
        
      ></Modal>   
      <button ref={ref} type="button" className="btn btn-info btn-lg d-none" data-bs-toggle="modal"  data-bs-target="#myModal"></button>

<div id="myModal" className="modal fade" role="dialog">
  <div className="modal-dialog">

    
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Edit Note</h4>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text"  className="form-control" id="etitle" name="etitle" onChange={onchange}minLength={5} required value={note.etitle}  aria-describedby="etitle"/>

  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Enter content</label>
    <input type="text" className="form-control" name="edescription"  minLength={5} required value={note.edescription} onChange={onchange} id="edescription"/>
  </div>
  <button type="submit" disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={addnote1} className="btn btn-primary">Add</button>
</form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
       <div className="row my-3">
       {(notes.length===0 && 'No notes are here')}
      {notes.map((note)=>{
      return <NoteItem key={note._id} notes1={note} updateNote={updateNote}/>
   })}   
    
    </div>
    </div>
  )
}

export default Notes

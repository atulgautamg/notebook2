import React from "react";
import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState=(props)=>{
    
  const host=5000;
  const notes1=
    [
      ]
      const a={name:"hello",title:"world"};
    const [notes,setnotes]=useState(notes1);
    const addNote= async (title,description)=>{
      const response=await fetch(`http://localhost:${host}/auth/addnotes`,
      {method:'POST',
       headers:{
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
    
       },
       body: JSON.stringify({title,description})
    })
    const json=await response.json();
          setnotes(notes.concat(json));
      }

    
  const fetchallnotes=async ()=>{
  const response=await fetch(`http://localhost:${host}/auth/getnotes`,
  {method:'GET',
   headers:{
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')

   },
  
})

const json1= await response.json();
setnotes(json1);
  }
  const DeleteNote=async(id)=>
  {
    const response=await fetch(`http://localhost:${host}/auth/deletenotes/${id}`,
    {method:'DELETE',
     headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')  
  
     },
    
  })
  
  const json2=await response.json();
  console.log(json2);
   }
    
  
  const UpdateNote=async (id,title,description)=>{
    const response=await fetch(`http://localhost:${host}/auth/updatenotes/${id}`,
    {method:'PUT',
     headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')  
  
     },
     body: JSON.stringify({title,description})
    
  });
  const json=response.json();
  console.log(json);
  let newNotes=JSON.parse(JSON.stringify(notes));
    for(let index=0;index<newNotes.length;index++)
    {
      const element=newNotes[index];
      if(element._id===id)
      {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index]._id=id;
         break;
      }
    }
    
  setnotes(newNotes);
  };
    
    
    return (
        <NoteContext.Provider value={{a,notes,setnotes,addNote,DeleteNote,UpdateNote,fetchallnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
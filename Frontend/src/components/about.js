import React from "react";
import {  useContext  } from "react";

import NoteContext from '../context/notecontext';


const About = () => {
  const a=useContext(NoteContext);
  
  return (
    <div>
      this is about  {a.name}     class is {a.title}
    </div>
  )
}

export default About

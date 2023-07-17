import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
    const [cred,setcred]=useState({name:"",email:"",password:"",cpassword:""});
    
     let navigate=useNavigate();
     
    const handleclick=async (e)=>{
e.preventDefault();
const {name,email,password,date}=cred;
const response=await fetch(`http://localhost:5000/auth/createuser`,
  {method:'POST',
   headers:{
    "Content-Type": "application/json",


   },
   body: JSON.stringify({name,email,password,date})
  
    });
   const json=await response.json();
   console.log(json);
   if(json.success)
   { 
    localStorage.setItem('token',json.token);
        
        props.showalert("account created successfully","success");
        navigate("/login");
   }
   
   else {
    props.showalert("invalid credentails","danger");
   }
}

const onChange=(e)=>{
    setcred({...cred,[e.target.name]:e.target.value});
   }
  return (
    <div className="container" >
    <form onSubmit={handleclick}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" minLength={5} onChange={onChange} name="name" id="name" aria-describedby="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"  name="email" onChange={onChange} aria-describedby="email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" minLength={5} onChange={onChange} id="password"/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="cpassword"  className="form-label">Confirm Password</label>
    <input type="password" className="form-control" minLength={5} name="cpassword" onChange={onChange} id="cpassword"/>
  </div>
  
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup

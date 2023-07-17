        
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
const Login = (props) => {
    const [cred,setcred]=useState({email:"",password:""});
    
     let navigate=useNavigate();
    const handleclick=async (e)=>{
e.preventDefault();
const response=await fetch(`http://localhost:5000/auth/login`,
  {method:'POST',
   headers:{
    "Content-Type": "application/json",


   },
   body: JSON.stringify({password:cred.password, email:cred.email})
  
    });
   const json=await response.json();
   console.log(json);
   if(json.success)
   { 
    localStorage.setItem('token',json.token);
    props.showalert("login successfully","success");
    
    navigate("/");
       
   }
   else {
    props.showalert("invalid credentails","danger");
   }
}

const onChange=(e)=>{
    setcred({...cred,[e.target.name]:e.target.value});
   }    
  return (
    <div className='container'>
        <form onSubmit={handleclick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email"  name="email"  value={cred.email} className="form-control" id="email" onChange={onChange} aria-describedby="email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  name="password" value={cred.password} className="form-control" id="password" onChange={onChange}/>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login

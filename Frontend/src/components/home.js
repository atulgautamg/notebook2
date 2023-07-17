
import React from 'react'
import Notes from './notes';


const Home = (props) => {
  
  return (
    <div className='container'>
   <Notes showalert={props.showalert} ></Notes>

</div>
  )
}

export default Home

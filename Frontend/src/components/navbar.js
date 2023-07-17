
import React from 'react'
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate();
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handlelogout=()=>{
    localStorage.removeItem('token');
     navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand active" to="/">Notebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'? "active":" "}`} aria-current="page" to="/">Home</Link>
        </li>
      </ul>
 
      {!localStorage.getItem('token')? <form className="d-flex">
        
        <Link button className="btn btn-primary mx-2" type="submit" to="/login">Login</Link>
        <Link button className="btn btn-primary  mx-2" type="submit" to="/signup">Signup</Link>
      </form>:<button onClick={handlelogout} className='btn btn-primary'> Logout</button>}   
 
    </div>
  </div>
</nav>
</div>
  )
}

export default Navbar

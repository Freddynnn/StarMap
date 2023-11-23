import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../assets/nexus.png';
import './Navbar.css';
import Button from '../Button/Button';


function Navbar () {

  const [button, setButton] = useState(true);
  return (
    <div className='Navbar'>
       <div className='navbar-links_container'>
        {/* <div className='Navbar-title'> A MAP OF THE STARS </div> */}
        <Link to='/home' className='Navbar-title'>A MAP OF THE STARS </Link>
        
        <Link to='/login' className='nav-links'>LOGIN</Link>
        <Link to='/about' className='nav-links'>ABOUT</Link>
        {/* <Link to='/constellation/new' className='nav-links'>Create Constellation</Link> */}
        <div className='navbar-button'>
          {button && <Link to="register"><Button>SIGN UP</Button></Link>}
        </div>

      </div>
    </div>
  )
}

export default Navbar;
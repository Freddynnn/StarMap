import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
// import logo from '../../assets/nexus.png';
import './Navbar.css';
import Button from '../Button/Button';


function Navbar () {

  const [button, setButton] = useState(true);
  const navigate = useNavigate(); 
  return (
    <div className='Navbar'>
       <div className='navbar-links_container'>
        <Link to='/home' className='nav-links'>Home</Link>
        <Link to='/login' className='nav-links'>Log In</Link>
        <Link to='/about' className='nav-links'>About Us</Link>
        <Link to='/contactus' className='nav-links'>Contact Us</Link>
        <div className='navbar-button'>
        {button && <Link to="/register"><Button>Register here</Button></Link>}

      </div>
      </div>
      
      
    </div>
    
  )
}

export default Navbar;
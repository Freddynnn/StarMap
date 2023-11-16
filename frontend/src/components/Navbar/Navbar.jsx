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
        {/* <div className='Navbar-title'> A MAP OF THE STARS </div> */}
        <Link to='/home' className='Navbar-title'>A MAP OF THE STARS </Link>
        
        <Link to='/login' className='nav-links'>Login</Link>
        <Link to='/about' className='nav-links'>About</Link>
        {/* <Link to='/constellation/new' className='nav-links'>Create Constellation</Link> */}
        <div className='navbar-button'>
        {button && <Link to="register"><Button>register</Button></Link>}

      </div>
      </div>
      
      
    </div>
    
  )
}

export default Navbar;
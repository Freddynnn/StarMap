import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../assets/nexus.png';
import './Navbar.css';

import Button from '../Button/Button';

function PriNavbar() {
  const [button, setButton] = useState(true);

  return (
    <div className='Navbar'>
     
      <div className='navbar-links_container'>

        
        <Link to='/dashboard' className='Navbar-title'>A MAP OF THE STARS </Link>
        <Link to='/profile' className='nav-links'>PROFILE</Link>
        <Link to='/about' className='nav-links'>ABOUT</Link>
        {/* <Link to='/constellation/new' className='nav-links'>Create Constellation</Link> */}
        <div className='navbar-button'>
          {button && <Link to="constellation/new"><Button>CREATE</Button></Link>}
        </div>
      </div>
      
    </div>
  );
}

export default PriNavbar;

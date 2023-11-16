import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import logo from '../../assets/nexus.png';
import './Navbar.css';

function PriNavbar() {
  const [button, setButton] = useState(true);
  const location = useLocation(); // Get the current location

  return (
    <div className='navbar'>
     
      <div className='navbar-links_container'>
        <Link
          to='/dashboard'
          className={`nav-links ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link
          to='/calendar'
          className={`nav-links ${location.pathname === '/calendar' ? 'active' : ''}`}
        >
          Calendar
        </Link>
        <Link
          to='/contacts'
          className={`nav-links ${location.pathname === '/contacts' ? 'active' : ''}`}
        >
          Contacts
        </Link>
        <Link
          to='/profile'
          className={`nav-links ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          My Profile
        </Link>
      </div>
      
    </div>
  );
}

export default PriNavbar;

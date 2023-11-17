import logo from './logo.svg';
import './App.css';


import React from 'react';
import { useState } from "react";
// import { Features, Header, Login, Register, Protected, Change, CalendarContainer, EventContainer, ContactContainer  } from './containers';



import { Navbar, Layout, PriNavbar, Protected } from './components';

// import {ContactsPage, NewContactForm, SingleContactPage, 
//   EditEventForm, NewEventForm, SingleEventPage,
//   GroupsPage, NewGroupForm, SingleGroupPage, , Profile, Home} from './pages';

import {Home, Dashboard, About, ContactUs, Login, Register, Profile,  NewConstellation} from './pages'

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';


const App = () => {
  //variable for protected routes
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  //state for userdata to display when logged in
  const [user, setUser] = useState(null); 

  const logIn = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
  };


  // list of public routes
  return (
    <Router>
      <Layout>
        <div className='App'> 
          <div className='gradient__bg'>
          
          {/* Conditionally render Navbar or PriNavbar */}
          {isLoggedIn ? <PriNavbar user={user}/> : <Navbar />}
            
            <Routes>
              
             {/* public routes */}
             <Route path="/" element={<Home />} />

            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
              
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login logIn={logIn} />}
              />
              <Route path="/register" element={<Register />} />
              
              
              <Route
                path="/dashboard"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Dashboard user = {user}/>
                  </Protected>
                }
              />

              <Route 
                path="/constellation/new" 
                element={
                  <Protected isLoggedIn={isLoggedIn}>    
                    <NewConstellation user={user} />
                  </Protected>
                } 
              />

              <Route
                path="/profile"
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <Profile user={user} logOut={logOut} />
                  </Protected>
                }
              />


              {/* 

              <Route
                path="/contacts"
                element={
                  <ContactsPage user={user} />
                }
              />
            
              
              
              <Route 
              path="/contacts/contact/:id" 
              element={
                <Protected isLoggedIn={isLoggedIn}>    
                  <SingleContactPage />
                </Protected>
                } 
              /> */}


            </Routes>            
          </div>
        </div>
      </Layout>
    </Router>
  );
}

export default App;

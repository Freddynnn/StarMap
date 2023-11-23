import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';
import Button from '../components/Button/Button';
import NightSky from '../components/NightSky/NightSky';
import axios from 'axios';
import '../components/Dashboard/dashboard.css'; 

function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/constellation/new');
  };

  const handleClick = (id) => {
    navigate('/constellation/' + id);
  };



  return (
    <NightSky user={user}/>
  );
}

export default Dashboard;

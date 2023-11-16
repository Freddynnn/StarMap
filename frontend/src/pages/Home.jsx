import React from 'react';
import { useLocation } from 'react-router-dom';
import '../components/Home/home.css';
import Layout from '../components/Layouts/Layout';
import NightSky from '../components/NightSky/NightSky';

const Home = () => {
  const location = useLocation();

  return (
    <Layout>
      <NightSky />
      <p>Welcome to the Home Page!</p>
    </Layout>
  );
};

export default Home;
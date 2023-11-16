import React from 'react';
import Layout from '../components/Layouts/Layout';

const About = () => {
  return (
    <Layout>
      <div className='about-page'>
        
        <div className='description'>
          <h2>TITLE </h2>
          <h4>SUBTITLE</h4>
          <p>
            DESCRIPTION
          </p>
        </div>
        <footer>
          <h3>FOOTER </h3>
        </footer>
      </div>
    </Layout>
  );
}

export default About;

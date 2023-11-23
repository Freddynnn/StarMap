import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layouts/Layout';
import Button from '../../components/Button/Button';
import '../../components/Form/form.css';
import axios from 'axios';

function Login({ logIn }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload with user and password
    const payload = { username: user, password: password };

    try {
      // Send a POST request to your login endpoint on your backend
      const response = await axios.post('https://starmap-43wf.onrender.com/login', payload);

      if (response.status === 200) {
        console.log('Authentication successful');
        const userData = response.data.user;
        logIn(userData);
        console.log('Navigating to dashboard');
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error authenticating:', error);
      setError('Incorrect username or password');
    }
  }

  return (
    <Layout>
      <main className='form-container'>
        <section className="login-form">
          <header>
            <h2>Log In Now</h2>
            <div className="new">
              <h3>Do not have an account?</h3>
              <Link to="/register" className="custom-link">Register here!</Link>
            </div>
          </header>
          <form onSubmit={handleSubmit}>
            <label htmlFor="user">Username</label>
            <input
              maxLength="30"
              minLength="5"
              name="user"
              type="text"
              id="user"
              placeholder="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
            />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="error-message">{error}</p>}

            <br/>
            <br/>
            <Button type="submit">Submit</Button>
          </form>
        </section>
      </main>
    </Layout>
  );
  
}

export default Login;

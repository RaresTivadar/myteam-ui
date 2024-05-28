import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };

  const inputStyle = {
    margin: '10px 0',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: '#5e548e',
    color: 'white',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password }); // Debug log

    try {
      const response = await axios.post('http://localhost:3107/api/users/login', { email, password });
      console.log('Login response:', response.data); // Debug log

      const user = response.data.user;
      localStorage.setItem('userId', user._id); // Store user ID in local storage
      localStorage.setItem('userRole', user.role); // Store user role in local storage

      if (user.role === 'player') {
        navigate('/player');
      } else if (user.role === 'coach') {
        navigate('/coach');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error logging in:', error); // Debug log
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Error logging in');
      } else {
        setMessage('Error logging in');
      }
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to MyTeam Web Application</h1>
      <p>The place to manage your sports team easily</p>
      <form style={formStyle} onSubmit={handleLogin}>
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={buttonStyle}>Log In</button>
      </form>
      <button onClick={handleSignUp} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Sign Up</button>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default HomePage;

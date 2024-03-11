import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to the sign-up page

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Inline styles for the form and buttons
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
  };

  // Handlers for form actions
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
    // Implement login logic here
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <div>
      <h1>Welcome to MyTeam Web App</h1>
      <form style={formStyle} onSubmit={handleLogin}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={buttonStyle}>Log In</button>
      </form>
      <button onClick={handleSignUp} style={{...buttonStyle, backgroundColor: '#5e548e', color: 'white'}}>Sign Up</button>
    </div>
  );
};

export default HomePage;

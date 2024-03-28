import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminTeamCreation.css'; 

const AdminTeamCreation = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedCode = Math.random().toString(36).substr(2, 8);
    setAccessCode(generatedCode);
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="team-creation-container">
      <h1>Create a New Team</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
          required
        />
        <button type="submit">Generate Access Code</button>
      </form>
      {accessCode && (
        <div>
          <p>Your team's access code: {accessCode}</p>
          <button onClick={handleBack}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default AdminTeamCreation;

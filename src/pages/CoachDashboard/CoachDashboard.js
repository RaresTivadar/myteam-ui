import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CoachDashboard.css';

const CoachDashboard = () => {
  const navigate = useNavigate();

  const teams = [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Beta' },
  ];

  const handleTeamClick = (teamId) => {
    navigate(`/coach/team/${teamId}`);
  };

  const handleCreateTeam = () => {
    navigate('/create-team'); 
  };

  return (
    <div className="coach-dashboard-container">
      <h1>Coach Dashboard</h1>
      <button onClick={handleCreateTeam}>Create New Team</button>
      <div className="teams-list">
        <h2>Your Teams</h2>
        <ul>
          {teams.map((team) => (
            <li key={team.id} onClick={() => handleTeamClick(team.id)}>
              {team.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoachDashboard;
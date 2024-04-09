import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoachDashboard.css';
import MyProfilePage from '../MyProfilePage/MyProfilePage';

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const teams = [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Beta' },
  ];

  const handleTeamClick = (teamId) => {
    navigate(`/coach/team/${teamId}`);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <MyProfilePage />;
      case 'teams':
        return (
          <div className="teams-content">
            <h2 className="section-title">My Teams</h2>
            <ul className="teams-list">
              {teams.map((team) => (
                <li key={team.id} onClick={() => handleTeamClick(team.id)}>
                  {team.name}
                </li>
              ))}
            </ul>
            <button className="create-team-btn" onClick={() => navigate('/create-team')}>Create New Team</button>
          </div>
        );
      default:
        return <div>Select a tab...</div>;
    }
  };

  return (
    <div className="coach-dashboard-container">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>My Profile</button>
        <button onClick={() => setActiveTab('teams')} className={activeTab === 'teams' ? 'active' : ''}>Teams</button>
      </nav>
      {renderActiveTabContent()}
    </div>
  );
};

export default CoachDashboard;

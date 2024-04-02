import React, { useState } from 'react';
import './PlayerDashboard.css';
import CalendarPage from '../CalendarPage/CalendarPage';
import PlayerAttendancePage from '../PlayerAttendancePage/PlayerAttendancePage';


const PlayerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile'); 

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <div className="profile-section">Profile content...</div>;
      case 'rankings':
        return <div>Rankings content...</div>;
      case 'stats':
        return <div>Player stats content...</div>;
      case 'matches':
        return <div>Next matches content...</div>;
      case 'calendar':
        return <CalendarPage />;
      case 'attendance':
        return <PlayerAttendancePage />;
      case 'sessions':
        return <div>Session recording content...</div>;
      default:
        return <div>Select a tab...</div>;
    }
  };

  return (
    <div className="player-dashboard">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>My Profile</button>
        <button onClick={() => setActiveTab('rankings')} className={activeTab === 'rankings' ? 'active' : ''}>Rankings</button>
        <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Player Stats</button>
        <button onClick={() => setActiveTab('matches')} className={activeTab === 'matches' ? 'active' : ''}>Next Matches</button>
        <button onClick={() => setActiveTab('calendar')} className={activeTab === 'calendar' ? 'active' : ''}>Calendar</button>
        <button onClick={() => setActiveTab('attendance')} className={activeTab === 'attendance' ? 'active' : ''}>Attendance</button>
        <button onClick={() => setActiveTab('sessions')} className={activeTab === 'sessions' ? 'active' : ''}>Record Sessions</button>
      </nav>
      <div className="tab-content">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};

export default PlayerDashboard;

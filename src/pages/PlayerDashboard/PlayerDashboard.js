import React, { useState, useEffect } from 'react';
import './PlayerDashboard.css';
import PlayerCalendarPage from '../PlayerCalendarPage/PlayerCalendarPage';
import PlayerAttendancePage from '../PlayerAttendancePage/PlayerAttendancePage';
import PlayerStatisticsPage from '../PlayerStatisticsPage/PlayerStatisticsPage';
import PlayerNextMatchesPage from '../PlayerNextMatchesPage/PlayerNextMatchesPage';
import PlayerAnnouncementPage from '../PlayerAnnouncementPage/PlayerAnnouncementPage';
import MyProfilePage from '../MyProfilePage/MyProfilePage';
import RecordSessionPage from '../RecordSessionPage/RecordSessionPage';
import PlayerRankingsPage from '../PlayerRankingsPage/PlayerRankingsPage';
import axios from 'axios';
import PlayerResultsPage from '../PlayerResultsPage/PlayerResultsPage';

const PlayerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile'); 
  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3107/api/users/${userId}/teams`);
        const teams = response.data.team;
        if (teams.length > 0) {
          setTeamId(teams[0]._id);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <MyProfilePage />;
      case 'announcements':
        return <PlayerAnnouncementPage teamId={teamId} />;
      case 'rankings':
        return <PlayerRankingsPage />;
      case 'stats':
        return <PlayerStatisticsPage />;
      case 'matches':
        return <PlayerNextMatchesPage />;
      case 'results':
        return <PlayerResultsPage />;
      case 'calendar':
        return <PlayerCalendarPage />;
      case 'attendance':
        return <PlayerAttendancePage />;
      case 'sessions':
        return <RecordSessionPage />;
      default:
        return <div>Select a tab...</div>;
    }
  };

  return (
    <div className="player-dashboard">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>My Profile</button>
        <button onClick={() => setActiveTab('announcements')} className={activeTab === 'announcements' ? 'active' : ''}>Announcements</button>
        <button onClick={() => setActiveTab('rankings')} className={activeTab === 'rankings' ? 'active' : ''}>Rankings</button>
        <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? 'active' : ''}>Player Stats</button>
        <button onClick={() => setActiveTab('matches')} className={activeTab === 'matches' ? 'active' : ''}>Next Matches</button>
        <button onClick={() => setActiveTab('results')} className={activeTab === 'results' ? 'active' : ''}>Match Results</button>
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

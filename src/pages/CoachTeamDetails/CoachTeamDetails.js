import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CoachTeamDetails.css';
import CoachAnnouncementPage from '../CoachAnnouncementPage/CoachAnnouncementPage';
import CoachCalendarPage from '../CoachCalendarPage/CoachCalendarPage';
import CoachAttendancePage from '../CoachAttendancePage/CoachAttendancePage';
import CoachStatisticsPage from '../CoachStatisticsPage/CoachStatisticsPage';
import CoachNextMatchesPage from '../CoachNextMatchesPage/CoachNextMatchesPage';
import CoachRankingsPage from '../CoachRankingsPage/CoachRankingsPage';
import CoachResultsPage from '../CoachResultsPage/CoachResultsPage';

const CoachTeamDetails = () => {
  const { teamId } = useParams();
  const [activeSection, setActiveSection] = useState('announcements');
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3107/api/teams/${teamId}`);
        setTeamName(response.data.name);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'announcements':
        return <CoachAnnouncementPage teamId={teamId} />;
      case 'calendar':
        return <CoachCalendarPage teamId={teamId} />;
      case 'rankings':
        return <CoachRankingsPage teamId={teamId} />;
      case 'nextmatches':
        return <CoachNextMatchesPage teamId={teamId} />;
      case 'results':
        return <CoachResultsPage teamId={teamId} />;
      case 'attendance':
        return <CoachAttendancePage teamId={teamId} />;
      case 'playerstats':
        return <CoachStatisticsPage teamId={teamId} />;
      case 'messages':
        return <div>Messages for Team {teamId}...</div>;
      default:
        return <div>Select a section...</div>;
    }
  };

  return (
    <div className="coach-team-details-container">
      <h1 className="team-title">Team {teamName}</h1>
      <nav className="details-nav">
        <button onClick={() => setActiveSection('announcements')} className={activeSection === 'announcements' ? 'active' : ''}>Announcements</button>
        <button onClick={() => setActiveSection('calendar')} className={activeSection === 'calendar' ? 'active' : ''}>Calendar</button>
        <button onClick={() => setActiveSection('rankings')} className={activeSection === 'rankings' ? 'active' : ''}>Rankings</button>
        <button onClick={() => setActiveSection('nextmatches')} className={activeSection === 'nextmatches' ? 'active' : ''}>Next Matches</button>
        <button onClick={() => setActiveSection('results')} className={activeSection === 'results' ? 'active' : ''}>Match Results</button>
        <button onClick={() => setActiveSection('attendance')} className={activeSection === 'attendance' ? 'active' : ''}>Attendance</button>
        <button onClick={() => setActiveSection('playerstats')} className={activeSection === 'playerstats' ? 'active' : ''}>Player Stats</button>
        <button onClick={() => setActiveSection('messages')} className={activeSection === 'messages' ? 'active' : ''}>Messages</button>
      </nav>
      <div className="section-content">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default CoachTeamDetails;

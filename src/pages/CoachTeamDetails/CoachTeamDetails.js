import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CoachTeamDetails.css';
import CoachAnnouncementPage from '../CoachAnnouncementPage/CoachAnnouncementPage';
import CalendarPage from '../CalendarPage/CalendarPage';
import CoachAttendancePage from '../CoachAttendancePage/CoachAttendancePage';

const CoachTeamDetails = () => {
  const { teamId } = useParams();
  const [activeSection, setActiveSection] = useState('announcements');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'announcements':
        return <CoachAnnouncementPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'rankings':
        return <div>Rankings content for Team {teamId}...</div>;
      case 'nextmatches':
        return <div>Next Matches content for Team {teamId}...</div>;
      case 'attendance':
        return <CoachAttendancePage />;
      case 'playerstats':
        return <div>Player Stats content for Team {teamId}...</div>;
      case 'messages':
        return <div>Messages for Team {teamId}...</div>;
      default:
        return <div>Select a section...</div>;
    }
  };

  return (
    <div className="coach-team-details-container">
      <h1 className="team-title">Team {teamId}</h1>
      <nav className="details-nav">
        <button onClick={() => setActiveSection('announcements')} className={activeSection === 'announcements' ? 'active' : ''}>Announcements</button>
        <button onClick={() => setActiveSection('calendar')} className={activeSection === 'calendar' ? 'active' : ''}>Calendar</button>
        <button onClick={() => setActiveSection('rankings')} className={activeSection === 'rankings' ? 'active' : ''}>Rankings</button>
        <button onClick={() => setActiveSection('nextmatches')} className={activeSection === 'nextmatches' ? 'active' : ''}>Next Matches</button>
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

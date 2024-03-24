import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CoachTeamDetails.css';

const CoachTeamDetails = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const handleViewAnnouncements = () => {
    navigate(`/coach/team/${teamId}/announcements`);
  };

  const handleViewCalendar = () => {
    navigate(`/coach/team/${teamId}/calendar`);
  };

  return (
    <div className="coach-team-details-container">
      <h1>Team Details: Team {teamId}</h1>
      <div className="section">
        <h2>Announcements</h2>
        <button onClick={handleViewAnnouncements} className="section-btn">View Announcements</button>
      </div>
      <div className="section">
        <h2>Calendar</h2>
        <button onClick={handleViewCalendar} className="section-btn">View Calendar</button>
      </div>
    </div>
  );
};

export default CoachTeamDetails;

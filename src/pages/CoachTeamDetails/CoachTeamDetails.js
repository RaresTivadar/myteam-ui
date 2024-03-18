import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CoachTeamDetails.css'; 

const CoachTeamDetails = () => {
  const { teamId } = useParams(); 
  const navigate = useNavigate();

  const handleViewAnnouncements = () => {
    navigate(`/coach/team/${teamId}/announcements`);
  };

  return (
    <div className="coach-team-details-container">
      <h1>Team Details: Team {teamId}</h1>
      <button onClick={handleViewAnnouncements} className="view-announcements-btn">
        View Announcements
      </button>
      <div className="section">
        <h2>Training Sessions</h2>
        <p>No training sessions scheduled.</p>
      </div>
      <div className="section">
        <h2>Calendar</h2>
        <p>Calendar feature coming soon.</p>
      </div>
    </div>
  );
};

export default CoachTeamDetails;

import React from 'react';
import { useParams } from 'react-router-dom';
import './CoachTeamDetails.css'; 

const CoachTeamDetails = () => {
  const { teamId } = useParams(); 

  return (
    <div className="coach-team-details-container">
      <h1>Team Details: Team {teamId}</h1>
      <div className="section">
        <h2>Announcements</h2>
        <p>No announcements yet.</p>
      </div>
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

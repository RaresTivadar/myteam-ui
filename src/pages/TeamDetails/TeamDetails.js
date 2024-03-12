import React from 'react';
import { useParams } from 'react-router-dom';
import './TeamDetails.css'; 

const TeamDetails = () => {
  const { teamId } = useParams(); 
  
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Coach' },
    { id: 2, name: 'Jane Smith', role: 'Player' },
    { id: 3, name: 'Emily Johnson', role: 'Player' },
  ];

  return (
    <div className="team-details-container">
      <h1 className="team-details-heading">Team Details: Team {teamId}</h1>
      <h2 className="team-details-subheading">Team Members</h2>
      <ul className="team-details-list">
        {teamMembers.map((member) => (
          <li key={member.id}>
            {member.name} - {member.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;

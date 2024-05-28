import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminTeamDetails.css';

const AdminTeamDetails = () => {
  const { teamId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3107/api/teams/${teamId}/users`);
        setTeamName(response.data.teamName);
        setTeamMembers([...response.data.coaches, ...response.data.players]);
      } catch (error) {
        setError('Error fetching team members: ' + (error.response ? error.response.data.message : error.message));
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, [teamId]);

  return (
    <div className="admin-team-details-container">
      <h1 className="admin-team-details-heading">Team Details: {teamName}</h1>
      <h2 className="admin-team-details-subheading">Team Members</h2>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <ul className="admin-team-details-list">
          {teamMembers.map((member) => (
            <li key={member._id}>
              {member.name} {member.surname} - {member.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTeamDetails;

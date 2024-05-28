import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminFirstPage.css';

const AdminFirstPage = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3107/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const navigateToTeamDetail = (teamId) => {
    navigate(`/admin/team/${teamId}`);
  };

  return (
    <div className="admin-page-container">
      <h1>Admin Dashboard - Teams Overview</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Number of Users</th>
            <th>Number of Coaches</th>
            <th>Number of Players</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => (
            <tr key={team._id} onClick={() => navigateToTeamDetail(team._id)}>
              <td>{team.name}</td>
              <td>{team.coaches.length + team.players.length}</td>
              <td>{team.coaches.length}</td>
              <td>{team.players.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFirstPage;

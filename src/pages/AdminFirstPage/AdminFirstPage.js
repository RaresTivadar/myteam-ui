import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminFirstPage.css';

const AdminFirstPage = () => {
  const navigate = useNavigate();

  const teams = [
    { id: 1, name: "Team Alpha", userCount: 15, coachCount: 2, playerCount: 13 },
    { id: 2, name: "Team Beta", userCount: 12, coachCount: 1, playerCount: 11 },
    { id: 3, name: "Team Gamma", userCount: 8, coachCount: 1, playerCount: 7 },
  ];

  const navigateToTeamDetail = (teamId) => {
    navigate(`/team/${teamId}`);
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
            <tr key={team.id} onClick={() => navigateToTeamDetail(team.id)}>
              <td>{team.name}</td>
              <td>{team.userCount}</td>
              <td>{team.coachCount}</td>
              <td>{team.playerCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFirstPage;
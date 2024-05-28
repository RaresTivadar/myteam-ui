import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachStatisticsPage.css';

const CoachStatisticsPage = ({ teamId }) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({ matchesPlayed: '', goals: '', assists: '' });

  useEffect(() => {
    if (teamId) {
      fetchPlayerStats();
    }
  }, [teamId]);

  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get(`http://localhost:3107/api/statistics/team/${teamId}`);
      setPlayerStats(response.data);
    } catch (error) {
      console.error('Error fetching player statistics:', error);
    }
  };

  const handleEditClick = (player) => {
    setEditingPlayer(player);
    setFormData({
      matchesPlayed: player.matchesPlayed,
      goals: player.goals,
      assists: player.assists,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3107/api/statistics/${editingPlayer._id}`, formData);
      setEditingPlayer(null);
      fetchPlayerStats();
    } catch (error) {
      console.error('Error updating statistics:', error);
    }
  };

  return (
    <div className="stats-container">
      <h1>Team Player Statistics</h1>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Matches Played</th>
            <th>Goals</th>
            <th>Assists</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {playerStats.map((player) => (
            <tr key={player._id}>
              <td>{player.user.name} {player.user.surname}</td>
              <td>{player.matchesPlayed}</td>
              <td>{player.goals}</td>
              <td>{player.assists}</td>
              <td>
                <button onClick={() => handleEditClick(player)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPlayer && (
        <div className="edit-form">
          <h2>Edit Statistics for {editingPlayer.user.name}</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Matches Played:
              <input type="number" name="matchesPlayed" value={formData.matchesPlayed} onChange={handleInputChange} />
            </label>
            <label>
              Goals:
              <input type="number" name="goals" value={formData.goals} onChange={handleInputChange} />
            </label>
            <label>
              Assists:
              <input type="number" name="assists" value={formData.assists} onChange={handleInputChange} />
            </label>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditingPlayer(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CoachStatisticsPage;

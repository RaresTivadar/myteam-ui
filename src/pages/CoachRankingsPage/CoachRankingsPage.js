import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import rankingService from '../../services/rankingService';
import './CoachRankingsPage.css';

const CoachRankingsPage = () => {
  const { teamId } = useParams();
  const [rankings, setRankings] = useState([]);
  const [newRanking, setNewRanking] = useState({
    team: '',
    matchesPlayed: 0,
    goalsScored: 0,
    goalsReceived: 0,
    points: 0,
  });

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await rankingService.getRankingsByCoach(teamId);
        setRankings(data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, [teamId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRanking({ ...newRanking, [name]: value });
  };

  const handleAddRanking = async () => {
    try {
      const data = await rankingService.createRanking({ ...newRanking, coach: teamId });
      setRankings([...rankings, data]);
      setNewRanking({
        team: '',
        matchesPlayed: 0,
        goalsScored: 0,
        goalsReceived: 0,
        points: 0,
      });
    } catch (error) {
      console.error('Error adding ranking:', error);
    }
  };

  const handleUpdateRanking = async (id, updatedRanking) => {
    try {
      await rankingService.updateRanking(id, updatedRanking);
      setRankings(rankings.map(r => (r._id === id ? updatedRanking : r)));
    } catch (error) {
      console.error('Error updating ranking:', error);
    }
  };

  const handleDeleteRanking = async (id) => {
    try {
      await rankingService.deleteRanking(id);
      setRankings(rankings.filter((ranking) => ranking._id !== id));
    } catch (error) {
      console.error('Error deleting ranking:', error);
    }
  };

  const sortedRankings = rankings.sort((a, b) => b.points - a.points);

  return (
    <div className="rankings-container">
      <h1>Manage Competition Standings</h1>
      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>MP</th>
            <th>GS</th>
            <th>GR</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((ranking, index) => (
            <tr key={ranking._id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={ranking.team}
                  onChange={(e) =>
                    handleUpdateRanking(ranking._id, { ...ranking, team: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={ranking.matchesPlayed}
                  onChange={(e) =>
                    handleUpdateRanking(ranking._id, { ...ranking, matchesPlayed: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={ranking.goalsScored}
                  onChange={(e) =>
                    handleUpdateRanking(ranking._id, { ...ranking, goalsScored: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={ranking.goalsReceived}
                  onChange={(e) =>
                    handleUpdateRanking(ranking._id, { ...ranking, goalsReceived: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={ranking.points}
                  onChange={(e) =>
                    handleUpdateRanking(ranking._id, { ...ranking, points: e.target.value })
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRanking(ranking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-ranking-form">
        <h2>Add New Team</h2>
        <input
          type="text"
          name="team"
          placeholder="Team Name"
          value={newRanking.team}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="matchesPlayed"
          placeholder="Matches Played"
          value={newRanking.matchesPlayed}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="goalsScored"
          placeholder="Goals Scored"
          value={newRanking.goalsScored}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="goalsReceived"
          placeholder="Goals Received"
          value={newRanking.goalsReceived}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="points"
          placeholder="Points"
          value={newRanking.points}
          onChange={handleInputChange}
        />
        <button onClick={handleAddRanking}>Add Team</button>
      </div>
    </div>
  );
};

export default CoachRankingsPage;

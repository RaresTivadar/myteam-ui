import React, { useState, useEffect } from 'react';
import rankingService from '../../services/rankingService';
import './PlayerRankingsPage.css';

const PlayerRankingsPage = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await rankingService.getAllRankings();
        const sortedRankings = data.sort((a, b) => b.points - a.points);
        setRankings(sortedRankings);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="rankings-container">
      <h1>Competition Standings</h1>
      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>MP</th>
            <th>GS</th>
            <th>GR</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, index) => (
            <tr key={ranking._id}>
              <td>{index + 1}</td>
              <td>{ranking.team}</td>
              <td>{ranking.matchesPlayed}</td>
              <td>{ranking.goalsScored}</td>
              <td>{ranking.goalsReceived}</td>
              <td>{ranking.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRankingsPage;

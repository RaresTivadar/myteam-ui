import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent';
import './PlayerNextMatchesPage.css';

const PlayerNextMatchesPage = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const matches = [
    {
      id: 1,
      date: '2024-04-15',
      teams: 'Team A vs Team B',
      location: 'Timisoara, Romania',
      latitude: 45.74342346191406,
      longitude: 21.248149871826172,
      h2h: 'Head-to-Head info here',
      stadium: 'Baza 2 Timisoara',
    },
    {
        id: 2,
        date: '2024-04-22',
        teams: 'Team A vs Team C',
        location: 'Timisoara, Romania',
        latitude: 45.7435,
        longitude: 21.2257,
        h2h: 'Head-to-Head info here',
        stadium: 'Baza 1 Timisoara',
    }
  ];

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matches.find(match => match.id === matchId));
  };

  return (
    <div className="matches-container">
      <h1>Upcoming Matches</h1>
      <ul className="matches-list">
        {matches.map((match) => (
          <li key={match.id} className="match-item" onClick={() => handleSelectMatch(match.id)}>
            <div>{match.date} - {match.teams} - {match.location}</div>
          </li>
        ))}
      </ul>
      {selectedMatch && (
        <div className="selected-match-details">
          <h2>Details for {selectedMatch.teams}</h2>
          <p>{selectedMatch.h2h}</p>
          <p>Stadium: {selectedMatch.stadium}</p>
          <MapComponent latitude={selectedMatch.latitude} longitude={selectedMatch.longitude} />
        </div>
      )}
    </div>
  );
};

export default PlayerNextMatchesPage;

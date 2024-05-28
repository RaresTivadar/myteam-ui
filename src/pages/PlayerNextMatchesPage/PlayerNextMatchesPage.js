import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../../components/MapComponent';
import { format, startOfDay } from 'date-fns';
import './PlayerNextMatchesPage.css';

const PlayerNextMatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('http://localhost:3107/api/events/type/Match');
        const upcomingMatches = response.data.filter(match => new Date(match.date) >= startOfDay(new Date()));
        const sortedMatches = upcomingMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
        setMatches(sortedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleSelectMatch = (matchId) => {
    setSelectedMatch(matches.find(match => match._id === matchId));
  };

  return (
    <div className="matches-container">
      <h1>Upcoming Matches</h1>
      <ul className="matches-list">
        {matches.map((match) => (
          <li key={match._id} className="match-item" onClick={() => handleSelectMatch(match._id)}>
            <div><strong>{match.name}</strong>: {match.score || 'TBD'} - {format(new Date(match.date), 'yyyy-MM-dd')} - {match.location}</div>
          </li>
        ))}
      </ul>
      {selectedMatch && (
        <div className="selected-match-details">
          <h2>Details for {selectedMatch.name}</h2>
          <p>Stadium: {selectedMatch.stadium}</p>
          <MapComponent latitude={selectedMatch.latitude} longitude={selectedMatch.longitude} />
        </div>
      )}
    </div>
  );
};

export default PlayerNextMatchesPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../../components/MapComponent';
import { format, startOfDay } from 'date-fns';

const PlayerResultsPage = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3107/api/events/type/Match');
        const pastMatches = response.data.filter(match => new Date(match.date) < startOfDay(new Date()));
        setResults(pastMatches);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleSelectResult = (resultId) => {
    setSelectedResult(results.find(result => result._id === resultId));
  };

  return (
    <div className="results-container">
      <h1>Match Results</h1>
      <div className="results-list">
        {results.map((result) => (
          <div key={result._id} className="result" onClick={() => handleSelectResult(result._id)}>
            <strong>{result.name}</strong> : {result.score || 'TBD'} - {format(new Date(result.date), 'yyyy-MM-dd')}
          </div>
        ))}
      </div>
      {selectedResult && (
        <div className="selected-result-details">
          <h2>Details for {selectedResult.name}</h2>
          <p>Teams: {selectedResult.teams}</p>
          <p>Score: {selectedResult.score}</p>
          <p>Date: {format(new Date(selectedResult.date), 'yyyy-MM-dd')}</p>
          <p>Location: {selectedResult.location}</p>
          <p>Stadium: {selectedResult.stadium}</p>
          <MapComponent latitude={selectedResult.latitude} longitude={selectedResult.longitude} />
        </div>
      )}
    </div>
  );
};

export default PlayerResultsPage;

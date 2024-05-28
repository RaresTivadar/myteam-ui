import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../../components/MapComponent';
import { format } from 'date-fns';

const CoachResultsPage = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [score, setScore] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:3107/api/events/type/Match');
        const pastMatches = response.data.filter(match => new Date(match.date) <= new Date()).sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(pastMatches);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleSelectResult = (result) => {
    setSelectedResult(result);
    setScore(result.score || '');
  };

  const handleSaveScore = async () => {
    try {
      await axios.patch(`http://localhost:3107/api/events/${selectedResult._id}`, { score });
      setResults(results.map(result => result._id === selectedResult._id ? { ...result, score } : result));
      setSelectedResult(null);
      setScore('');
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div className="results-container">
      <h1>Match Results</h1>
      <div className="results-list">
        {results.map((result) => (
          <div key={result._id} className="result" onClick={() => handleSelectResult(result)}>
            <strong>{result.name}</strong> :   {result.score || 'TBD'} - {format(new Date(result.date), 'yyyy-MM-dd')}
          </div>
        ))}
      </div>
      {selectedResult && (
        <div className="selected-result-details">
          <h2>Details for {selectedResult.name}</h2>
          <p>Score: {selectedResult.score}</p>
          <p>Date: {format(new Date(selectedResult.date), 'yyyy-MM-dd')}</p>
          <p>Location: {selectedResult.location}</p>
          <p>Stadium: {selectedResult.stadium}</p>
          <MapComponent latitude={selectedResult.latitude} longitude={selectedResult.longitude} />
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <button onClick={handleSaveScore}>Save Score</button>
        </div>
      )}
    </div>
  );
};

export default CoachResultsPage;

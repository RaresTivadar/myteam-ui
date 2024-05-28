import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../../components/MapComponent';
import { format, isBefore, startOfDay } from 'date-fns';

const CoachResultsPage = ({ teamId }) => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [score, setScore] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formMatch, setFormMatch] = useState({
    name: '',
    date: '',
    location: '',
    latitude: '',
    longitude: '',
    stadium: '',
    score: '',
    team: teamId,
    eventType: 'Match',
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:3107/api/events/team/${teamId}`);
        const pastMatches = response.data
          .filter(match => match.eventType === 'Match' && isBefore(new Date(match.date), startOfDay(new Date())))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setResults(pastMatches);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    if (teamId) {
      fetchResults();
    }
  }, [teamId]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormMatch({ ...formMatch, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formMatch.name.trim()) {
      alert('Event name is required');
      return;
    }

    const matchDate = new Date(formMatch.date);
    if (!isBefore(matchDate, startOfDay(new Date()))) {
      alert("Match date must be in the past.");
      return;
    }

    try {
      const newMatch = await axios.post('http://localhost:3107/api/events', formMatch);
      setResults(prevResults => [newMatch.data, ...prevResults].sort((a, b) => new Date(b.date) - new Date(a.date)));
      setFormMatch({
        name: '',
        date: '',
        location: '',
        latitude: '',
        longitude: '',
        stadium: '',
        score: '',
        team: teamId,
        eventType: 'Match',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  const handleAddMatch = () => {
    setSelectedResult(null);
    setShowForm(true);
  };

  return (
    <div className="results-container">
      <h1>Match Results</h1>
      <button onClick={handleAddMatch} className="add-match-btn">Add Past Match</button>
      <div className="results-list">
        {results.map((result) => (
          <div key={result._id} className="result" onClick={() => handleSelectResult(result)}>
            <strong>{result.name}</strong> : {result.score || 'TBD'} - {format(new Date(result.date), 'yyyy-MM-dd')}
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
      {showForm && (
        <div className="match-form">
          <input
            type="text"
            name="name"
            value={formMatch.name}
            onChange={handleInputChange}
            placeholder="Event Name"
          />
          <input
            type="text"
            name="location"
            value={formMatch.location}
            onChange={handleInputChange}
            placeholder="Location"
          />
          <input
            type="date"
            name="date"
            value={formMatch.date}
            onChange={handleInputChange}
            placeholder="Date"
          />
          <input
            type="text"
            name="stadium"
            value={formMatch.stadium}
            onChange={handleInputChange}
            placeholder="Stadium"
          />
          <input
            type="text"
            name="latitude"
            value={formMatch.latitude}
            onChange={handleInputChange}
            placeholder="Latitude"
          />
          <input
            type="text"
            name="longitude"
            value={formMatch.longitude}
            onChange={handleInputChange}
            placeholder="Longitude"
          />
          <input
            type="text"
            name="score"
            value={formMatch.score}
            onChange={handleInputChange}
            placeholder="Score"
          />
          <button onClick={handleSubmit} className="submit-match-btn">Add Match</button>
        </div>
      )}
    </div>
  );
};

export default CoachResultsPage;

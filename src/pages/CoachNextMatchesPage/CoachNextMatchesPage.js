import React, { useState } from 'react';
import MapComponent from '../../components/MapComponent'; 
import './CoachNextMatchesPage.css'; 

const CoachNextMatchesPage = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      date: '2024-04-15',
      teams: 'Team A vs Team B',
      location: 'Timisoara, Romania',
      latitude: 45.74342346191406,
      longitude: 21.248149871826172,
      h2h: 'Head-to-Head info here',
      stadium: 'Baza 2 Timisoara',
      score: '',
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
      score: '',
    },
  ]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMatch, setFormMatch] = useState({
    date: '',
    teams: '',
    location: '',
    latitude: '',
    longitude: '',
    h2h: '',
    stadium: '',
    score: '',
  });

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    setShowForm(false);
  };

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setFormMatch({ ...formMatch, [key]: value });
  };

  const handleSubmit = () => {
    if (selectedMatch) {
      setMatches(
        matches.map((match) =>
          match.id === selectedMatch.id ? { ...selectedMatch, ...formMatch } : match
        )
      );
    } else {
      setMatches([...matches, { ...formMatch, id: Date.now() }]);
    }
    setShowForm(false);
    setSelectedMatch(null);
    setFormMatch({
      date: '',
      teams: '',
      location: '',
      latitude: '',
      longitude: '',
      h2h: '',
      stadium: '',
      score: '',
    });
  };

  const handleDeleteMatch = (matchId) => {
    setMatches(matches.filter((match) => match.id !== matchId));
  };

  const handleAddMatch = () => {
    setSelectedMatch(null);
    setShowForm(true);
    setFormMatch({
      date: '',
      teams: '',
      location: '',
      latitude: '',
      longitude: '',
      h2h: '',
      stadium: '',
      score: '',
    });
  };

  const handleEditMatch = (match) => {
    setSelectedMatch(match);
    setShowForm(true);
    setFormMatch(match);
  };

  return (
    <div className="matches-container">
      <h1>Upcoming Matches</h1>
      <button onClick={handleAddMatch} className="add-match-btn">
        Add New Match
      </button>
      {matches.map((match) => (
        <div key={match.id} className="match">
          <div onClick={() => handleSelectMatch(match)}>
            {match.date}  {match.teams}  {match.location}  Score: {match.score || 'TBD'}
          </div>
          <button onClick={() => handleEditMatch(match)} className="edit-match-btn">
            Edit
          </button>
          <button onClick={() => handleDeleteMatch(match.id)} className="delete-match-btn">
            Delete
          </button>
        </div>
      ))}
      {(showForm ) && (
        <div className="match-form">
          <input
            type="text"
            value={formMatch.teams}
            onChange={(e) => handleInputChange(e, 'teams')}
            placeholder='Teams'
          />
          <input
            type="text"
            value={formMatch.location}
            onChange={(e) => handleInputChange(e, 'location')}
            placeholder='Location'
          />
          <input
            type="date"
            value={formMatch.date}
            onChange={(e) => handleInputChange(e, 'date')}
            placeholder='Date'
          />
          <input
            type="text"
            value={formMatch.h2h}
            onChange={(e) => handleInputChange(e, 'h2h')}
            placeholder='h2h'
          />
          <input
            type="text"
            value={formMatch.stadium}
            onChange={(e) => handleInputChange(e, 'stadium')}
            placeholder='Stadium'
          />
          {/* <input
            type="text"
            value={formMatch.latitude}
            onChange={(e) => handleInputChange(e, 'latitute')}
            placeholder='Latitude'
          />
          <input
            type="text"
            value={formMatch.longitude}
            onChange={(e) => handleInputChange(e, 'longitute')}
            placeholder='Longitude'
          /> */}
          <button onClick={handleSubmit} className="submit-match-btn">
            {selectedMatch ? 'Save Changes' : 'Add Match'}
          </button>
        </div>
      )}
      {selectedMatch && (
      <div className="selected-match-details">
        <h2>Details for {selectedMatch.teams}</h2>
        <p>Head-to-Head: {selectedMatch.h2h}</p>
        <p>Stadium: {selectedMatch.stadium}</p>
        <MapComponent
          latitude={selectedMatch.latitude}
          longitude={selectedMatch.longitude}
        />
      </div>
    
      )}
    </div>
  );
};

export default CoachNextMatchesPage;

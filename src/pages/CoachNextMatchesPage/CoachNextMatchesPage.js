import React, { useState, useEffect } from 'react';
import eventService from '../../services/eventService';
import MapComponent from '../../components/MapComponent';
import { format, startOfDay, isBefore } from 'date-fns';
import './CoachNextMatchesPage.css';

const CoachNextMatchesPage = ({ teamId }) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMatch, setFormMatch] = useState({
    name: '',
    date: '',
    location: '',
    latitude: '',
    longitude: '',
    stadium: '',
    score: '',
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await eventService.getEventsByTeam(teamId);
        const filteredMatches = data.filter(event => event.eventType === 'Match' && new Date(event.date) >= startOfDay(new Date()));
        const sortedMatches = filteredMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
        setMatches(sortedMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    if (teamId) {
      fetchMatches();
    }
  }, [teamId]);

  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
    setShowForm(false);
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

    const startDate = new Date(formMatch.date);
    if (isBefore(startDate, startOfDay(new Date()))) {
      alert("Cannot add events in the past.");
      return;
    }

    const newMatch = { ...formMatch, eventType: 'Match', team: teamId };

    try {
      const createdMatch = await eventService.createEvent(newMatch);
      const filteredMatches = matches.filter(match => new Date(match.date) >= startOfDay(new Date()));
      const sortedMatches = [...filteredMatches, createdMatch].sort((a, b) => new Date(a.date) - new Date(b.date));
      setMatches(sortedMatches);
      setFormMatch({
        name: '',
        date: '',
        location: '',
        latitude: '',
        longitude: '',
        stadium: '',
        score: '',
      });
    } catch (error) {
      console.error('Error adding match:', error);
    }
    setShowForm(false);
  };

  const handleDeleteMatch = async (matchId) => {
    try {
      await eventService.deleteEvent(matchId);
      setMatches(matches.filter((match) => match._id !== matchId));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  const handleAddMatch = () => {
    setSelectedMatch(null);
    setShowForm(true);
  };

  return (
    <div className="matches-container">
      <h1>Upcoming Matches</h1>
      <button onClick={handleAddMatch} className="add-match-btn">
        Add New Match
      </button>
      {matches.map((match) => (
        <div key={match._id} className="match">
          <div onClick={() => handleSelectMatch(match)}>
            <strong>{match.name}</strong>: {match.score || 'TBD'} - {format(new Date(match.date), 'yyyy-MM-dd')} - {match.location}
          </div>
          <button onClick={() => handleDeleteMatch(match._id)} className="delete-match-btn">
            Delete
          </button>
          {selectedMatch && selectedMatch._id === match._id && (
            <div className="selected-match-details">
              <h2>Details for {match.name}</h2>
              <p>Stadium: {match.stadium}</p>
              <MapComponent latitude={match.latitude} longitude={match.longitude} />
            </div>
          )}
        </div>
      ))}
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
          <button onClick={handleSubmit} className="submit-match-btn">
            Add Match
          </button>
        </div>
      )}
    </div>
  );
};

export default CoachNextMatchesPage;

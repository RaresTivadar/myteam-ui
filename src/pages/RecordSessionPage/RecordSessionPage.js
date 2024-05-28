import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './RecordSessionPage.css'; 

const RecordSessionPage = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ type: '', duration: '', date: '' });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3107/api/sessions/user/${userId}`);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const handleInputChange = (e, field) => {
    setNewSession({ ...newSession, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // Get user ID from local storage

    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3107/api/sessions', {
        ...newSession,
        user: userId // Include user ID in the request payload
      });
      setSessions([...sessions, response.data.session]);
      setNewSession({ type: '', duration: '', date: '' });
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  return (
    <div className="session-page-container">
      <h3>Add a new session</h3>
      <form onSubmit={handleSubmit} className="session-form">
        <label>
          Session Type:
          <select value={newSession.type} onChange={(e) => handleInputChange(e, 'type')}>
            <option value="">Select a type</option>
            <option value="Running">Running</option>
            <option value="Gym">Gym</option>
            <option value="Swimming">Swimming</option>
          </select>
        </label>
        <label>
          Duration (in minutes):
          <input type="number" value={newSession.duration} onChange={(e) => handleInputChange(e, 'duration')} />
        </label>
        <label>
          Date:
          <input type="date" value={newSession.date} onChange={(e) => handleInputChange(e, 'date')} />
        </label>
        <button type="submit">Add Session</button>
      </form>
      <h2>Recorded Sessions</h2>
      <div className="sessions-list">
        {sessions.map((session, index) => (
          <div key={index} className="session-item">
            <p>Type: {session.type}</p>
            <p>Duration: {session.duration}</p>
            <p>Date: {format(new Date(session.date), 'yyyy-MM-dd')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordSessionPage;

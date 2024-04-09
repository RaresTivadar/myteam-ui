import React, { useState } from 'react';
import './RecordSessionPage.css'; 

const RecordSessionPage = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({ type: '', duration: '', date: '' });

  const handleInputChange = (e, field) => {
    setNewSession({ ...newSession, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSessions([...sessions, newSession]);
    setNewSession({ type: '', duration: '', date: '' });
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
            <p>Date: {session.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordSessionPage;

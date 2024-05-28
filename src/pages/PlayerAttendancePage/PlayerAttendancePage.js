import React, { useState, useEffect } from 'react';
import eventService from '../../services/eventService';
import './PlayerAttendancePage.css';

const PlayerAttendancePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const eventData = await eventService.getAllEvents();
        const userEvents = eventData.filter(event => event.attendees.some(att => att.user._id === userId));
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const calculateTotals = (eventType) => {
    const userId = localStorage.getItem('userId');
    const attendanceArray = events
      .filter(event => event.eventType === eventType)
      .flatMap(event => event.attendees)
      .filter(att => att.user._id === userId)
      .map(att => att.status);
    return `${attendanceArray.filter(a => a === 'Present').length}/${attendanceArray.length}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="player-attendance-container">
      <h1>Your Attendance</h1>
      <div className="attendance-totals">
        <p>Trainings: {calculateTotals('Training')}</p>
        <p>Matches: {calculateTotals('Match')}</p>
      </div>
      <div className="attendance-info">
        <h2>Trainings</h2>
        {events
          .filter(event => event.eventType === 'Training')
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(event => (
            <div key={event._id} className="attendance-detail">
              <h3>{event.name} - {new Date(event.date).toLocaleDateString()}</h3>
              <p>Status: {event.attendees.find(att => att.user._id === localStorage.getItem('userId'))?.status || 'Not Recorded'}</p>
            </div>
          ))}
        <h2>Matches</h2>
        {events
          .filter(event => event.eventType === 'Match')
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(event => (
            <div key={event._id} className="attendance-detail">
              <h3>{event.name} - {new Date(event.date).toLocaleDateString()}</h3>
              <p>Status: {event.attendees.find(att => att.user._id === localStorage.getItem('userId'))?.status || 'Not Recorded'}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerAttendancePage;

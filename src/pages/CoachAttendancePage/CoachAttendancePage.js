import React, { useState, useEffect } from 'react';
import eventService from '../../services/eventService';
import './CoachAttendancePage.css';

const CoachAttendancePage = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchEventsAndUsers = async () => {
      try {
        const [eventData, userData] = await Promise.all([
          eventService.getAllEvents(),
          eventService.getAllUsers(),
        ]);
        setEvents(eventData);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventsAndUsers();
  }, []);

  const handleAttendanceChange = (eventId, userId, status) => {
    const updatedEvents = events.map(event => {
      if (event._id === eventId) {
        const attendeeIndex = event.attendees.findIndex(att => att.user._id === userId);
        if (attendeeIndex > -1) {
          event.attendees[attendeeIndex].status = status;
        } else {
          event.attendees.push({ user: { _id: userId }, status });
        }
      }
      return event;
    });
    setEvents([...updatedEvents]);
  };

  const handleClearAttendance = (eventId, userId) => {
    const updatedEvents = events.map(event => {
      if (event._id === eventId) {
        event.attendees = event.attendees.filter(att => att.user._id !== userId);
      }
      return event;
    });
    setEvents([...updatedEvents]);
  };

  const saveAttendance = async () => {
    try {
      await Promise.all(events.map(event => eventService.updateAttendance(event._id, event.attendees)));
      alert('Attendance saved successfully');
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  const calculateTotals = (userId, eventType) => {
    const attendanceArray = events
      .filter(event => event.eventType === eventType)
      .flatMap(event => event.attendees)
      .filter(att => att.user._id === userId)
      .map(att => att.status);
    return `${attendanceArray.filter(a => a === 'Present').length}/${attendanceArray.length}`;
  };

  return (
    <div className="attendance-container">
      <h1>Team Attendance</h1>
      <div className="players-list">
        {users.map(user => (
          <div
            key={user._id}
            className="player-item"
            onClick={() => setSelectedUser(user)}
          >
            <div className="player-name">{user.name}</div>
            <div className="player-totals">
              Trainings: {calculateTotals(user._id, 'Training')} | Matches: {calculateTotals(user._id, 'Match')}
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="selected-player-details">
          <h2>Attendance for {selectedUser.name}</h2>
          {events
            .filter(event => ['Match', 'Training'].includes(event.eventType))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(event => (
              <div key={event._id} className="event-item">
                <div className="event-details">
                  <strong>{event.name}</strong> - {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="attendance-buttons">
                  <button
                    className={event.attendees.find(att => att.user._id === selectedUser._id)?.status === 'Present' ? 'selected' : ''}
                    onClick={() => handleAttendanceChange(event._id, selectedUser._id, 'Present')}
                  >
                    Present
                  </button>
                  <button
                    className={event.attendees.find(att => att.user._id === selectedUser._id)?.status === 'Absent' ? 'selected' : ''}
                    onClick={() => handleAttendanceChange(event._id, selectedUser._id, 'Absent')}
                  >
                    Absent
                  </button>
                  <button
                    className="clear-button"
                    onClick={() => handleClearAttendance(event._id, selectedUser._id)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      <button onClick={saveAttendance} className="save-attendance-btn">Save Attendance</button>
    </div>
  );
};

export default CoachAttendancePage;

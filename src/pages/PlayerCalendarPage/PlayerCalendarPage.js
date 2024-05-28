import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay
} from 'date-fns';
import './PlayerCalendarPage.css';

const PlayerCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3107/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const findEventsForDay = (day) => {
    return events.filter(event => isSameDay(new Date(event.date), day));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const dateFormat = 'd';
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className="days-of-week">
        {daysOfWeek.map(dayName => (
          <div key={dayName} className="day-name">{dayName}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, i) => (
          <div
            key={i}
            className={`calendar-day ${isSameMonth(day, monthStart) ? '' : 'disabled'}`}
          >
            <span className="number">{format(day, dateFormat)}</span>
            <div className="events">
              {findEventsForDay(day).map(event => (
                <div key={event._id} className="event" onClick={() => handleEventClick(event)}>
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="event-details">
          <h2>{selectedEvent.name}</h2>
          <p>Type: {selectedEvent.eventType}</p>
          <p>Date: {format(new Date(selectedEvent.date), 'yyyy-MM-dd')}</p>
          <p>Location: {selectedEvent.location}</p>
          {selectedEvent.eventType === 'Other' && <p>Description: {selectedEvent.description}</p>}
        </div>
      )}
    </div>
  );
};

export default PlayerCalendarPage;

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
  isSameDay,
  isBefore,
  startOfDay,
  addWeeks
} from 'date-fns';
import './CoachCalendarPage.css';

const CoachCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceWeeks, setRecurrenceWeeks] = useState(1);
  const [eventType, setEventType] = useState('Training');
  const [eventLocation, setEventLocation] = useState('');
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

  const handleAddEvent = async () => {
    if (!eventName.trim()) {
      alert('Event name is required');
      return;
    }

    const startDate = new Date(eventDate);
    if (isBefore(startDate, startOfDay(new Date()))) {
      alert("Cannot add events in the past.");
      return;
    }

    const eventsToAdd = [];

    if (isRecurring) {
      for (let i = 0; i < recurrenceWeeks; i++) {
        const futureEventDate = addWeeks(startDate, i);
        if (!isBefore(futureEventDate, startOfDay(new Date())) || isSameDay(futureEventDate, new Date())) {
          eventsToAdd.push({
            name: eventName,
            description: eventDescription,
            date: format(futureEventDate, 'yyyy-MM-dd'),
            eventType: eventType,
            location: eventLocation,
            recurring: isRecurring
          });
        }
      }
    } else {
      eventsToAdd.push({
        name: eventName,
        description: eventDescription,
        date: eventDate,
        eventType: eventType,
        location: eventLocation,
        recurring: isRecurring
      });
    }

    try {
      await Promise.all(eventsToAdd.map(event => axios.post('http://localhost:3107/api/events', event)));
      const response = await axios.get('http://localhost:3107/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error adding event:', error);
    }

    setEventName('');
    setEventDescription('');
    setEventDate(format(new Date(), 'yyyy-MM-dd'));
    setIsRecurring(false);
    setRecurrenceWeeks(1);
    setEventType('Training');
    setEventLocation('');
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3107/api/events/${eventId}`);
      const response = await axios.get('http://localhost:3107/api/events');
      setEvents(response.data);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
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
          <button onClick={() => handleDeleteEvent(selectedEvent._id)}>Delete Event</button>
        </div>
      )}

      <div className="event-form">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={e => setEventName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={eventDescription}
          onChange={e => setEventDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={eventLocation}
          onChange={e => setEventLocation(e.target.value)}
        />
        <input
          type="date"
          value={eventDate}
          onChange={e => setEventDate(e.target.value)}
        />
        <select value={eventType} onChange={e => setEventType(e.target.value)}>
          <option value="Training">Training</option>
          <option value="Match">Match</option>
          <option value="Other">Other</option>
        </select>
        {isRecurring && (
          <div>
            <label htmlFor="recurrenceWeeks">Number of Weeks:</label>
            <input
              id="recurrenceWeeks"
              type="number"
              min="1"
              value={recurrenceWeeks}
              onChange={(e) => setRecurrenceWeeks(Number(e.target.value))}
            />
          </div>
        )}
        <label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          Recurring event
        </label>

        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default CoachCalendarPage;

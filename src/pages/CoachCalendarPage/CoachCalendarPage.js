import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isBefore, startOfDay, addWeeks } from 'date-fns';
import './CoachCalendarPage.css';

const CoachCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceWeeks, setRecurrenceWeeks] = useState(1);


  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleAddEvent = () => {
    const startDate = new Date(eventDate);
    if (isBefore(startDate, startOfDay(new Date()))) {
      alert("Cannot add events in the past.");
      return;
    }
      if (isRecurring) {
      for (let i = 0; i < recurrenceWeeks; i++) {
        const futureEventDate = addWeeks(startDate, i);
        if (!isBefore(futureEventDate, startOfDay(new Date())) || isSameDay(futureEventDate, new Date())) {
          const newEvent = {
            id: Date.now() + i,
            name: eventName,
            description: eventDescription,
            date: format(futureEventDate, 'yyyy-MM-dd'),
            recurring: isRecurring
          };
          setEvents(events => [...events, newEvent]);
        }
      }
    } else {
      const newEvent = {
        id: Date.now(),
        name: eventName,
        description: eventDescription,
        date: eventDate,
        recurring: isRecurring
      };
      setEvents(events => [...events, newEvent]);
    }
      resetForm();
  };
  
  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setEventDate(format(new Date(), 'yyyy-MM-dd')); 
    setIsRecurring(false);
    setRecurrenceWeeks(1);
  };
  
  

  const findEventsForDay = (day) => {
    return events.filter(event => {
      const eventDateObj = new Date(event.date);
      return isSameDay(eventDateObj, day) || (event.recurring && eventDateObj.getDay() === day.getDay());
    });
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
          <div key={i} className={`calendar-day ${isSameMonth(day, monthStart) ? '' : 'disabled'}`}>
            <span className="number">{format(day, dateFormat)}</span>
            <div className="events">
              {findEventsForDay(day).map(event => (
                <div key={event.id} className="event">
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

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
          type="date"
          value={eventDate}
          onChange={e => setEventDate(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
          Recurring event
        </label>
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

        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default CoachCalendarPage;
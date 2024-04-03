import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay} from 'date-fns';
import './PlayerCalendarPage.css';

const PlayerCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState([]);


  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
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
    </div>
  );
};

export default PlayerCalendarPage;
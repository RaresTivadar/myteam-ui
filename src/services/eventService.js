import axios from 'axios';

const API_URL = 'http://localhost:3107/api/events';
const USER_API_URL = 'http://localhost:3107/api/users';

const getAllEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getEventsByType = async (type) => {
  const response = await axios.get(`${API_URL}/type/${type}`);
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

const updateEvent = async (id, eventData) => {
  const response = await axios.patch(`${API_URL}/${id}`, eventData);
  return response.data;
};

const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const updateAttendance = async (eventId, attendanceData) => {
  const response = await axios.patch(`${API_URL}/${eventId}`, { attendees: attendanceData });
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(USER_API_URL);
  return response.data;
};

const getAllUsersAttendance = async () => {
    const response = await axios.get(USER_API_URL);
    return response.data;
  };

const getUserById = async (userId) => {
    const response = await axios.get(`${USER_API_URL}/${userId}`);
    return response.data;
  };
  
const eventService = {
  getAllEvents,
  getEventsByType,
  createEvent,
  updateEvent,
  deleteEvent,
  updateAttendance,
  getAllUsers,
  getAllUsersAttendance,
  getUserById
};

export default eventService;

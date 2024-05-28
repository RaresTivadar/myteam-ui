import axios from 'axios';

const API_URL = 'http://localhost:3107/api/attendance';

const getAllAttendances = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAttendanceForUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

const createOrUpdateAttendance = async (attendanceData) => {
  const response = await axios.post(API_URL, attendanceData);
  return response.data;
};

const deleteAttendance = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const attendanceService = {
  getAllAttendances,
  getAttendanceForUser,
  createOrUpdateAttendance,
  deleteAttendance,
};

export default attendanceService;

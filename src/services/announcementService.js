import axios from 'axios';

const API_URL = 'http://localhost:3107/api/announcements';

const createAnnouncement = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const getAllAnnouncements = async (teamId) => {
  console.log('Fetching announcements for team:', teamId);
  const response = await axios.get(`${API_URL}/team/${teamId}`);
  console.log('Response data:', response.data);
  return response.data;
};

const updateAnnouncement = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

const deleteAnnouncement = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};

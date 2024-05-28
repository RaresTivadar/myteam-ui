import axios from 'axios';

const API_URL = 'http://localhost:3107/api/sessions';

const createSession = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const getSessionsByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

const updateSession = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

const deleteSession = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  createSession,
  getSessionsByUser,
  updateSession,
  deleteSession,
};
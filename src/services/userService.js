import axios from 'axios';

const API_URL = 'http://localhost:3107/api/users';

const signupUser = async (data) => {
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};

const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

const updateUser = async (userId, data) => {
  const response = await axios.put(`${API_URL}/${userId}`, data);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getUserDetails = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

const assignTeamToUser = async (userId, teamId) => {
  const response = await axios.patch(`${API_URL}/assign-team/${userId}/${teamId}`);
  return response.data;
};

const removeTeamFromUser = async (userId, teamId) => {
  const response = await axios.patch(`${API_URL}/remove-team/${userId}/${teamId}`);
  return response.data;
};

const getUserTeams = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}/teams`);
  return response.data;
};

const getUserById = async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  };

const getUsersByTeam = async (teamId) => {
    const response = await axios.get(`${API_URL}/team/${teamId}`);
    return response.data;
  };

export default {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserDetails,
  assignTeamToUser,
  removeTeamFromUser,
  getUserTeams,
  getUserById,
  getUsersByTeam,
};

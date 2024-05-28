import axios from 'axios';

const API_URL = 'http://localhost:3107/api/teams';

const createTeam = async (teamData) => {
  const response = await axios.post(`${API_URL}/createteams`, teamData);
  return response.data;
};

const getTeamsByUser = async (userId) => {
  const response = await axios.get(`http://localhost:3107/api/users/${userId}/teams`);
  return response.data;
};

const getAllTeams = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getTeamUsers = async (teamId) => {
  const response = await axios.get(`${API_URL}/${teamId}/users`);
  return response.data;
};

export default {
  createTeam,
  getTeamsByUser,
  getAllTeams,
  getTeamUsers,
};

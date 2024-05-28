import axios from 'axios';

const API_URL = 'http://localhost:3107/api/rankings';

const getRankingsByCoach = async (coachId) => {
  const response = await axios.get(`${API_URL}/coach/${coachId}`);
  return response.data;
};

const getAllRankings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createRanking = async (rankingData) => {
  const response = await axios.post(API_URL, rankingData);
  return response.data;
};

const updateRanking = async (id, rankingData) => {
  const response = await axios.patch(`${API_URL}/${id}`, rankingData);
  return response.data;
};

const deleteRanking = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const rankingService = {
  getRankingsByCoach,
  getAllRankings,
  createRanking,
  updateRanking,
  deleteRanking,
};

export default rankingService;

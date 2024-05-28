import axios from 'axios';

const API_URL = 'http://localhost:3107/api/statistics';

const createStatistics = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

const getStatisticsByUser = async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
};

const getTeamStatistics = async (teamId) => {
    const response = await axios.get(`${API_URL}/team/${teamId}`);
    return response.data;
};

const updateStatistics = async (id, data) => {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data;
};

const deleteStatistics = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export default {
    createStatistics,
    getStatisticsByUser,
    getTeamStatistics,
    updateStatistics,
    deleteStatistics,
};

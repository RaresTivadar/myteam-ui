import React, { useState, useEffect } from 'react';
import './PlayerStatisticsPage.css';
import statisticsService from '../../services/statisticsService';

const PlayerStatisticsPage = () => {
    const [playerStats, setPlayerStats] = useState(null);

    useEffect(() => {
        fetchPlayerStats();
    }, []);

    const fetchPlayerStats = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const data = await statisticsService.getStatisticsByUser(userId);
            setPlayerStats(data);
        } catch (error) {
            console.error('Error fetching player statistics:', error);
        }
    };

    if (!playerStats) return <div>Loading...</div>;

    return (
        <div className="player-stats-container">
            <h1>Your Stats</h1>
            <div className="stats-info">
                <p><strong>Matches Played:</strong> {playerStats.matchesPlayed}</p>
                <p><strong>Goals:</strong> {playerStats.goals}</p>
                <p><strong>Assists:</strong> {playerStats.assists}</p>
            </div>
        </div>
    );
};

export default PlayerStatisticsPage;

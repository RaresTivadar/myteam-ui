import React from 'react';
import './PlayerStatisticsPage.css';

const PlayerStatisticsPage = () => {
    const playerStats = {
        name: "Your Stats",
        matchesPlayed: 14,
        goals: 6,
        assists: 4,
    };

    return (
        <div className="player-stats-container">
            <h1>{playerStats.name}</h1>
            <div className="stats-info">
                <p><strong>Matches Played:</strong> {playerStats.matchesPlayed}</p>
                <p><strong>Goals:</strong> {playerStats.goals}</p>
                <p><strong>Assists:</strong> {playerStats.assists}</p>
            </div>
        </div>
    );
};

export default PlayerStatisticsPage;

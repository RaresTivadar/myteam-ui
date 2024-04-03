import React from 'react';
import './CoachStatisticsPage.css';

const CoachStatisticsPage = () => {
    const playerStats = [
        { name: "Player 1", matchesPlayed: 10, goals: 5, assists: 7 },
        { name: "Player 2", matchesPlayed: 12, goals: 8, assists: 5 },
    ];

    return (
        <div className="stats-container">
            <h1>Team Player Statistics</h1>
            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Matches Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats.map((player, index) => (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.matchesPlayed}</td>
                            <td>{player.goals}</td>
                            <td>{player.assists}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoachStatisticsPage;

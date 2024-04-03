import React from 'react';
import './RankingsPage.css';

const RankingsPage = () => {
    const standings = [
        { team: "Team A", matchesPlayed: 8, goalsScored: 15, goalsReceived: 5, points: 24 },
        { team: "Team B", matchesPlayed: 8, goalsScored: 12, goalsReceived: 8, points: 18 },
    ];

    const pastMatches = [
        { match: "Team A vs Team B", result: "3-1" },
        { match: "Team C vs Team D", result: "2-2" },
    ];

    return (
        <div className="rankings-container">
            <h1>Competition Standings</h1>
            <table className="standings-table">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>MP</th>
                        <th>GS</th>
                        <th>GR</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {standings.map((team, index) => (
                        <tr key={index}>
                            <td>{team.team}</td>
                            <td>{team.matchesPlayed}</td>
                            <td>{team.goalsScored}</td>
                            <td>{team.goalsReceived}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Past Matches</h2>
            <ul className="past-matches-list">
                {pastMatches.map((match, index) => (
                    <li key={index}>{match.match}: {match.result}</li>
                ))}
            </ul>
        </div>
    );
};

export default RankingsPage;

import React from 'react';
import './PlayerAttendancePage.css';

const PlayerAttendance = () => {
    // Assuming the attendance data for the logged-in player
    const playerAttendance = {
        name: "Your Attendance",
        trainingAttendance: ["Yes", "No", "Yes", "Yes"],
        matchAttendance: ["Yes", "Yes", "No"],
    };

    // Calculate totals
    const trainingTotal = `${playerAttendance.trainingAttendance.filter(a => a === "Yes").length}/${playerAttendance.trainingAttendance.length}`;
    const matchTotal = `${playerAttendance.matchAttendance.filter(a => a === "Yes").length}/${playerAttendance.matchAttendance.length}`;

    return (
        <div className="player-attendance-container">
            <h1>{playerAttendance.name}</h1>
            <div className="attendance-info">
                <div>
                    <h2>Training Attendance</h2>
                    <p>{playerAttendance.trainingAttendance.join(", ")}</p>
                    <p>Total: {trainingTotal}</p>
                </div>
                <div>
                    <h2>Match Attendance</h2>
                    <p>{playerAttendance.matchAttendance.join(", ")}</p>
                    <p>Total: {matchTotal}</p>
                </div>
            </div>
        </div>
    );
};

export default PlayerAttendance;

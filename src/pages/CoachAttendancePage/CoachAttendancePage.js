import React from 'react';
import './CoachAttendancePage.css';

const AttendancePage = () => {
    const players = [
        { name: "Player 1", trainingAttendance: ["Yes", "No", "Yes"], matchAttendance: ["Yes", "Yes"] },
        { name: "Player 2", trainingAttendance: ["Yes", "Yes", "Yes"], matchAttendance: ["No", "Yes"] },
    ];

    const calculateTotals = (attendanceArray) => `${attendanceArray.filter(a => a === "Yes").length}/${attendanceArray.length}`;

    return (
        <div className="attendance-container">
            <h1>Team Attendance</h1>
            <div className="attendance-table">
                <div className="table-header">
                    <div className="header-item">Player</div>
                    <div className="header-item">Trainings</div>
                    <div className="header-item">Matches</div>
                    <div className="header-item">Total</div>
                </div>
                {players.map((player, index) => (
                    <div className="table-row" key={index}>
                        <div className="row-item">{player.name}</div>
                        <div className="row-item">{player.trainingAttendance.join(", ")}</div>
                        <div className="row-item">{player.matchAttendance.join(", ")}</div>
                        <div className="row-item">
                            {calculateTotals(player.trainingAttendance)} | {calculateTotals(player.matchAttendance)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttendancePage;

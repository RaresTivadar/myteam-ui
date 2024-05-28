import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import teamService from '../../services/teamService'; // Update the import to use teamService
import './CoachDashboard.css';
import MyProfilePage from '../MyProfilePage/MyProfilePage';

const CoachDashboard = () => {
  const [teams, setTeams] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [teamName, setTeamName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const navigate = useNavigate();

  // Define fetchTeams function
  const fetchTeams = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const data = await teamService.getTeamsByUser(userId);
      setTeams(data.team);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams(); // Call fetchTeams when the component mounts
  }, []);

  const handleTeamClick = (teamId) => {
    navigate(`/coach/team/${teamId}`);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await teamService.createTeam({
        name: teamName,
        accessCode,
        coaches: [userId],
      });
      setTeamName('');
      setAccessCode('');
      setIsCreatingTeam(false);
      fetchTeams(); // Refresh team list after creation
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <MyProfilePage />;
      case 'teams':
        return (
          <div className="teams-content">
            <h2 className="section-title">My Teams</h2>
            <ul className="teams-list">
              {teams.map((team) => (
                <li key={team._id} onClick={() => handleTeamClick(team._id)}>
                  {team.name}
                </li>
              ))}
            </ul>
            <button className="create-team-btn" onClick={() => setIsCreatingTeam(true)}>Create New Team</button>
            {isCreatingTeam && (
              <form onSubmit={handleCreateTeam} className="create-team-form">
                <input
                  type="text"
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Access Code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                />
                <button type="submit">Create Team</button>
                <button type="button" onClick={() => setIsCreatingTeam(false)}>Cancel</button>
              </form>
            )}
          </div>
        );
      default:
        return <div>Select a tab...</div>;
    }
  };

  return (
    <div className="coach-dashboard-container">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>My Profile</button>
        <button onClick={() => setActiveTab('teams')} className={activeTab === 'teams' ? 'active' : ''}>Teams</button>
      </nav>
      {renderActiveTabContent()}
    </div>
  );
};

export default CoachDashboard;

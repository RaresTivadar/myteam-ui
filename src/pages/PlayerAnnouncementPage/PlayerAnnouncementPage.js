import React, { useState, useEffect } from 'react';
import './PlayerAnnouncementPage.css';
import announcementService from '../../services/announcementService';

const PlayerAnnouncementPage = ({ teamId }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    console.log('Team ID from props:', teamId); 
    if (teamId) {
      fetchAnnouncements(teamId);
    }
  }, [teamId]);

  const fetchAnnouncements = async (teamId) => {
    try {
      const data = await announcementService.getAllAnnouncements(teamId);
      console.log('Fetched announcements:', data); 
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  return (
    <div className="announcements-container">
      <h1>Announcements</h1>
      {announcements.map((announcement) => (
        <div key={announcement._id} className="announcement">
          <h3>{announcement.title}</h3>
          <p>{announcement.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerAnnouncementPage;

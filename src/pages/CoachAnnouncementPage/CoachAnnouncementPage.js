import React, { useState, useEffect } from 'react';
import './CoachAnnouncementPage.css';
import announcementService from '../../services/announcementService';
import { useParams } from 'react-router-dom';

const CoachAnnouncementPage = () => {
  const { teamId } = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, [teamId]);

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementService.getAllAnnouncements(teamId);
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setNewTitle('');
    setNewContent('');
  };

  const addOrUpdateAnnouncement = async () => {
    if (editingId) {
      try {
        await announcementService.updateAnnouncement(editingId, { title: editTitle, description: editContent });
        fetchAnnouncements();
      } catch (error) {
        console.error('Error updating announcement:', error);
      }
      setEditingId(null);
    } else {
      try {
        await announcementService.createAnnouncement({ title: newTitle, description: newContent, teamId });
        fetchAnnouncements();
      } catch (error) {
        console.error('Error creating announcement:', error);
      }
    }
    toggleForm(); 
  };

  const startEdit = (announcement) => {
    setEditingId(announcement._id);
    setEditTitle(announcement.title);
    setEditContent(announcement.description);
    setShowForm(true);
  };

  const deleteAnnouncement = async (id) => {
    try {
      await announcementService.deleteAnnouncement(id);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="announcements-container">
      <h1>Announcements</h1>
      <button onClick={toggleForm} className="add-new-btn">{showForm ? "Cancel" : "Add New Announcement"}</button>
      {showForm && (
        <div className="announcement-form">
          <input
            type="text"
            placeholder="Title"
            value={editingId ? editTitle : newTitle}
            onChange={(e) => editingId ? setEditTitle(e.target.value) : setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Message"
            value={editingId ? editContent : newContent}
            onChange={(e) => editingId ? setEditContent(e.target.value) : setNewContent(e.target.value)}
          ></textarea>
          <button onClick={addOrUpdateAnnouncement}>{editingId ? "Save Changes" : "Submit Announcement"}</button>
        </div>
      )}
      {announcements.map((announcement) => (
        <div key={announcement._id} className="announcement">
          <h3>{announcement.title}</h3>
          <p>{announcement.description}</p>
          <div className="announcement-actions">
            <button className="edit-btn" onClick={() => startEdit(announcement)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteAnnouncement(announcement._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoachAnnouncementPage;

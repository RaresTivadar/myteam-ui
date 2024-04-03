import React, { useState } from 'react';
import './PlayerAnnouncementPage.css';

const PlayerAnnouncementPage = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Saturday Practice", content: "Practice at 10am on Saturday" },
    { id: 2, title: "Team Meeting", content: "Team meeting after practice" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setNewTitle('');
    setNewContent('');
  };

  const addOrUpdateAnnouncement = () => {
    if (editingId) {
      setAnnouncements(announcements.map(announcement =>
        announcement.id === editingId ? { ...announcement, title: editTitle, content: editContent } : announcement
      ));
      setEditingId(null);
    } else {
      const newAnnouncement = { id: Date.now(), title: newTitle, content: newContent };
      setAnnouncements([...announcements, newAnnouncement]);
    }
    toggleForm(); 
  };

  const startEdit = (announcement) => {
    setEditingId(announcement.id);
    setEditTitle(announcement.title);
    setEditContent(announcement.content);
    setShowForm(true);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
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
        <div key={announcement.id} className="announcement">
          <h3>{announcement.title}</h3>
          <p>{announcement.content}</p>
          <div className="announcement-actions">
            <button className="edit-btn" onClick={() => startEdit(announcement)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteAnnouncement(announcement.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerAnnouncementPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProfilePage.css';

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3107/api/users/${userId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:3107/api/users/${userId}`, profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-details">
          {!isEditing ? (
            <>
              <p>Name: {profile.name}</p>
              <p>Surname: {profile.surname}</p>
              <p>Birthdate: {formatDate(profile.birthdate)}</p>
              <p>Role: {profile.role}</p>
              <p>Email: {profile.email}</p>
              <button onClick={toggleEdit}>Edit Profile</button>
            </>
          ) : (
            <div className="profile-form">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="surname"
                value={profile.surname}
                onChange={handleInputChange}
                placeholder="Surname"
              />
              <input
                type="date"
                name="birthdate"
                value={profile.birthdate.split('T')[0]}
                onChange={handleInputChange}
                placeholder="Birthdate"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <button onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;

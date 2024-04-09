import React, { useState } from 'react';
import './MyProfilePage.css';

const MyProfilePage = () => {
  const [profile, setProfile] = useState({
    photo: '/path/to/default/photo.jpg', 
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    birthdate: '1990-01-01',
    role: 'Player'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-photo">
          <img src={profile.photo} alt="Profile" />
          {isEditing && (
            <input
              type="text"
              name="photo"
              value={profile.photo}
              onChange={handleInputChange}
              placeholder="Photo URL"
            />
          )}
        </div>
        <div className="profile-details">
          {!isEditing ? (
            <>
              <p>Name: {profile.name}</p>
              <p>Surname: {profile.surname}</p>
              <p>Birthdate: {profile.birthdate}</p>
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
                value={profile.birthdate}
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
              <button onClick={toggleEdit}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;

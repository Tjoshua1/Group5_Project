import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';
import '../css/settings.css';
import logo from '../images/default_profile_img.png';

function Profile() {
    const [username, setUsername] = useState('');

useEffect(() => {
  fetch('http://localhost:5000/username_display', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.username) {
        setUsername(data.username);
      }
    })
    .catch((err) => {
      console.error('Error fetching username:', err);
    });
}, []);

return (
  <div className="profile-container">
    <div className="nav_bar">
      <Link to="/Account">Account Settings</Link>
      <Link to="/editprofile">Edit Profile</Link>
      <Link to="/privacy">Privacy Settings</Link>
      <Link to="/home">Home</Link>
    </div>

    <img src={logo} alt="User Profile" />
    <h2><strong>{username}</strong></h2>

    <button>
      <Link to="/editprofile">Edit Profile</Link>
    </button>

    <div className="follow-info">
      <h3>Followers: </h3>
      <h3>Following: </h3>
    </div>

    <h3>Posts</h3>
    <div className="posts">
      Posts:
    </div>
  </div>
);

}

export default Profile;
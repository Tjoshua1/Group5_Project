import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/sidebar.css';
import { logoutUser } from '../api/api';

function Sidebar() {
    const [username, setUsername] = useState('');
  
  useEffect(() => {
    fetch('https://tap-in.onrender.com/username_display', {
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

    const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutUser();

    alert('Successfully logged out!');
    localStorage.removeItem('authToken'); 
    navigate('/'); 
  } catch (err) {
    console.error('Logout failed:', err);
    alert('Logout failed. Please try again later.');
  }
};


  return (
    <aside className="sidebar">
      <Link to="/" className="logo-link">
        <div className="logo"></div>
      </Link>
      <div className="username-display">
      <Link to="/Account">{username}</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/lists">Lists</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/Account">Account Settings</Link></li>
        </ul>
      </nav>
<Link to="/createPosts">
  <button className="post-btn">Post</button>
</Link>

<button className="post-btn" onClick={handleLogout} style={{ marginTop: '20px' }}>
  Logout
</button>
    </aside>
  );
}

export default Sidebar;

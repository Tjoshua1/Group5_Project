import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/" className="logo-link">
        <div className="logo"></div>
      </Link>
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
    </aside>
  );
}

export default Sidebar;

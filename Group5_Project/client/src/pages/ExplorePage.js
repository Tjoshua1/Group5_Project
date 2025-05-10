import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import PostFeed from '../components/PostFeed';
import '../css/explore.css'; 

function ExplorePage() {
    const [searchQuery] = useState('');

  return (
    <div className="explore-page">
      <aside className="sidebar">
        <Link to="/home" className="logo-link">
          <div className="logo"></div>
        </Link>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/notifications">Notifications</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/bookmarks">Bookmarks</Link></li>
            <li><Link to="/lists">Lists</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
        <form action="/posts" method="GET" className="post-form">
          <button type="submit" className="post-btn">Post</button>
        </form>
      </aside>

      <div className="explore-layout">
      <Sidebar />
      <PostFeed searchQuery={searchQuery} />
    </div>
    </div>
  );
}

export default ExplorePage;

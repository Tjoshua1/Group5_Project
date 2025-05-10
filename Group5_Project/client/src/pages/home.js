import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import PostFeed from '../components/PostFeed';
import '../css/home.css';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="home-layout">
      <Sidebar />
      <PostFeed searchQuery={searchQuery} />
      <RightSidebar onSearch={(e) => setSearchQuery(e.target.value)} />
    </div>
  );
}

export default Home;

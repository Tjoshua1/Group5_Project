import React from 'react';

function RightSidebar({ onSearch }) {
  return (
    <aside className="trending">
      <div className="search-box">
        <input type="text" placeholder="Search" onChange={onSearch} />
      </div>
      <div className="trending-box">
        <h3>Trends for you</h3>
        <p>Trending topic 1</p>
        <p>Trending topic 2</p>
        <p>Trending topic 3</p>
      </div>
      <div className="who-to-follow">
        <h3>Who to follow</h3>
        <p>Suggested user 1</p>
        <p>Suggested user 2</p>
      </div>
    </aside>
  );
}

export default RightSidebar;

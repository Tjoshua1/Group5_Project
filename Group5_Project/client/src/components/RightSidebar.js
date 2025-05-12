import React, { useEffect, useState } from 'react';
import '../css/rightSidebar.css';

function RightSidebar({ onSearch }) {
  const [oldPosts, setOldPosts] = useState([]);

  useEffect(() => {
    fetch('https://tap-in.onrender.com/api/posts/old-posts', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setOldPosts(data))
      .catch((err) => console.error('Failed to fetch old posts:', err));
  }, []);

  return (
    <aside className="trending">
      <div className="search-box">
        <input type="text" placeholder="Search" onChange={onSearch} />
      </div>

      <div className="trending-box">
        <h3>Older Posts</h3>
        {oldPosts.length === 0 ? (
          <p>No older posts yet.</p>
        ) : (
          oldPosts.map((post) => (
            <p key={post._id}>{post.subject || post.content}</p>
          ))
        )}
      </div>
    </aside>
  );
}

export default RightSidebar;
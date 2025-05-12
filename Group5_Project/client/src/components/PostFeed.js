import React, { useEffect, useState,  useRef } from 'react';
import Post from './Post.js';

function PostFeed({ searchQuery }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/post');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [searchQuery]);

    const feedRef = useRef(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [posts]);

return (
  <div className="post-feed" ref={feedRef}>
    {posts
      .filter(post => (post.subject || "").toLowerCase().includes(searchQuery.toLowerCase()))
      .map(post => (
        <Post 
          key={post._id}
          username={post.username}
          subject={post.subject}
          content={post.content}
          imagePath={post.imagePath}
        />
    ))}
  </div>
);
}

export default PostFeed;

import React, { useEffect, useState } from 'react';
import Post from './Post.js';
import '../css/explore.css';

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

  return (
    <div className="post-feed">
      {posts.filter(post => (post.subject || "").toLowerCase().includes(searchQuery.toLowerCase()))
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

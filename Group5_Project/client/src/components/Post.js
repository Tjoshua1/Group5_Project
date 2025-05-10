import React from 'react';
import '../css/posts.css';

function Post({ username, subject, content, imagePath }) {
  const imageUrl = imagePath ? `http://localhost:5000/api/post/image/${imagePath}` : null;

  return (
    <div className="post-container" style={styles.card}>
      <div style={styles.header}>
        <div style={styles.avatar}></div>
        <div>
          <div style={styles.username}>{username || "Anonymous"}</div>
          <div style={styles.subject}>{subject || ""}</div>
        </div>
      </div>
      <div style={styles.content}>
        {content || ""}
      </div>
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Post" 
          style={styles.image} 
        />
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e1e8ed',
    borderRadius: '16px',
    padding: '1rem',
    maxWidth: '600px',
    margin: '1rem auto',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.75rem'
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    marginRight: '0.75rem'
  },
  username: {
    color:"#ffd700",
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  subject: {
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: '#555'
    
  },
  content: {
    fontSize: '1rem',
    lineHeight: '1.5',
    marginBottom: '0.75rem',
    color: 'black',
  },
  image: {
    width: '100%',
    borderRadius: '12px',
    marginTop: '0.5rem'
  }
};

export default Post;

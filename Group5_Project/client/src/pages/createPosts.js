import React, { useState, useEffect } from 'react';
import '../css/posts.css';

function CreatePosts() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:5000/username_display', {
          credentials: 'include',
        });
        const data = await response.json();
        console.log('Fetched username:', data.username);
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
  
    fetchUsername();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    console.log('Username:', username); 

    const formData = new FormData();
    formData.append('username', username);  
    formData.append('subject', subject);
    formData.append('content', content);
    formData.append('PostImage', image);

    try {
      const response = await fetch('http://localhost:5000/api/post', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const result = await response.json();
      setSuccessMessage(result.message || 'Post created successfully!');
      setSubject(result.username);
      setSubject('');
      setContent('');
      setImage(null);
    } catch (err) {
      setErrorMessage('Error uploading post. Please try again.');
      console.error('Error uploading post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
          placeholder="Subject" 
          required
        />
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Content" 
          required
          name = "content"
        />
        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*" 
           name="PostImage"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default CreatePosts;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/api';
import '../css/login.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(formData);
      if (data) {  
      alert('Welcome back!');
      navigate('/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <>
      <div className="log_div">
        <h1>Log In</h1>
        <form id="log_in" name="log_in" onSubmit={handleSubmit}>
          <fieldset>
            <label className="block">Username:</label>
            <input
              type="text"
              required
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label className="block">Password:</label>
            <input
              className="block"
              id="password"
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="block"
              id="submit"
              type="submit"
              value={loading ? 'Logging in...' : 'Submit'}
              disabled={loading}
            />
          </fieldset>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
      <div className="alt">
        <p>New here?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Login;

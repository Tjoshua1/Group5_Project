/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import validate from '../components/Validate';
import '../css/sign_up.css';

const constraints = {
  username: {
    presence: { allowEmpty: false, message: "^Username is required" },
    length: { minimum: 3, message: "^Username must be at least 3 characters" }
  },
  email: {
    presence: { allowEmpty: false, message: "^Email is required" },
    email: { message: "^Please enter a valid email address" },
    format: {
      pattern: /@students.towson.edu$/,
      message: "^Must sign up with a Towson University email"
    }
  },
  password: {
    presence: { allowEmpty: false, message: "^Password is required" },
    length: { minimum: 6, message: "^Password must be at least 6 characters" }
  },
  verifyPassword: {
    presence: { allowEmpty: false, message: "^Please verify your password" },
    equality: "password"
  }
};

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData, constraints);
    
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { username, email, password } = formData;

      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Welcome, ${username}!`);
        navigate('/home');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <div className="sign_Div">
      <h1>Sign Up</h1>
      <form id="sign_up" name="sign_up" onSubmit={handleSubmit}>
        <fieldset>
          <label className="block">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username[0]}</p>}

          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}

          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password[0]}</p>}

          <label className="block">Verify Password:</label>
          <input
            type="password"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            required
          />
          {errors.verifyPassword && <p className="error">{errors.verifyPassword[0]}</p>}

          <input className="block" id="submit" type="submit" value="Submit" />
        </fieldset>
      </form>
      <div className="alt">
        <p>Already have an account?</p>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default SignUp;

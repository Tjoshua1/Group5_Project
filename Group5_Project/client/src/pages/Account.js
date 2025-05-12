import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/settings.css';
import { deleteAccount} from '../api/api';

function Account(){
  //const SignUPusername = localStorage.getItem('username');
        const [username, setUsername] = useState('');
      
      useEffect(() => {
        fetch('https://tap-in.onrender.com/username_display', {
          method: 'GET',
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.username) {
              setUsername(data.username);
            }
          })
          .catch((err) => {
            console.error('Error fetching username:', err);
          });
      }, []);

      const handleDelete = async () => {
        const navigate = useNavigate;
  if (!window.confirm('Are you sure you want to delete your account?')) return;

  try {
    const result = await deleteAccount(username);
    alert(result.message);
    navigate('/')
  } catch (err) {
    alert(err.message || 'Failed to delete account');
  }
};
    return(
        <div>
        <div class="nav_bar">
            <a class="activated_link" href="/Account">Account Settings</a>
            <Link to = "/editprofile">Edit Profile</Link>
            <Link to = "/privacy">Privacy Settings</Link>
            <Link to = "/home">Home</Link>
        </div>
        <div class="main_content">
        <h1>Settings</h1>
        <br></br>
        <form  id="account_form" name="account_form" method="POST">
            <h2>General</h2>
            <label>Change Password</label><br></br>
            <input type="password" name="password"/>
            <br></br>
            <h2>Advanced</h2>
            <button type="submit" onClick={handleDelete}>Delete Account</button><br></br>
        </form>
        </div>
       </div>
    );
}

export default Account;
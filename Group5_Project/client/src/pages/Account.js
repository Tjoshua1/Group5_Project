import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/settings.css';

function Account(){
        const [username, setUsername] = useState('');
      
      useEffect(() => {
        fetch('http://localhost:5000/username_display', {
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
    return(
        <div>
        <div class="nav_bar">
            <a class="activated_link" href="/Account">Account Settings</a>
            <Link to = "/editprofile">Edit Profile</Link>
            <Link to = "/privacy">Privacy Settings</Link>
            <Link to = "/home">Home</Link>
        </div>
        <div class="main_content">
        <h1>{username}'s Settings</h1>
        <br></br>
        <form  id="account_form" name="account_form" method="POST">
            <h2>General</h2>
            <label>Change Password</label><br></br>
            <input type="password" name="password"/>
            <br></br>
            <h2>Advanced</h2>
            <button type="submit">Delete Account</button><br></br>
        </form>
        </div>
       </div>
    );
}

export default Account;
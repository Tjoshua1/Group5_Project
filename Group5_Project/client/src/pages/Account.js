import React from 'react';
import { Link } from 'react-router-dom';
import '../css/settings.css';

function Account(){
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
            <button type="submit">Delete Account</button><br></br>
        </form>
        </div>
       </div>
    );
}

export default Account;
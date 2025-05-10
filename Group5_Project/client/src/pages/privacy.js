import React from 'react';
import { Link } from 'react-router-dom';
import '../css/settings.css';

function Privacy(){
return(
    <div>
        <div class="nav_bar">
            <Link to = "/Account">Account Settings</Link>
            <Link to = "/editprofile">Edit Profile</Link>
            <Link className="activated_link" to="/privacy">Privacy Settings</Link>
            <Link to = "/home">Home</Link>
        </div>
       
        <br></br>
        <form  id="account_form" name="account_form" method="POST">
            <div class="main_content">
            <h1>Settings</h1>
            <h2>General</h2>
                <label>Account View</label><br></br>
                <div class="privacy_view_options">
                    <input type="radio" id="public" name="account_view" value="public"/>
                    <label for="public">Public</label><br></br>
                    <input type="radio" id="private" name="account_view" value="private"/>
                    <label for="private">Private</label><br></br>
                </div>
                <label>Direct Messages</label><br></br>
                <div class="privacy_dm_options">
                    <input type="radio" id="dm_everyone" name="dm_view" value="everyone"/>
                    <label for="dm_public">Everyone</label><br></br>
                    <input type="radio" id="dm_followers" name="dm_view" value="followers"/>
                    <label for="dm_followers">Followers Only</label><br></br>
                    <input type="radio" id="dm_no_one" name="dm_view" value="no_one"/>
                    <label for="dm_no_one">No One</label><br></br>
                </div>
                </div>  
        </form></div>
    );
}

export default Privacy;
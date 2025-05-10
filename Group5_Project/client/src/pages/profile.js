import React from 'react';
import { Link } from 'react-router-dom';
import '../css/profile.css';

function Profile(){
    return(
        <div>
        <img src="../images/default_profile_img.png" alt="User Profile"/> 
        <h2>Username</h2>
        <button>
            <Link to = "/editprofile">Edit Profile</Link>
        </button>
        <div class="follow-info">
            <h3>Followers: </h3>
            <h3>Following: </h3>
        </div>
        <h3>Posts</h3>
        <div class="posts">
            Posts:
        </div>
    </div>
    );
}

export default Profile;
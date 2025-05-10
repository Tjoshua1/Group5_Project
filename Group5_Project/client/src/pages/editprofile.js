import React from 'react';
import { Link } from 'react-router-dom';
import '../css/settings.css';

function EditProfile() {
    return (
        <div>
            <div className="nav_bar">
                <Link to="/account">Account Settings</Link>
                <Link className="activated_link" to="/editprofile">Edit Profile</Link>
                <Link to="/privacy">Privacy Settings</Link>
                <Link to="/home">Home</Link>
            </div>
           <div class="main_content">
           <h1>Settings</h1>
           <br />
           <h2>General</h2>
           <form id="edit_profile_form" name="edit_profile_form" method="POST">
               <label>Display Name</label><br />
               <input type="text" name="display_name" />
               <br />
               <label>Bio</label><br />
               <textarea></textarea>
               <br />
               <div className="edit_profile_pic">
                   <input id="upload" type="file" accept="image/*" name="profile_pic" />
                   <img src="/default_profile_img.png" alt="profile" />
               </div>
               <input id="submit" type="submit" value="Submit" />
           </form>
       </div>
           </div>
    );
}

export default EditProfile;
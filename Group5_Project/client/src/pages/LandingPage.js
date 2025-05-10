import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import '../css/index.css';

function LandingPage(){
    return(
        <div class="welcome">
        <div class="left-column">
            <img src={logo} alt="towson logo" className="logo"/>
        </div>
        <div class="right-content">
            <div class="text">
                <h1>Tap in @ TU</h1>
            </div>
            <div class="btn">
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Log In</Link>
            </div>
        </div>
    </div>
    );
}

export default LandingPage;
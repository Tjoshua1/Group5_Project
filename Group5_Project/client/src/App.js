import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import Profile from './pages/profile';
import CreatePosts from './pages/createPosts';
import ExplorePage from './pages/ExplorePage';
import Bookmarks from './pages/bookmarks';
import EditProfile from './pages/editprofile';
import Messages from './pages/messages';
import Privacy from './pages/privacy';
import Account from './pages/Account';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPosts" element={<CreatePosts />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

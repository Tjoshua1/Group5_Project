const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Signup request received:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err); // Log the error
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});


// Create post via session (not used by frontend formData flow)
router.post('/posts', async (req, res) => {
  const userID = req.session.userId;
  const student = await Student.findOne({ _id: userID });

  if (!student) return res.status(404).send('User not found');

  const { subject, content } = req.body;

  try {
    const post = new Post({ username: student.username, subject, content });
    await post.save();
    res.redirect('/home');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving post');
  }
});


//To Delete
router.delete('/delete-account', async (req, res) => {
    const { email } = req.body;
    await User.findOneAndDelete({ email });
    res.send('Account deleted');
  });

// To Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });
    
    req.session.userId = user._id;
    req.session.username = user.username;
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//To update Password
router.put('/update-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
  
    res.send("Password updated");
  });
  

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// To Signup
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Username already exists or bad data' });
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

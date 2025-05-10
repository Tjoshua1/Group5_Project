const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Create a new post
router.post('/', upload.single('PostImage'), async (req, res) => {
  console.log('Username:', req.body.username);
  console.log(req.body);
  console.log(req.file);  
  console.log('Image Path:', req.file ? `/uploads/${req.file.filename}` : 'No image');


  try {
    const {content, username, subject } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      username,
      subject,
      content, 
      imagePath
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created', post: newPost,
      username: newPost.username 
     });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating post');
  }
});


// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send('Failed to fetch posts');
  }
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const GridFsStorage = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const Student = require('./models/user');
const Post = require('./models/Post');
const router = express.Router();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..', 'client', 'css')));
app.use(express.static(path.join(__dirname, '..', 'client', 'js')));
app.use(express.static(path.join(__dirname, '..', 'client', 'images')));
//app.use('/api/user', userRoutes);


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
}));

// MongoDB Connection
mongoose.connect('mongodb+srv://tjoshu1:group5@cluster0.hkda6.mongodb.net/TapIn?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/user', authRoutes);   // signup, login, update-password, delete
app.use('/api/post', postRoutes);   // post creation and retrieval

// Test + custom session routes
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Tap in @TU Server!" });
});
// Get current username (used for session-based UI updates)
app.get('/username_display', async (req, res) => {
  //req.session.username = student.username;
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: 'Not logged in' });

  try {
    const student = await Student.findById(userId);
    if (!student) return res.status(404).json({ error: 'User not found' });
    req.session.username = student.username;
    console.log('Sending Username check:', student.username);
    res.json({ username: student.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Paginated post retrieval (session-based version)
app.get('/post_display', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = 10;

  try {
    const posts = await Post.find()
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Placeholder routes
app.get('/home', (req, res) => {
  res.send('Welcome to Home!');
});

app.post('/home', (req, res) => {
  res.redirect('/home');
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const Student = require('./models/Student');
const Post = require("./models/Post");
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'css')));
app.use(express.static(path.join(__dirname, '..', 'js')));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));



// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB Atlas");

  // Start server **after** DB connection
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Test route

app.get('/post_display', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);  // Sends post data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/posts', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'posts.html'));
});

app.post('/posts', async (req, res) => {
  const {subject, content} = req.body;
  try{
    const post = new Post({subject, content})
    await post.save();
    // res.send("Student registered successfully!")
    res.redirect('/home');
  }catch(err) {
    console.error(err);
    res.status(500).send('Error saving post');
  }
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'home.html'));
});
app.post('/home', (req, res) => {
  res.redirect('/home');
});
app.get('/log_in',  (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'log_in.html'));
  
});

app.post('/log_in', async (req, res) => {
  const { username, password } = req.body;

  // Find user in the database
  const student = await Student.findOne({ username });

  if (student && student.password === password) {
      req.session.userId = student._id; // Save user ID in session
      res.json({ message: 'Logged in' }); // Send success message
  } else {
      res.status(401).json({ error: 'Invalid credentials' }); // Send error message
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Tap in @TU Server!" });
});

app.get('/sign_up', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'sign_up.html'));
})

app.post('/sign_up', async (req, res) => {
  const {username, email, password} = req.body;

  const testUser = await Student.findOne({username});
  const testEmail = await Student.findOne({email});
  
    if(!testUser && !testEmail){
      try{
        const student = new Student({username, email, password})
        await student.save();
        // res.send("Student registered successfully!")
        // res.redirect('/log_in');
        res.json({message: "signed up"});
      }catch(err) {
        console.error(err);
        res.status(500).json({error:'Error saving user'});
      }
    
    }
    else if(testUser){
      console.log("username already taken")
      res.status(401).json({error: "Username already taken"});
    }
    else if(testEmail){
      console.log("email already has an account")
      res.status(401).json({error: "email already has an account"});
    }
});
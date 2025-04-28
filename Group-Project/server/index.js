require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');
const Student = require('./models/Student');
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'css')));
app.use(express.static(path.join(__dirname, '..', 'js')));




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
app.get('/log_in',  (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'log_in.html'));
});
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Tap in @TU Server!" });
});

app.get('/sign_up', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'sign_up.html'));
})

app.post('/sign_up', async (req, res) => {
  const {username, email, password} = req.body;

  try{
    const student = new Student({username, email, password})
    await student.save();
    // res.send("Student registered successfully!")
    res.redirect('/log_in');
  }catch(err) {
    console.error(err);
    res.status(500).send('Error saving user');
  }
  
});

app.get('/posts', async (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'posts.html'));
})

app.post('/posts', async (req, res) => {
  const {subject, content} = req.body;

  try{
    const post = new Post({subject, content})
    await post.save();
    res.redirect('/home');
  }catch(err) {
    console.error(err);
    res.status(500).send('Error posting');
  }
  
});
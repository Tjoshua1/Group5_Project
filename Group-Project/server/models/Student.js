const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
}, {collection: 'students'});

module.exports = mongoose.model('Student', studentsSchema);
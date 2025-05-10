const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
}, { collection: 'students', 
  timestamps: true 
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;


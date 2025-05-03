const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  username: {type: String, required: true},
  subject: {type: String, required: true},
  content: {type: String, required: true},
}, {collection: 'posts'});

module.exports = mongoose.model('Post', postsSchema);


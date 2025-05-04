const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  subject: {type: String, required: true},
  content: {type: String, required: true},
}, {collection: 'posts'});

module.exports = mongoose.model('Post', postsSchema);


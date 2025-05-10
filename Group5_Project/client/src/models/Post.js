const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {type: String, required: true},
  subject: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: mongoose.Schema.Types.ObjectId,
   required: false,
  ref: 'uploads.files',}
}, { collection: 'posts',
  timestamps: true 
 });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

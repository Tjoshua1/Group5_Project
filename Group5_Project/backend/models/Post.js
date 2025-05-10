const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  username: {type: String},
  subject: {type: String},
  content: {type: String},
  imagePath: {type: mongoose.Schema.Types.ObjectId,
   required: false,
  ref: 'uploads.files',}
}, { collection: 'posts',
  timestamps: true 
 });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

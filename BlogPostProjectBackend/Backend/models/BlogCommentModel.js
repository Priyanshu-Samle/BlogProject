const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comments: [
    {
      type: String,  
      required:true
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);

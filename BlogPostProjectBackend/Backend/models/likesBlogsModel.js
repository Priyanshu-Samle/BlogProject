// const mongoose = require('mongoose');

// const likesSchema = new mongoose.Schema({
//   likes:{
//        type:String,
//        require:true
//   },

//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Blog',
//     required: true,
//   },
// });

// module.exports = mongoose.model('Likes', likesSchema);


const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Likes', likesSchema);

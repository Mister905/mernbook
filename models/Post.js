const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  // We still want to show the post's user's name even if they've deleted their account
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);

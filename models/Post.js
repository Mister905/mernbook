const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  profile_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
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
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("posts", PostSchema);

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
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
});

module.exports = mongoose.model("comments", CommentSchema);

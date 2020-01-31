const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  user_location: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: "I'd Rather Not Say"
  },
  biography: {
    type: String,
    default: null
  },
  skills: {
    type: [String],
    default: null
  },
  interests: {
    type: [String],
    default: null
  },
  social_media: {
    youtube: {
      type: String,
      default: "https://www.youtube.com/"
    },
    twitter: {
      type: String,
      default: "https://twitter.com/"
    },
    facebook: {
      type: String,
      default: "https://www.facebook.com/"
    },
    linkedin: {
      type: String,
      default: "https://www.linkedin.com/"
    },
    instagram: {
      type: String,
      default: "https://www.instagram.com/"
    }
  },
  profile_image_id: String,
  created_on: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("profiles", ProfileSchema);

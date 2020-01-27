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
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      job_location: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      institution: {
        type: String,
        required: true
      },
      credential: {
        type: String,
        required: true
      },
      field: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social_media: {
    youtube: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    facebook: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    }
  },
  profile_image_id: String,
  created_on: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("profiles", ProfileSchema);

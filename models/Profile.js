const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String,
    default: null
  },
  status: {
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
  biography: {
    type: String,
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
      location: {
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
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  profile_image_id: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("profiles", ProfileSchema);

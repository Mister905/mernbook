const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  skills: {
    type: [String]
  },
  interests: {
    type: [String]
  },
  biography: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
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
  date: {
      type: Date,
      default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  institution: {
    type: String,
    required: true
  },
  credential: {
    type: String,
    required: true
  },
  field_of_study: {
    type: String
  },
  from_date: {
    type: Date,
    required: true
  },
  to_date: {
    type: Date
  },
  is_current_study: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("skills", SkillSchema);

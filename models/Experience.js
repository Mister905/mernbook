const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
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
    from_date: {
      type: Date,
      required: true
    },
    to_date: {
      type: Date
    },
    is_current_job: {
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
  },
  { collection: "experience" }
);

module.exports = mongoose.model("education", EducationSchema);

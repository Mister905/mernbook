const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profiles/experience
// @desc Create profile experience
// @access  Private
router.post(
  "/experience",
  [
    auth,
    [
      check("title", "Title is Required")
        .not()
        .isEmpty(),
      check("company", "Company is Required")
        .not()
        .isEmpty(),
      check("job_location", "Job Location is Required")
        .not()
        .isEmpty(),
      check("from_date", "From Date is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      job_location,
      from_date,
      to_date,
      is_current_job,
      description
    } = req.body;

    const experience_build = {
      title,
      company,
      job_location,
      from_date,
      to_date,
      is_current_job,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.send("Server Error");
      }
      profile.experience.push(experience_build);
      await profile.save();
      return res.send(profile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /profiles/experience/experience_id
// @desc Update profile experience
// @access  Private
router.put(
  "/experience/:experience_id",
  [
    auth,
    [
      check("title", "Title is Required")
        .not()
        .isEmpty(),
      check("company", "Company is Required")
        .not()
        .isEmpty(),
      check("from_date", "From Date is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      job_location,
      from_date,
      to_date,
      is_current_job,
      description
    } = req.body;

    const experience_build = {
      title,
      company,
      job_location,
      from_date,
      to_date,
      is_current_job,
      description
    };

    const { experience_id } = req.params;

    try {
      let updated_experience = await Profile.findOneAndUpdate(
        { user: req.user.id, "experience._id": experience_id },
        { $set: { "experience.$": experience_build } },
        { new: true }
      ).populate("user", ["first_name", "last_name"], User);

      return res.send(updated_experience);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET /profiles/experience/experience_id
// @desc Get profile experience item
// @access  Private
router.get("/experience/:experience_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { experience_id } = req.params;

    const experience_item = profile.experience.filter(item => {
      if (item._id.toString() === experience_id) {
        return item;
      }
    });

    return res.send(experience_item[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /profiles/experience/experience_id
// @desc Delete profile experience item
// @access  Private
router.delete("/experience/:experience_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { experience_id } = req.params;

    const deletion_index = profile.experience
      .map(item => item.id)
      .indexOf(experience_id);

    profile.experience.splice(deletion_index, 1);

    await profile.save();

    return res.send("Experience Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

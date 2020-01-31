const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST profile/education
// @desc Create profile education
// @access  Private
router.post(
  "/education",
  [
    auth,
    [
      check("institution", "Institution is Required")
        .not()
        .isEmpty(),
      check("credential", "Credential is Required")
        .not()
        .isEmpty(),
      check("field_of_study", "Field of Study is Required")
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
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      institution,
      credential,
      field_of_study,
      from_date,
      to_date,
      is_current_study,
      description
    } = req.body;

    const education_build = {
      institution,
      credential,
      field_of_study,
      from_date,
      to_date,
      is_current_study,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.send("Server Error");
      }
      profile.education.push(education_build);
      await profile.save();
      return res.send(profile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /profiles/education/education_id
// @desc Update profile education
// @access  Private
router.put(
  "/education/:education_id",
  [
    auth,
    [
      check("institution", "Institution is Required")
        .not()
        .isEmpty(),
      check("credential", "Credential is Required")
        .not()
        .isEmpty(),
      check("field", "Field is Required")
        .not()
        .isEmpty(),
      check("from", "From Date is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      institution,
      credential,
      field_of_study,
      from_date,
      to_date,
      is_current_study,
      description
    } = req.body;

    const education_build = {
      institution,
      credential,
      field_of_study,
      from_date,
      to_date,
      is_current_study,
      description
    };

    const { education_id } = req.params;

    try {
      const updated_education = await Profile.findOneAndUpdate(
        { user: req.user.id, "education._id": education_id },
        { $set: { "education.$": education_build } },
        { new: true }
      );

      return res.send(updated_education);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET /profiles/education/education_id
// @desc Get profile education item
// @access  Private
router.get("/education/:education_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { education_id } = req.params;

    const education_item = profile.education.filter(item => {
      if (item._id.toString() === education_id) {
        return item;
      }
    });

    return res.send(education_item[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /profiles/education/education_id
// @desc Delete profile education item
// @access  Private
router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const { education_id } = req.params;

    const deletion_index = profile.education
      .map(item => item.id)
      .indexOf(education_id);

    profile.education.splice(deletion_index, 1);

    await profile.save();

    return res.send("Education Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

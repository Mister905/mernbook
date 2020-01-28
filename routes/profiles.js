const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route GET /profiles/active
// @desc Get Active User's Profile
// @access  Private
router.get("/active", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["first_name", "last_name"], User);

    if (!profile) {
      return res.status(400).json({ msg: "Profile Not Found" });
    }

    return res.send(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route PUT /profiles/update
// @desc Update User Profile
// @access  Private
router.put("/update", auth, async (req, res) => {
  const {
    user_location,
    status,
    skills,
    interests,
    biography,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;

  let profile_build = {};

  profile_build.user = req.user.id;

  if (user_location) {
    profile_build.user_location = user_location;
  }

  if (skills) {
    profile_build.skills = skills.split(",").map(skill => skill.trim());
  }

  if (interests) {
    profile_build.interests = interests
      .split(",")
      .map(interest => interest.trim());
  }

  if (biography) {
    profile_build.biography = biography;
  }

  profile_build.social = {};

  if (youtube) profile_build.youtube = youtube;
  if (twitter) profile_build.twitter = twitter;
  if (facebook) profile_build.facebook = facebook;
  if (linkedin) profile_build.linkedin = linkedin;
  if (instagram) profile_build.instagram = instagram;

  try {
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      profile_build,
      { new: true }
    );
    return res.send(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /profiles
// @desc Deletes related user, profile and posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    return res.send("User Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /profiles
// @desc GET ALL User Profiles
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "user",
      ["first_name", "last_name"],
      User
    );

    return res.send(profiles);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /profiles/user/:user_id
// @desc Get Profiles by User ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["first_name", "last_name"], User);

    if (!profile) {
      return res.status(400).json({ msg: "Profile Not Found" });
    }

    return res.send(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

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
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const experience_build = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    const { experience_id } = req.params;

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id, "experience._id": experience_id },
        { $set: { "experience.$": experience_build } },
        { new: true }
      );

      return res.send(profile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /profiles/experience/experience_id
// @desc Delete profile experience
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
      field,
      from,
      to,
      current,
      description
    } = req.body;

    const education_build = {
      institution,
      credential,
      field,
      from,
      to,
      current,
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
      field,
      from,
      to,
      current,
      description
    } = req.body;

    const education_build = {
      institution,
      credential,
      field,
      from,
      to,
      current,
      description
    };

    const { education_id } = req.params;

    try {
      const education = await Profile.findOneAndUpdate(
        { user: req.user.id, "education._id": education_id },
        { $set: { "education.$": education_build } },
        { new: true }
      );

      return res.send(education);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /profiles/education/education_id
// @desc Delete profile education
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

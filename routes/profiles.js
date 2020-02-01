const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route GET /api/profiles/active
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

// @route PUT /api/profiles/update
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

  if (skills.length > 0) {
    profile_build.skills = skills.split(",").map(skill => skill.trim());
  } else {
    profile_build.skills = [];
  }

  if (interests.length > 0) {
    profile_build.interests = interests
      .split(",")
      .map(interest => interest.trim());
  } else {
    profile_build.interests = [];
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

// @route DELETE /api/profiles
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

// @route GET /api/profiles
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

// @route GET /api/profiles/user/:user_id
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

// @route GET /api/profiles
// @desc Delete Profile and Account
// @access  Public
router.delete("/", async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

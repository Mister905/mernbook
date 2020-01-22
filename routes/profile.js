const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route GET profile/current
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

// @route POST profile
// @desc Create User Profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("location", "Location is Required")
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
      location,
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

    profile_build.location = location;

    if (skills) {
      profile_build.skills = skills.split(",").map(skill => skill.trim());
    }

    if (interests) {
      profile_build.interests = interests
        .split(",")
        .map(interest => interest.trim());
    }

    profile_build.social = {};

    if (youtube) profile_build.youtube = youtube;
    if (twitter) profile_build.twitter = twitter;
    if (facebook) profile_build.facebook = facebook;
    if (linkedin) profile_build.linkedin = linkedin;
    if (instagram) profile_build.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        profile = new Profile(profile_build);
        await profile.save();
        return res.send(profile);
      }
      return res.status(500).send("Server Error");
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PATCH profile
// @desc Update User Profile
// @access  Private
router.put(
  "/",
  [
    auth,
    [
      check("location", "Location is Required")
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
      location,
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

    profile_build.location = location;

    if (skills) {
      profile_build.skills = skills.split(",").map(skill => skill.trim());
    }

    if (interests) {
      profile_build.interests = interests
        .split(",")
        .map(interest => interest.trim());
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
      // let profile = await Profile.findOne({ user: req.user.id });
      // if (!profile) {
      //   profile = new Profile(profile_build);
      //   await profile.save();
      //   return res.send(profile);
      // }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET profile
// @desc GET ALL User Profiles
// @access  Public
router.get("/", async (req, res) => {
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

// @route GET profile/user/:user_id
// @desc Get Profile by User ID
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

// @route DELETE profile
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

module.exports = router;

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const User = require("../models/User");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const crypto = require("crypto");
const path = require("path");

// @route GET /api/profile/active
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

// @route PUT /api/profile/update
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

// @route DELETE /api/profile
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

// @route GET /api/profile/user/:user_id
// @desc Get Profiles by User ID
// @access  Private
router.get("/user/:user_id", auth, async (req, res) => {
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

// @route GET /api/profile
// @desc Delete Profile and Account
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    return res.send("Profile and Accounted Delete");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/profile
// @desc GET ALL User Profiles
// @access  Private
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

// @route GET /api/profile/:profile_id
// @desc Get profile by ID
// @access  Private
router.get("/:profile_id", auth, async (req, res) => {
  try {
    const { profile_id } = req.params;
    const profile = await Profile.findById(profile_id).populate(
      "user",
      ["first_name", "last_name"],
      User
    );
    return res.send(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

const conn = mongoose.createConnection(keys.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "profile-images"
  });
});

// Create storage engine
const storage = new GridFsStorage({
  url: keys.mongo_uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "profile-images"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// @route POST /api/profile/
// @desc Upload Profile Image
// @access
router.post(
  "/:profile_id/upload-profile-image",
  [auth, upload.single("profile_image")],
  async (req, res) => {
    try {
      const { profile_id } = req.params;

      const { id } = req.file;

      const profile = await Profile.findByIdAndUpdate(profile_id, {
        profile_image_id: id
      }).populate("user", ["first_name", "last_name"], User);

      return res.send(profile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

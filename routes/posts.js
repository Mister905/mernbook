const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /posts
// @desc Create a Post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        "-password"
      );

      const { text } = req.body;

      console.log(user);

      const post_build = new Post({
        user: req.user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        text
      });

      const post = await post_build.save();
      return res.send(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

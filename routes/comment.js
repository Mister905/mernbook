const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// @route GET /api/comment/post/:post_id
// @desc Get post comments
// @access  Private
router.get("/post/:post_id", auth, async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await Comment.find({ post_id });
    return res.send(comments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/comment/:comment_id
// @desc Get comment by ID
// @access  Private
router.get("/:comment_id", auth, async (req, res) => {
  try {
    const { comment_id } = req.params;
    const comment = await Comment.findById(comment_id);
    return res.send(comment);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/comment/post/:post_id
// @desc Create a Comment
// @access  Private
router.post(
  "/post/:post_id",
  [
    auth,
    [
      check("text", "Text is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { post_id } = req.params;

      const { user_id, first_name, last_name, text } = req.body;

      const new_comment = new Comment({
        user: user_id,
        post_id,
        first_name,
        last_name,
        text
      });

      await new_comment.save();

      return res.send(new_comment);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/comment/:comment_id
// @desc Update a Comment
// @access  Private
router.put(
  "/:comment_id",
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

    const { text } = req.body;

    const { comment_id } = req.params;

    try {
      let updated_comment = await Comment.findOneAndUpdate(
        { _id: comment_id },
        {
          text
        },
        { new: true }
      );
      return res.send(updated_comment);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

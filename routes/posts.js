const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /api/posts
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
      const user = await User.findById(req.user.id).select("-password");

      const { text } = req.body;

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

// @route PUT /api/posts/:post_id
// @desc Update Post
// @access  Private
router.put(
  "/:post_id",
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
      const { post_id } = req.params;

      const { text } = req.body;

      let post = await Post.findById(post_id);

      if (!post) {
        return res.status(404).send("Post Not Found");
      }

      // Authorize Update
      if (post.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
      }

      post = await Post.findByIdAndUpdate(
        post_id,
        { $set: { text } },
        { new: true }
      );

      return res.send(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/posts
// @desc Get All Posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.send(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/posts/:post_id
// @desc Get Post by ID
// @access  Private
router.get("/:post_id", auth, async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    return res.send(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/posts/:post_id
// @desc Delete Post
// @access  Private
router.delete("/:post_id", auth, async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    // Authorize Delete
    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    await post.remove();

    res.send("Post Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route PUT /api/posts/:post_id/like
// @desc Like a Post
// @access  Private
router.put("/:post_id/like", auth, async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id);

    const previously_liked = post.likes.find(
      like => like.user.toString() === req.user.id
    );

    if (previously_liked) {
      return res.status(400).json({ msg: "You Already Liked This Post" });
    }

    post.likes.push({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (error) {
    console.log(error.message);
  }
});

// @route PUT /api/posts/:post_id/like
// @desc Like a Post
// @access  Private
router.put("/:post_id/unlike", auth, async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id);

    const previously_liked = post.likes.find(
      like => like.user.toString() === req.user.id
    );

    if (!previously_liked) {
      return res.status(400).send("You Have Not Liked This Post");
    }

    const deletion_index = post.likes
      .map(item => item.user)
      .indexOf(req.user.id);

    post.likes.splice(deletion_index, 1);

    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.log(error.message);
  }
});

// @route POST /api/posts/:post_id/comment
// @desc Comment on a Post
// @access  Private
router.post(
  "/:post_id/comments",
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
      const { post_id } = req.params;

      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(post_id);

      const { text } = req.body;

      const comment_build = {
        user: req.user.id,
        text,
        first_name: user.first_name,
        last_name: user.last_name
      };

      post.comments.push(comment_build);

      await post.save();

      return res.send(post.comments);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /api/posts/:post_id/comment
// @desc Delete Comment
// @access  Private
router.delete("/:post_id/comments/:comment_id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { post_id, comment_id } = req.params;
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).send("Post Not Found");
    }

    let comment = post.comments.find(
      comment => comment.id.toString() === comment_id
    );

    if (!comment) {
      return res.status(404).send("Comment Not Found");
    }

    // Authorize
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }

    const deletion_index = post.comments
      .map(item => item.id)
      .indexOf(comment_id);

    post.comments.splice(deletion_index, 1);

    await post.save();

    return res.json(post.comments);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Server Error");
  }
});

module.exports = router;

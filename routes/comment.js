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

// // @route POST /api/comment/post/:post_id
// // @desc Comment on a Post
// // @access  Private
// router.post(
//   "/post/:post_id",
//   // [
//   //   auth,
//   //   [
//   //     check("text", "Text is Required")
//   //       .not()
//   //       .isEmpty()
//   //   ]
//   // ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {

//       console.log('test')

//       // const { post_id } = req.params;

//       // console.log(req.body)

//       // const { text } = req.body;

//       // const user = await User.findById(req.user.id).select("-password");

//       // const post = await Post.findById(post_id);

//       // const comment_build = {
//       //   user: req.user.id,
//       //   text,
//       //   first_name: user.first_name,
//       //   last_name: user.last_name
//       // };

//       // post.comments.push(comment_build);

//       // await post.save();

//       // return res.send(post.comments);
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// @route DELETE /api/post/:post_id/comment
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

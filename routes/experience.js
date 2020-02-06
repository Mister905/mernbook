const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Experience = require("../models/Experience");
const User = require("../models/User");

// @route GET /api/experience
// @desc Get experience
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const experience = await Experience.find({ user: req.user.id }).sort({
      from_date: -1
    });
    return res.send(experience);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/experience
// @desc Create experience
// @access  Private
router.post(
  "/",
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

    const user = await User.findById(req.user.id).select("-password");

    const experience_build = new Experience({
      user: req.user.id,
      title,
      company,
      job_location,
      from_date,
      to_date,
      is_current_job,
      description
    });

    try {
      const experience = await experience_build.save();
      return res.send(experience);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/experience/experience_id
// @desc Update experience
// @access  Private
router.put(
  "/:experience_id",
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

    const { experience_id } = req.params;

    try {
      let updated_experience = await Experience.findOneAndUpdate(
        { _id: experience_id },
        {
          title,
          company,
          job_location,
          from_date,
          to_date,
          is_current_job,
          description
        },
        { new: true }
      );

      console.log(updated_experience);

      return res.send(updated_experience);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/experience/experience_id
// @desc Get experience item
// @access  Private
router.get("/:experience_id", auth, async (req, res) => {
  try {
    const { experience_id } = req.params;
    const experience = await Experience.findById(experience_id);
    return res.send(experience);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/experience/experience_id
// @desc Delete experience
// @access  Private
router.delete("/:experience_id", auth, async (req, res) => {
  try {
    const { experience_id } = req.params;

    await Experience.remove({ _id: experience_id });

    return res.send("Experience Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/experience
// @desc Delete account experience
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Experience.remove({ user: req.user.id });
    return res.send("Experience Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/experience/:user_id
// @desc Get experience by user ID
// @access  Private
router.get("/:user_id", auth, async (req, res) => {
  const { user_id } = req.params;
  try {
    const experience = await Experience.find({ user: user_id }).sort({
      from_date: -1
    });
    return res.send(experience);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

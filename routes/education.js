const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Education = require("../models/Education");
const User = require("../models/User");

// @route GET /api/education
// @desc Get education
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const education = await Education.find({ user: req.user.id });
    return res.send(education);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/education
// @desc Create education
// @access  Private
router.post(
  "/",
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

    const user = await User.findById(req.user.id).select("-password");

    const education_build = new Education({
      user: req.user.id,
      institution,
      credential,
      field_of_study,
      from_date,
      to_date,
      is_current_study,
      description
    });

    try {
      const education = await education_build.save();
      return res.send(education);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/education/education_id
// @desc Update education
// @access  Private
router.put(
  "/:education_id",
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
      console.log(errors);
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
      let updated_education = await Education.findOneAndUpdate(
        { _id: education_id },
        { education_build },
        { new: true }
      );
      return res.send(updated_education);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/education/education_id
// @desc Get education item
// @access  Private
router.get("/:education_id", auth, async (req, res) => {
  try {
    const { education_id } = req.params;
    const education = await Education.findById(education_id);
    return res.send(education);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/education/education_id
// @desc Delete education
// @access  Private
router.delete("/:education_id", auth, async (req, res) => {
  try {
    const { education_id } = req.params;

    await Education.remove({ _id: education_id });

    return res.send("Experience Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/education
// @desc Delete account education
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Education.remove({ user: req.user.id });
    return res.send("Experience Deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

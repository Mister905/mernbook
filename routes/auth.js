const express = require("express");
const router = express.Router();
const keys = require("../config/keys");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route GET /auth/active_user
// @desc Get Active User
// @access  Private
router.get("/active_user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /auth/register
// @desc User Registration
// @access  Public
router.post(
  "/register",
  [
    check("first_name", "First Name is Required")
      .not()
      .isEmpty(),
    check("last_name", "Last Name is Required")
      .not()
      .isEmpty(),
    check("email", "Email is Required")
      .not()
      .isEmpty(),
    check("email", "A Valid Email is Required").isEmail(),
    check("password", "Password is Required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "A User With This Email Already Exists" }] });
      }

      let new_user = new User({
        first_name,
        last_name,
        email
      });

      const salt = await bcrypt.genSalt(10);

      new_user.password = await bcrypt.hash(password, salt);

      new_user = await new_user.save();

      return res.send(new_user);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route POST /auth/login
// @desc User Login
// @access  Public
router.post(
  "/login",
  [
    check("email", "Email is Required")
      .not()
      .isEmpty(),
    check("email", "A Valid Email is Required").isEmail(),
    check("password", "Password is Required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Login Failed" }] });
      }

      const is_match = await bcrypt.compare(password, user.password);

      if (!is_match) {
        return res.status(400).json({ errors: [{ msg: "Login Failed" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        keys.jwt_secret,
        { expiresIn: "8h" },
        (error, token) => {
          if (error) throw error;
          res.send(token);
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

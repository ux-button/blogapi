const express = require("express");
const passport = require("passport");

// Controllers
const { registrationController } = require("../controllers/registration");
const { loginController } = require("../controllers/login");

const router = express.Router();

// Public routes
router.post("/signup", registrationController);
router.post("/login", loginController);

// Protected route
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    return res.status(200).json({ message: "Access granted", user: req.user });
  })
);

module.exports = router;

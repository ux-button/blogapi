import express from "express";
import passport from "passport";

// Controllers
import { registrationController } from "../controllers/registration";
import { loginController } from "../controllers/login";

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

export { router };

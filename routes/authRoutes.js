const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/register", authController.register);
router.post("/login", authController.login);

// Google OAuth routes
router.get(
   "/google",
   (req, res, next) => {
       console.log("Request headers:", req.headers);
       console.log("Request host:", req.get("host"));
       console.log("Base URL:", req.protocol + "://" + req.get("host"));
       console.log(
          "Auth callback will be:",
          req.protocol + "://" + req.get("host") + "/api/auth/google/callback"
       );
       console.log(
          "Environment callback URL:",
          process.env.GOOGLE_CALLBACK_URL
       );
      
      // Clear any previous session if exists
      if (req.session) {
         req.session.destroy();
      }
      next();
   },
   passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account", // Force to select account every time
   })
);

router.get(
   "/google/callback",
   (req, res, next) => {
      passport.authenticate("google", {
         failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
         session: false,
      })(req, res, next);
   },
   authController.googleAuthCallback
);

module.exports = router;

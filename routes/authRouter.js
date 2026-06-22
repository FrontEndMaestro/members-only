const { Router } = require("express");
const authController = require("../controllers/authController");
const authRouter = Router();
const passport = require("passport");
authRouter.post("/signup", authController.postSignup);

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  }),
);

authRouter.get("/logout", authController.logOut);
module.exports = authRouter;

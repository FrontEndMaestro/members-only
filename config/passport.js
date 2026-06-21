const passport = require("passport");
const session = require("express-session");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const localStrategy = require("passport-local").Strategy;

//username will store email here
passport.use(
  new localStrategy(customFields, async (username, password, done) => {
    try {
      const user = await userModel.findUser(username);
      console.log("Result", user);
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findUserById(id);
    done(null, user);
  } catch (error) {
    console.warn(error);
  }
});

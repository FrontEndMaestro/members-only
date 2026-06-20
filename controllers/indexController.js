const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage("First name can only contain alphabets"),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage("Last name can only contain alphabets"),
  body("email")
    .isEmail()
    .withMessage("Email should be in the format: xyz@abc.com"),
  body("password")
    .isStrongPassword()
    .withMessage(
      `Password must be greater than 8 characters, contain lower case 
      , upper case characters , number and a symbol`,
    ),
  body("confirmPass")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

function getSignup(req, res) {
  res.render("signup");
}

const postSignup = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("signup", { errors: errors.array(), formData: req.body });
    }
    const { firstName, lastName, email, password, confirmPass } =
      matchedData(req);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const result = await userModel.addUser({
      firstName,
      lastName,
      email,
      hashedPassword,
    });
    if (result !== undefined) {
      console.log(result);
      res.status(400).render("signup", { formData: req.body, message: result });
    }
  },
];

function postMember() {}

module.exports = { getSignup, postSignup, postMember };

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log(`Server is listening at http://localhost:3000`);
});

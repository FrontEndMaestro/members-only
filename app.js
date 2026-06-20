const express = require("express");
const app = express();
const session = require("express-session");
const path = require("node:path");
const passport = require("passport");
const indexRouter = require("./routes/index");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((error, req, res, next) => {
  console.log(error);
});

app.listen(3000, () => {
  console.log(`Server is listening at http://localhost:3000`);
});

const express = require("express");

const app = express();
const session = require("express-session");
const path = require("node:path");
const passport = require("passport");
require("./config/passport");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRouter");
const messageRouter = require("./routes/messageRouter");
const { pool } = require("./model/dbConnection");
const pgSession = require("connect-pg-simple")(session);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    store: new pgSession({
      pool,
      createTableIfMissing: true,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //cookie expires after one day
  }),
);

app.use(passport.session());

app.use("/auth", authRouter);
app.use("/", indexRouter);
app.use("/message", messageRouter);

app.use((error, req, res, next) => {
  console.log(error);
});

app.listen(3000, "0.0.0.0", () => {
  console.log(`Server is listening at http://0.0.0.0:3000`);
});


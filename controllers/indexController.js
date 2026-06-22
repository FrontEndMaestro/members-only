const messageModel = require("../model/messageModel");
const userModel = require("../model/userModel");

function getSignup(req, res) {
  res.render("signup");
}

function postMember(req, res) {
  if (!req.user.membership_status) {
    if (req.body.secret == "fightclub") {
      userModel.updateUserMembership(req.user.id);
      res.render("member", { message: "Congrats You are now a member!" });
    } else {
      res.render("member", { message: "Incorrect pass phrase try again." });
    }
  }
}

async function getHome(req, res) {
  const allMessages = await messageModel.getAllMessagesWithUser();
  console.log(allMessages);
  if (req.isAuthenticated())
    res.render("index", { user: req.user, messages: allMessages });
  else {
    res.render("index", { messages: allMessages });
  }
}

function getLogin(req, res) {
  console.log("get request for login function", req.session.messages);
  const error = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { errorMessages: error });
}

function getMember(req, res) {
  res.render("member");
}

module.exports = { getSignup, postMember, getHome, getLogin, getMember };

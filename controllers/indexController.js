function getSignup(req, res) {
  res.render("signup");
}

function postMember(req, res) {}

function getHome(req, res) {
  if (req.isAuthenticated()) res.render("index", { user: req.user });
  else {
    res.render("index");
  }
}

function getLogin(req, res) {
  console.log("get request for login function", req.session.messages);
  const error = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { errorMessages: error });
}

module.exports = { getSignup, postMember, getHome, getLogin };

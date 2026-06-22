const messageModel = require("../model/messageModel");
const indexController = require("./indexController");

function getMessage(req, res) {
  res.render("createMessage");
}

async function postMessage(req, res) {
  let date = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  let time = new Date().toLocaleDateString();
  req.body.time = `${time} ${date}`;
  req.body.userId = req.user.id;
  await messageModel.createMessage(req.body);
  res.redirect("/home");
}

async function deleteMessage(req, res) {
  let messageId = req.params.messageId;
  await messageModel.deleteMessage(messageId);
  res.redirect("/home");
}

module.exports = { getMessage, postMessage, deleteMessage };

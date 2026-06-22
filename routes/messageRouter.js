const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/create", messageController.getMessage);
messageRouter.post("/create", messageController.postMessage);
messageRouter.delete("/delete/:messageId", messageController.deleteMessage);
module.exports = messageRouter;

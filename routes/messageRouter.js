const { Router } = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/create", messageController.getMessage);
messageRouter.post("/create", messageController.postMessage);
module.exports = messageRouter;

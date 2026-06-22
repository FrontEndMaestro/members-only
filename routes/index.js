const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/signup", indexController.getSignup);
indexRouter.get("/member", indexController.getMember);
indexRouter.post("/member", indexController.postMember);
indexRouter.get("/", indexController.getHome);
indexRouter.get("/login", indexController.getLogin);

module.exports = indexRouter;

const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/signup", indexController.getSignup);
indexRouter.post("/signup", indexController.postSignup);
indexRouter.post("/beamember", indexController.postMember);
module.exports = indexRouter;

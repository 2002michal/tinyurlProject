import express from"express";
import linkController from "../Controllers/linkController.js";
import middleware from "../Middleware/linkMiddleware.js"
// const {checkLinkId}= require('../Middleware/linkMiddleware')
const linkRouter=express.Router();

console.log("router");
//linkRouter.get("/",linkController.getAllLink)
//linkRouter.get("/:idLink",linkController.getLinkById)
//linkRouter.get("/:id",linkController.getLinkById)
linkRouter.get("/getLinksByUserId",linkController.getLinksByUserId)
linkRouter.post("/",linkController.addLink)
linkRouter.post("/addPlatfrom",linkController.addPlatform)
//linkRouter.put("/:id",linkController.updateLink)
linkRouter.delete("/",linkController.deleteLink)

export default linkRouter
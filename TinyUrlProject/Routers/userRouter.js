import express from"express";
import userController from "../Controllers/userController.js";
const userRouter=express.Router();

console.log("routerU");
//userRouter.get("/",userController.getAllUser)
userRouter.get("/:email/:password",userController.getUserById)//login
userRouter.post("/",userController.addUser)//register
userRouter.put("/",userController.updateUser)
//userRouter.delete("/",userController.deleteUser)

export default userRouter
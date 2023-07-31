
import express from 'express'
import cors from "cors";
import connectDB from './connectionDB.js';
import bodyParser from "body-parser";
import linkRouter from "./Routers/linkRouter.js"
import userRouter from "./Routers/userRouter.js"
import middleware from './Middleware/linkMiddleware.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import linkController from './Controllers/linkController.js';
import logiFunc from './Logi/logiFunctions.js';

const app = express()
const port = 8000;
connectDB();//חיבור לDB


dotenv.config()

app.use(cors())
app.use(bodyParser.json());
//app.use(bodyParser.text());


app.use("/login",userRouter)
app.use('/register',userRouter)
app.get("/:shortUrl", linkController.redirection)
app.use('/',middleware.checkVerify)


app.use('/byPlatform/:newUrl',logiFunc.getLinkByPlatforms)
app.use('/byMonth/:newUrl',logiFunc.getLinkByMonth)

app.use("/link", linkRouter)
app.use("/user", userRouter)




// mongoose.set('toJSON',{
//     virtuals:true,
//     transform:(doc,converted)=>{
//         delete converted._id;
//     }
// });

app.listen(port, () => {
    console.log(`example app listening on http://localhost:${port}`)
})

import express from "express"
import jwt from 'jsonwebtoken'
import usersModel from "../Models/users.js";



const middleware = {
    
    signToken: (req, res) => {
        try {
            console.log('secret:', process.env.SECRET_JWT)
            console.log(req.params.email+"hi"+req.params.password);
            console.log(req.body.email+"hi"+req.body.password);
            if (req.body.password == undefined && req.body.email == undefined) {
                const token = jwt.sign({ password: req.params.password, email: req.params.email }, process.env.SECRET_JWT)
                //res.status(200).json({ message: 'create token', token: token })
                //res.send({accessToken:token})
                return token
            }
            else {
                const token = jwt.sign({ password: req.body.password, email: req.body.email }, process.env.SECRET_JWT)
                console.log("tokenqq "+token);
                return token
            }
        }
        catch {
            res.status(401).send({ message: "unathorized" })
        }

    },

    checkVerify: async (req, res, next) => {
        try {
            const token = req.headers.authorization
            //.slice(7)
            console.log("header " + token)
            const decoded = jwt.verify(token, process.env.SECRET_JWT)
            req.decoded = decoded
            console.log(req.decoded);
            const user = await usersModel.findOne({ email:  req.decoded.email, password:  req.decoded.password });//לשאול אם לשים את זה פה אן ךלא
            console.log("user"+user);
            if(user!=null){
                return next()
            }
            else{
                res.status(400).send({message:"unathorized"})
            }
               
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    }
}

export default middleware;
 //module.exports={checkVerify}
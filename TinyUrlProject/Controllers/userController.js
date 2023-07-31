import e, { query } from "express";
import usersModel from "../Models/users.js";
import linksModel from "../Models/links.js";
import middleware from '../Middleware/linkMiddleware.js'

const userController = {
    //register
    addUser: async (req, res) => {
        console.log(req.body);
        const { name, email, password, linksArr } = req.body
        try {
            const user = await usersModel.findOne({ email: email })
            const user2 = await usersModel.findOne({ password: password })
            console.log(user + " user");
            if (user == null && user2 == null) {
                const newUser = await usersModel.create({ name, email, password, linksArr });
                console.log(newUser);
                const token = middleware.signToken(req, res)
                console.log("token:" + token);
                res.json(newUser)
            }
            else {
                res.status(400).json("existing email or such password")
            }
        }
        catch (error) {
            res.status(400).json({ message: e.message });
        }


    },

    getAllUser: async (req, res) => {
        try {
            const users = await usersModel.find();
            res.json(users);

        }
        catch (e) {
            console.log("getuserById error")
            res.status(400).json({ message: e.message })
        }
    },
    //משמש להתחברות
    getUserById: async (req, res) => {
        const { email, password } = req.params
        try {
            const user = await usersModel.findOne({ email: email });
            const user2 = await usersModel.findOne({ password: password });
            console.log(user + ":user");
            if (user != null && user2 != null) {
                const token = middleware.signToken(req, res)
                console.log("token:" + token);
                //res.json(token)
                res.status(200).json({ message: token })
            }
            else {
                res.status(400).json({ message: "the password or email worng" })
            }
        }
        catch (e) {
            console.log("getuserById error")
            res.status(400).json({ message: e.message })
        }
    },

    updateUser: async (req, res) => {
        console.log(req.body);
        const { email, password } = req.decoded;
        console.log(req.body);
        try {
            const user = await usersModel.findOne({ email: email })
            const user2 = await usersModel.findOne({ password: password })
            console.log(req.body);
            if (user == null && user == null) {
                const update_user = await usersModel.findOneAndUpdate({ email: email, password: password }, req.body, { new: true });
                console.log(update_user);
                res.json(update_user)
            }
            else {
                res.status(400).json({ message: "the password or email exist" })
            }

        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    },
    // //לתקןןןןןןןןן
    deleteUser: async (req, res) => {
        const { email, password } = req.decoded;
        //console.log();
        try {
           const arrLinkDel=usersModel.find({}).populate({path:"linksArr"})
           console.log("arrLinkDel "+arrLinkDel);
           for(let i=0;i< arrLinkDel.length;i++)
           {
               const s=await linksModel.deleteOne({ObjectId:arrLinkDel[i].ObjectId})
               console.log(s+"s");
           }
           // const delete_user = await usersModel.findOneAndRemove({ email: email, password: password });
            res.json(delete_user)
        }
        catch (e) {
            res.status(400).json({ message: e.message })
        }
    }
}

export default userController
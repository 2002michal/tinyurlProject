import e, { query } from "express";
import links from "../Models/links.js";
import linksModel from "../Models/links.js";
import usersModel from "../Models/users.js";
import userController from "../Controllers/userController.js";
import logi from '../Logi/logiFunctions.js'


const linkController = {
    addLink: async (req, res) => {
        console.log(req.decoded.email);
        console.log(req.decoded.password);
        const { originalUrl, newUrl, targetParamName } = req.body

        try {
            const user = await usersModel.findOne({ email: req.decoded.email, password: req.decoded.password })
            if (user == null) {
                res.json("unatorzition")
            }
            // כאן בודקים שהקישור הקצר לא קיים בטבלה הגדולה
            console.log("req.body.originalUrl" + req.body.originalUrl);
            const link = await linksModel.findOne({ newUrl: newUrl });
            console.log(link);
            if (link != null) {
                console.log("hi");
                res.stutus(400).send({ message: "the newUrl link existing" })
            }
            else {
                let flag = false
                //הולך לפונקציה שבודקת האם הקישור קיים לאותו משתמש אם קיים מחזירה אמת
                flag = await logi.getLinksByUserId(user, originalUrl)
                console.log("flag " + flag);
                if (flag == true)
                    res.status(400).send({ message: "קיים לך כבר קישור כזה" })
                //add big table
                else {
                    const newLink = await linksModel.create({ originalUrl, newUrl, targetParamName });
                    console.log("newLink " + newLink);
                    //add to links arr of user
                    await usersModel.findByIdAndUpdate(user._id, { $push: { linksArr: newLink._id } });
                    const strUrl = `http://localhost:8000/${newUrl}`
                    console.log(strUrl);
                    res.status(200).send({ message: strUrl })
                }
            }

        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addPlatform: async (req, res) => {
        const { email, password } = req.decoded
        const { originalUrl,newUrl, name } = req.body
        try {
            const user = await usersModel.findOne({ email: email, password: password });
            if (user == null) {
                res.json("the user no existing")
            }
            else {
                //בודקים שהקישור קיים בטבלה הראשית
                const link = await linksModel.findOne({ originalUrl: originalUrl ,newUrl:newUrl})
                if (link == null) {
                    res.json("no have such link in table")
                }
                else {
                    console.log("link " + user.linksArr);
                    console.log("link " + link._id);
                    //בודקים שהקישור קיים לאותו משתשמש
                    const link_id = await user.linksArr.filter(i => i._id.equals(link._id))
                    console.log("link_id " + link_id.length);
                    if (link_id.length > 0) {
                        //מגיע לכאן אם קיים כזה קישור
                        const targets = link.targetValuesArr
                        console.log(targets);
                        //כאן בודקים האם הפלטפורמה שהוא לחץ עליה קיימת במערך של הטרגט כי אם לא צריך להוסיף את זה
                        if (targets.length > 0) {
                            //מגיע לכאן אם יש כבר במערך ערכים
                            const filterTarget = targets.filter(tar => tar.name === name)

                            //console.log("arrTargets " + filterTarget.length);
                            if (filterTarget.length == 0) {
                                //מגיע לפה שהפלטפורמה שרוצה להוסיף  עדיין לא קיימת במערך
                                console.log("null");
                                const len = targets[targets.length - 1].id
                                link.targetParamName = "t"
                                const t=targets[targets.length - 1].value+10
                                targets.push({ id: len + 1, name: name, value:t  })
                                link.save()
                                const strUrl = `http://localhost:8000/${link.newUrl}?t=${t}`
                                res.json(strUrl)
                                //res.json(targets)
                            }
                            else {
                                const strUrl = `http://localhost:8000/${link.newUrl}?t=${t}`
                                res.json(strUrl)
                            }
                        }
                        else {
                            //מגיע לפה כשהמערך של המעקבים ריק 
                            console.log("else");
                            link.targetParamName = "t"
                            targets.push({ id: 1, name: name, value: 10 })
                            link.save()
                            const strUrl = `http://localhost:8000/${link.newUrl}?t=10`
                            res.json(strUrl)
                            // res.json("message2")
                        }
                    }
                    else {
                       
                        res.status(400).send({ message: "no have such link to user" })
                    }
                }

            }
        }
        catch (e) {
            res.status(500).send({ message: e.message })
        }
    },
    getAllLink: async (req, res) => {
        try {
            const link = await linksModel.find();
            console.log(link);
            res.json(link);

        }
        catch (e) {
            console.log("getLinkById error")
            res.status(400).json({ message: e.message })
        }
    },
    getLinksByUserId: async (req, res) => {
        try {
            console.log("getLinkById");
           
            const user = await usersModel.findOne({ email: req.decoded.email, password: req.decoded.password })
            //const clicks=link.clicksArr;
            let arrLinksOfUser = [];
            let link;
            for (let i = 0; i < user.linksArr.length; i++) {
                const linkId = user.linksArr[i];
                link = await linksModel.findById(linkId)
                arrLinksOfUser.push(link)

            }
            res.status(200).send(arrLinksOfUser)
        }
        catch (e) {
            console.log("getLinkById error")
            res.status(400).json({ message: e.message })
        }
    },
    
    // updateLink: async (req, res) => {
    //     //const { id } = req.params;
    //     try {
    //         const update_link = await linksModel.findOneAndUpdate({}, req.body, { new: true });
    //         res.json(update_link)
    //     }
    //     catch (e) {
    //         res.status(400).json({ message: e.message })
    //     }
    // },
     
    deleteLink: async (req, res) => {
        const { originalUrl, newUrl } = req.body
        console.log(originalUrl);
        console.log(req.decoded);
        try {
            const user = await usersModel.findOne({ email: req.decoded.email, password: req.decoded.password })
            console.log(user);
            const delete_link = await linksModel.findOneAndDelete({ originalUrl: originalUrl, newUrl: newUrl });
            console.log(delete_link);
            if (delete_link != null) {
                const u = await usersModel.findByIdAndUpdate(user._id, { $pull: { linksArr: delete_link._id } })
                u.save()
                //console.log(u);
                res.json(delete_link)
            }
            else {
                res.json("no such link")
            }

        }
        catch (e) {
            console.log(e + " e");
            res.status(400).json({ message: e.message })
        }
    },
    
    redirection: async (req, res) => {

        try {
            const { t } = req.query
            console.log("t " + t);
            const { shortUrl } = req.params
            console.log("shortUrl:" + shortUrl);
            const link = await linksModel.findOne({ newUrl: shortUrl })
            console.log(link);
            const filterTargets=link.targetValuesArr.filter(tar=>tar.value==t)
            console.log(filterTargets);
            if (link !=null&&filterTargets.length>0) {
                const clicks = link.clicksArr
                if (clicks.length == 0) {
                    console.log(clicks.length);
                    clicks.push({ id: 1, clickDate: Date.now(), ipAddress: req.socket.localAddress, targetParamValue: t })
                    link.save()
                    //res.json(clicks)
                    res.redirect(link.originalUrl)
                }
                else {
                    const len = clicks[clicks.length - 1].id
                    console.log("len " + len);
                    clicks.push({
                        id: len + 1, clickDate: Date.now(), ipAddress: req.socket.localAddress,
                        targetParamValue: t
                    })
                    link.save()
                    //res.json(clicks)
                    res.redirect(link.originalUrl)
                }
                
            }
            else{
                 res.status(404).json({ message: 'URL not found' });
            }

        
        }
        catch (error) {
            console.log("eee");
            res.status(400).json({ message: error.message })
        }

    }

}

export default linkController
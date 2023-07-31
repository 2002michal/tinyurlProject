//הפונקציה מחזירה מערך שמראה לכל פלטפורמה כמה קליקים היו
import usersModel from '../Models/users.js';
import linksModel from '../Models/links.js'

const logiFunc = {

    getLinkByPlatforms: async (req, res) => {
        //מסתמכת כאן שיד לינק הוא של אותו משתשמש
        const { email, password } = req.decoded
        const { newUrl } = req.params;//jwt
        //const user = await usersModel.findById(idUser)
        const link = await linksModel.findOne({ newUrl: newUrl })
        //console.log(link);
        //כאן בודקים האם יש למשתמש הזה כזה לינק
        if (link == null) {
            res.status(400).send({ message: "no link" })
        }
        else {
            const user = await usersModel.findOne({ email: email, password: password })
            console.log(user);
            const arrLinks = user.linksArr
            console.log(arrLinks);
            const url = arrLinks.filter(l => l.equals(link._id))
            const arrByPlatforms = []
            let cnt = 0;
            for (let i = 0; i < link.targetValuesArr.length; i++) {
                cnt = 0;
                for (let j = 0; j < link.clicksArr.length; j++) {
                    if (link.targetValuesArr[i].value === link.clicksArr[j].targetParamValue) {
                        cnt++;

                    }
                }
                arrByPlatforms.push({ platform: link.targetValuesArr[i].value, count: cnt })
            }
            console.log("arrByPlatforms" + arrByPlatforms);
            res.status(200).send(arrByPlatforms)

        }
    },
    
    getLinkByMonth: async (req, res) => {
        const { newUrl } = req.params;
        //const user = await usersModel.findById(idUser)
        const link = await linksModel.findOne({ newUrl: newUrl })
        console.log(link);
        const arrByMonth = new Array(13).fill(0)

        for (let i = 0; i < link.clicksArr.length; i++) {
            const month = link.clicksArr[i].clickDate.getMonth()
            arrByMonth[month] += 1
            //console.log(arrByMonth[link.clicksArr[i].clickDate.getMonth()]);
        }
        console.log(arrByMonth);
        res.json(arrByMonth)
    },
    
    //פונקציה זאת מחזירה אמת אם הקישור שנשלח קיים אצל אותו משתמש אחרת מחזירה שקר
    getLinksByUserId: async (user, originalUrl) => {
        try {
            console.log("hi " + user, originalUrl);
            let arrLinksOfUser = [];
            let link;
            let linkId;
            for (let i = 0; i < user.linksArr.length; i++) {
                linkId = user.linksArr[i];
                link = await linksModel.findById(linkId)
                console.log(link);
                arrLinksOfUser.push(link)
            }
            for (let i = 0; i < arrLinksOfUser.length; i++) {
                if (arrLinksOfUser[i].originalUrl === originalUrl) {
                    return true;
                }
            }

            return false
        }
        catch (e) {
            console.log("getLinkById error" + e.message)
            return false
        }
    }
}
export default logiFunc
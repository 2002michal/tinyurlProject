import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
    // id:{
    //     type:Number,
    //     require:true,
    // },
    originalUrl:{
        type:String
    },
    "newUrl":String,
    clicksArr:[{
        id:{
           type:Number
        },
        clickDate:{
             type:Date
        },
        ipAddress:{
            type:String
        },
        //הערך שנמצא במערך
        targetParamValue:{
            type:Number
        }
    }],        
    //זה query
    targetParamName:{
        type:String
    },
    targetValuesArr:[{
        id:{
            type:Number
        },
        name:{
            type:String
        },
        //הערך של ה query
        value:{
            type:Number
        }
    }]
})

export default mongoose.model("links",LinkSchema)
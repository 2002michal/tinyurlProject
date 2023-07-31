import mongoose from "mongoose";



const UserSchema = mongoose.Schema({
  
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    linksArr:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"links"
    }]
});

export default mongoose.model("users",UserSchema)
import mongoose from "mongoose";

//const uri=`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@project2.aymns0l.mongodb.net/TinyUrlDB?retryWrites=true&w=majority`;
const uri=`mongodb+srv://089michal:Mm0548517089@project2.aymns0l.mongodb.net/TinyUrlDB?retryWrites=true&w=majority`;

const connectDB = async()=>{
    await mongoose.connect(uri);
}


const database=mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
});

database.once('connected',()=>{
    console.log('database connected');
})

export default connectDB
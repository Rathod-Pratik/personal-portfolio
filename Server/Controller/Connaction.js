import mongoose from "mongoose";

export function ConnectToMongoDB(url){
    return mongoose.connect(url).then(()=>{
        console.log("Connect to MongoDB")
    })
}
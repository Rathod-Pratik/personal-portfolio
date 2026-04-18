import mongoose from "mongoose";

const languageSchema=new mongoose.Schema({
    language:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true  
    }
},{
    timestamps:true
})

export const languageModel=mongoose.model('languages',languageSchema)
import mongoose from "mongoose";

const ContactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
})

export const contactModel=mongoose.model('contact',ContactSchema);
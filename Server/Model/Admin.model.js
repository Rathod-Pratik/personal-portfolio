import mongoose from "mongoose";

const AdminSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    number:{
        type:String,
    },
},{
    timestamps:true
})

export const AdminModel=mongoose.model('user',AdminSchema)
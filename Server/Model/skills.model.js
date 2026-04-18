import mongoose from "mongoose";

const skillSchema=new mongoose.Schema({
    language:{
        type:String,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const SkillsModel=mongoose.model('skills',skillSchema);


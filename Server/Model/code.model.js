import mongoose from "mongoose";

const codeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    Codefile_url:{
        type:String,
        required:true
    },
    language:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'languages',
        required:true
    },
    Details:{
        type:[String],
        required:true,
    },
    output:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },

},{
    timestamps:true,
})

export const CodeModel=mongoose.model('code',codeSchema);
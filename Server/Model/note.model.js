import mongoose from "mongoose";

const notesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    note_image_url:{
        type:String,
        required:true
    },
    note_pdf_url:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

export const NoteModel=mongoose.model('notes',notesSchema);
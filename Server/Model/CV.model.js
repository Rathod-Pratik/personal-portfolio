import mongoose from 'mongoose'

const CvSchema=new mongoose.Schema({
    CV:{
        type:String,
        required:true
    }
})
export const CVmodel=mongoose.model('CV',CvSchema)
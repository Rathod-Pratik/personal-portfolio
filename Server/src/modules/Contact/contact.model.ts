import mongoose, { type HydratedDocument } from "mongoose";
import type { IContact } from "@type";

const ContactSchema = new mongoose.Schema<IContact>({
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

export type ContactDocument = HydratedDocument<IContact>;

export const contactModel = mongoose.model<IContact>('contact', ContactSchema);
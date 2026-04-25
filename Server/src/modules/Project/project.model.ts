import mongoose, { type HydratedDocument } from "mongoose";
import type { IProject } from '@type';

const projectSchema = new mongoose.Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String], 
      required: true,
    },
    features: {
      type: [String], 
    },
    liveDemoLink: {
      type: String,
    },
    difficult:{
      type: String,
    },
    images: {
      type: String, 
    },
  },
  { timestamps: true }
);

export type ProjectDocument = HydratedDocument<IProject>;

export const Project = mongoose.model<IProject>("Project", projectSchema);

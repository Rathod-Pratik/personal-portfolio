import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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
      type: [String], // e.g. ["React", "Node.js", "MongoDB"]
      required: true,
    },
    features: {
      type: [String], // list of key features
    },
    githubLink: {
      type: String,
    },
    liveDemoLink: {
      type: String,
    },
    difficult:{
      type: String,
    },
    images: {
      type: String, // URLs of screenshots or uploads
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);

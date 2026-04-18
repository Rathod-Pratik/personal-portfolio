import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ExperienceModel = mongoose.model("experience", experienceSchema);

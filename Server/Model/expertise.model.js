import mongoose from "mongoose";

const expertiseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true,
  },
);

export const ExpertiseModel = mongoose.model("expertise", expertiseSchema);

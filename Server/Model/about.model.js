import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      default: "Hi! I'm **Rathod Pratik**, a passionate web developer...",
    },
  },
  {
    timestamps: true,
  },
);

export const AboutModel = mongoose.model("about", aboutSchema);

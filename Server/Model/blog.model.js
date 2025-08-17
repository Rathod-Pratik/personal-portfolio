import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "" },
    tags: { type: [String], default: [] },
    author: { type: String, default: "Admin" },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const blogModel=mongoose.model("Blog", blogSchema);
export default blogModel;

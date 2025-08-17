import blogModel from "../Model/blog.model.js";
import { deleteFile } from "./Notes.controller.js";

// Create a blog post
export const createBlog = async (req, res) => {
  try {
    const { title, slug, excerpt, content, coverImage, tags, isPublished } =
      req.body;

    const blog = await blogModel.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      isPublished,
    });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.status(200).json({ blog: blogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: error.message });
  }
};

// Get a single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating blog",
      error: error.message,
    });
  }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    const Codefile = await blogModel.findOne({ _id: req.params.id });
    try {
      await deleteFile(Codefile.coverImage);
    } catch (error) {
      console.error(error);
    }

    const deletedBlog = await blogModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

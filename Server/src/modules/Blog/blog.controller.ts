import blogModel from './blog.model.ts';
import { deleteFile } from '@utils';
import type { Request, Response } from 'express';
import type {
  BlogIdParams,
  CreateBlogRequestBody,
  UpdateBlogRequestBody,
} from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

// Create a blog post
export const createBlog = async (
  req: Request<Record<string, never>, unknown, CreateBlogRequestBody>,
  res: Response,
) => {
  try {
    const { title, slug, excerpt, content, coverImage, tags, isPublished } =
      req.body;

    if (!title || !slug || !excerpt || !content || !coverImage) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

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
      .json({ message: "Error creating blog", error: toErrorMessage(error) });
  }
};

// Get all blogs
export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.status(200).json({ blog: blogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: toErrorMessage(error) });
  }
};

// Get a single blog by slug
export const getBlogBySlug = async (
  req: Request<BlogIdParams>,
  res: Response,
) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: toErrorMessage(error) });
  }
};

// Update a blog post
export const updateBlog = async (
  req: Request<BlogIdParams, unknown, UpdateBlogRequestBody>,
  res: Response,
) => {
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
      error: toErrorMessage(error),
    });
  }
};

// Delete a blog post
export const deleteBlog = async (
  req: Request<BlogIdParams>,
  res: Response,
) => {
  try {
    const codefile = await blogModel.findOne({ _id: req.params.id });

    if (!codefile) {
      return res.status(404).json({ message: "Blog not found" });
    }

    try {
      if (codefile.coverImage) {
        await deleteFile(codefile.coverImage);
      }
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
      .json({ message: "Error deleting blog", error: toErrorMessage(error) });
  }
};

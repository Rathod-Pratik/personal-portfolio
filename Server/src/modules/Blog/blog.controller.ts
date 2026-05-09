import blogModel from './blog.model.ts';
import { Get_Signed_Url, deleteFile, uploadFileToS3 } from '@utils';
import type { Request, Response } from 'express';
import type {
  CreateBlogRequestBody,
  UpdateBlogRequestBody,
} from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const getUploadedFile = (req: Request) => {
  const files = req.files as
    | {
        file?: Express.Multer.File[];
        image?: Express.Multer.File[];
      }
    | undefined;

  return files?.image?.[0] ?? files?.file?.[0] ?? req.file ?? null;
};

const signBlogCoverImage = async <T extends { coverImage?: string }>(blog: T) => {
  if (blog.coverImage && typeof blog.coverImage === 'string' && !blog.coverImage.startsWith('http')) {
    try {
      const signed = await Get_Signed_Url({ key: blog.coverImage });
      if (signed?.url) {
        return { ...blog, coverImage: signed.url };
      }
    } catch (error) {
      console.error('Failed to sign blog cover image', error);
    }
  }

  return blog;
};

export const createBlog = async (
  req: Request<Record<string, never>, unknown, CreateBlogRequestBody>,
  res: Response,
) => {
  try {
    const { title, slug, excerpt, content, tags, isPublished } = req.body;
    const file = getUploadedFile(req);

    if (!title || !slug || !excerpt || !content) {
      return res.status(400).json({ message: "Title, slug, excerpt, and content are required" });
    }

    if (!file) {
      return res.status(400).json({ message: "Cover image file is required" });
    }

    // Upload image to S3 in Blog directory
    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: "Blog",
    });

    const blog = await blogModel.create({
      title,
      slug,
      excerpt,
      content,
      coverImage: uploadedFile.key, // Store the S3 key
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
    const signedBlogs = await Promise.all(blogs.map((blog) => signBlogCoverImage(blog.toObject ? blog.toObject() : blog)));
    res.status(200).json({ blog: signedBlogs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: toErrorMessage(error) });
  }
};

// Get a single blog by slug
export const getBlogBySlug = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const blog = await blogModel.findOne({ _id: id });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    const signedBlog = await signBlogCoverImage(blog.toObject ? blog.toObject() : blog);
    res.status(200).json(signedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: toErrorMessage(error) });
  }
};

// Update a blog post
export const updateBlog = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const file = getUploadedFile(req);
    const updateData = { ...req.body };

    // If a new image is provided, upload it and use the S3 key
    if (file) {
      const uploadedFile = await uploadFileToS3({
        buffer: file.buffer,
        fileName: file.originalname,
        fileType: file.mimetype,
        folderType: "Blog",
      });
      updateData.coverImage = uploadedFile.key;

      // Delete old image if it exists
      const oldBlog = await blogModel.findOne({ _id: id });
      if (oldBlog?.coverImage) {
        try {
          await deleteFile(oldBlog.coverImage);
        } catch (error) {
          console.error("Error deleting old blog cover image:", error);
        }
      }
    }

    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: id },
      updateData,
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
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const codefile = await blogModel.findOne({ _id: id });

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
      _id: id,
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

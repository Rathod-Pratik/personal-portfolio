import { ExpertiseModel } from './expertise.model.ts';
import type { Request, Response } from 'express';
import type {
  CreateExperticeRequestBody,
  UpdateExperticeRequestBody,
} from '@type';
import { Get_Signed_Url, deleteFile, uploadFileToS3 } from '@utils';

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

// Create Expertise
export const createExpertise = async (
  req: Request,
  res: Response,
) => {
  try {
    const { title, description, linkTo } = req.body;
    const file = getUploadedFile(req);

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to S3 in Expertise directory
    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: "Expertise",
    });

    const newExpertise = new ExpertiseModel({
      title,
      description,
      image: uploadedFile.key, // Store the S3 key
      linkTo: linkTo || "#",
    });

    await newExpertise.save();
    return res.status(201).json({
      message: "Expertise created successfully",
      expertise: newExpertise,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Get All Expertise
export const getExpertise = async (_req: Request, res: Response) => {
  try {
    const expertiseList = await ExpertiseModel.find().sort({ createdAt: 1 });

    // convert image keys to signed URLs where necessary
    const converted = await Promise.all(
      expertiseList.map(async (item) => {
        const obj = item.toObject ? item.toObject() : item;
        try {
          const img = obj.image;
          if (img && typeof img === 'string' && !img.startsWith('http')) {
            const signed = await Get_Signed_Url({ key: img });
            if (signed && signed.url) obj.image = signed.url;
          }
        } catch (err) {
          console.error('Failed to sign expertise image', err);
        }
        return obj;
      }),
    );

    return res.status(200).json(converted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Get Single Expertise
export const getExpertiseById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const expertise = await ExpertiseModel.findById(id);

    if (!expertise) {
      return res.status(404).json({ message: "Expertise not found" });
    }

    // convert image key to signed URL if necessary
    const expertiseObj = expertise.toObject ? expertise.toObject() : expertise;
    try {
      const img = expertiseObj.image;
      if (img && typeof img === 'string' && !img.startsWith('http')) {
        const signed = await Get_Signed_Url({ key: img });
        if (signed && signed.url) expertiseObj.image = signed.url;
      }
    } catch (err) {
      console.error('Failed to sign expertise image', err);
    }

    return res.status(200).json(expertiseObj);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Update Expertise
export const updateExpertise = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const { title, description, linkTo } = req.body;
    const file = getUploadedFile(req);
    const updateData: Record<string, any> = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (linkTo) updateData.linkTo = linkTo;

    // If a new image is provided, upload it and use the S3 key
    if (file) {
      const uploadedFile = await uploadFileToS3({
        buffer: file.buffer,
        fileName: file.originalname,
        fileType: file.mimetype,
        folderType: "Expertise",
      });
      updateData.image = uploadedFile.key;

      // Delete old image if it exists
      const oldExpertise = await ExpertiseModel.findById(id);
      if (oldExpertise?.image) {
        try {
          await deleteFile(oldExpertise.image);
        } catch (error) {
          console.error("Error deleting old expertise image:", error);
        }
      }
    }

    const expertise = await ExpertiseModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!expertise) {
      return res.status(404).json({ message: "Expertise not found" });
    }

    return res
      .status(200)
      .json({ message: "Expertise updated successfully", expertise });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Delete Expertise
export const deleteExpertise = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const expertise = await ExpertiseModel.findByIdAndDelete(id);

    if (!expertise) {
      return res.status(404).json({ message: "Expertise not found" });
    }

    // Delete image from S3
    if (expertise.image) {
      try {
        await deleteFile(expertise.image);
      } catch (error) {
        console.error("Error deleting expertise image:", error);
      }
    }

    return res.status(200).json({ message: "Expertise deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

import { CVmodel } from './Resume.model.ts';
import { deleteFile, uploadFileToS3 } from '@utils';
import type { Request, Response } from 'express';
import type { AddCVRequestBody, UpdateCVRequestBody } from '@type';

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

  return files?.file?.[0] ?? files?.image?.[0] ?? req.file ?? null;
};

const signResumeUrl = async <T extends { CV?: string }>(resume: T) => {
  if (resume.CV && typeof resume.CV === 'string' && !resume.CV.startsWith('http')) {
    try {
      const { Get_Signed_Url } = await import('@utils');
      const signed = await Get_Signed_Url({ key: resume.CV });
      if (signed?.url) {
        return { ...resume, CV: signed.url };
      }
    } catch (error) {
      console.error('Failed to sign resume url', error);
    }
  }

  return resume;
};

export const AddCV = async (
  req: Request,
  res: Response,
) => {
  try {
    const file = getUploadedFile(req);

    if (!file) {
      return res.status(400).send("CV file is required");
    }

    // Upload CV to S3
    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: "Resume",
    });

    const cv = await CVmodel.create({ CV: uploadedFile.key });

    if (cv) {
      return res.status(200).json({ success: true, data: cv });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};
export const UpdateCV = async (
  req: Request,
  res: Response,
) => {
  try {
    const { _id } = req.body as { _id: string };
    const file = getUploadedFile(req);
    
    // Validate input
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "_id is required"
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "CV file is required"
      });
    }

    // Find the existing CV
    const existingCV = await CVmodel.findById(_id);
    if (!existingCV) {
      return res.status(404).json({
        success: false,
        message: "CV not found"
      });
    }

    // Upload new CV to S3
    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: "Resume",
    });

    // Delete old CV file from S3
    try {
      await deleteFile(existingCV.CV);
    } catch (deleteError) {
      console.error("Error deleting old CV file:", deleteError);
      // Continue even if deletion fails, but log the error
    }

    // Update the CV record
    const updatedCV = await CVmodel.findByIdAndUpdate(
      _id,
      { CV: uploadedFile.key },
      { new: true, runValidators: true }
    );

    if (!updatedCV) {
      return res.status(400).json({
        success: false,
        message: "Failed to update CV"
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedCV
    });

  } catch (error) {
    console.error("Error in UpdateCV:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: toErrorMessage(error)
    });
  }
};
export const GetCV = async (_req: Request, res: Response) => {
  try {
    const cv =await CVmodel.find();
    const signedCv = await Promise.all(cv.map((item) => signResumeUrl(item.toObject ? item.toObject() : item)));
    return res.status(200).json({ success: true, data: signedCv });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};

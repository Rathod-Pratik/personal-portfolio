import type { Request, Response } from "express";
import { deleteFile, uploadFileToS3 } from "@utils";
import type {
  DeleteImageRequestBody,
  UpdateImageRequestBody,
  UploadFileResponse,
} from "@type";

const getUploadedFile = (req: Request) => {
  const files = req.files as
    | {
        file?: Express.Multer.File[];
        image?: Express.Multer.File[];
      }
    | undefined;

  return files?.file?.[0] ?? files?.image?.[0] ?? req.file ?? null;
};

export const uploadImage = async (
  req: Request<Record<string, never>, UploadFileResponse | { error: string }>,
  res: Response<UploadFileResponse | { error: string }>,
) => {
  try {
    const file = getUploadedFile(req);
    const { folderType, directoryName } = req.body as {
      folderType?: string;
      directoryName?: string;
    };

    if (!file) {
      return res.status(400).json({ error: "file is required" });
    }

    if (!folderType) {
      return res.status(400).json({ error: "folderType is required" });
    }

    const finalFolderType = directoryName
      ? `${folderType}/${directoryName}`
      : folderType;

    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: finalFolderType,
    });

    return res.status(201).json(uploadedFile);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload file";
    console.error("Upload image error:", error);
    return res.status(500).json({ error: message });
  }
};

export const deleteImage = async (
  req: Request<Record<string, never>, { message: string } | { error: string }, DeleteImageRequestBody>,
  res: Response<{ message: string } | { error: string }>,
) => {
  try {
    const { fileUrl, key } = req.body;

    if (!fileUrl && !key) {
      return res.status(400).json({ error: "fileUrl or key is required" });
    }

    await deleteFile(fileUrl ?? key ?? "");

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete file";
    console.error("Delete image error:", error);
    return res.status(500).json({ error: message });
  }
};

export const updateImage = async (
  req: Request<Record<string, never>, UploadFileResponse | { error: string }, UpdateImageRequestBody>,
  res: Response<UploadFileResponse | { error: string }>,
) => {
  try {
    const file = getUploadedFile(req);
    const { folderType, oldFileUrl, oldKey, directoryName } = req.body as UpdateImageRequestBody & {
      directoryName?: string;
    };

    if (!file) {
      return res.status(400).json({ error: "file is required" });
    }

    if (!folderType) {
      return res.status(400).json({ error: "folderType is required" });
    }

    if (!oldFileUrl && !oldKey) {
      return res.status(400).json({ error: "oldFileUrl or oldKey is required" });
    }

    const finalFolderType = directoryName
      ? `${folderType}/${directoryName}`
      : folderType;

    const uploadedFile = await uploadFileToS3({
      buffer: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
      folderType: finalFolderType,
    });

    await deleteFile(oldFileUrl ?? oldKey ?? "");

    return res.status(200).json(uploadedFile);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update file";
    console.error("Update image error:", error);
    return res.status(500).json({ error: message });
  }
};

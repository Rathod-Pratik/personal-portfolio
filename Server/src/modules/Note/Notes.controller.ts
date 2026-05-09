import { NoteModel } from './note.model.ts';
import { Get_Signed_Url, deleteFile, uploadFileToS3 } from '@utils';
import type { Request, Response } from 'express';
import type {
  UpdateNoteData,
} from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const getUploadedFiles = (req: Request) => {
  const files = req.files as
    | {
      file?: Express.Multer.File[];
      image?: Express.Multer.File[];
    }
    | undefined;

  return {
    imageFile: files?.image?.[0] ?? null,
    pdfFile: files?.file?.[0] ?? null,
  };
};

const signNoteAssets = async <T extends { note_image_url?: string; note_pdf_url?: string }>(note: T) => {
  const signedNote = { ...note };

  if (signedNote.note_image_url && typeof signedNote.note_image_url === 'string' && !signedNote.note_image_url.startsWith('http')) {
    try {
      const signedImage = await Get_Signed_Url({ key: signedNote.note_image_url });
      if (signedImage?.url) {
        signedNote.note_image_url = signedImage.url;
      }
    } catch (error) {
      console.error('Failed to sign note image', error);
    }
  }

  if (signedNote.note_pdf_url && typeof signedNote.note_pdf_url === 'string' && !signedNote.note_pdf_url.startsWith('http')) {
    try {
      const signedPdf = await Get_Signed_Url({ key: signedNote.note_pdf_url });
      if (signedPdf?.url) {
        signedNote.note_pdf_url = signedPdf.url;
      }
    } catch (error) {
      console.error('Failed to sign note pdf', error);
    }
  }

  return signedNote;
};

export const CreateNote = async (
  req: Request,
  res: Response,
) => {
  try {
    const { title, description } = req.body;
    const { imageFile, pdfFile } = getUploadedFiles(req);

    if (!title || !description) {
      return res.status(400).send("Title and description are required");
    }

    if (!imageFile) {
      return res.status(400).send("Image file is required");
    }

    if (!pdfFile) {
      return res.status(400).send("PDF file is required");
    }

    // Upload image to S3
    const uploadedImage = await uploadFileToS3({
      buffer: imageFile.buffer,
      fileName: imageFile.originalname,
      fileType: imageFile.mimetype,
      folderType: "Note",
    });

    // Upload PDF to S3
    const uploadedPdf = await uploadFileToS3({
      buffer: pdfFile.buffer,
      fileName: pdfFile.originalname,
      fileType: pdfFile.mimetype,
      folderType: "Note",
    });

    const note = await NoteModel.create({
      title,
      description,
      note_image_url: uploadedImage.key,
      note_pdf_url: uploadedPdf.key,
    });

    if (note) {
      return res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};

export const EditNote = async (
  req: Request,
  res: Response,
) => {
  try {
    const { _id, title, description } = req.body;
    const { imageFile, pdfFile } = getUploadedFiles(req);

    if (!_id) {
      return res.status(400).json({ success: false, message: "_id is required" });
    }

    const notes = await NoteModel.findById(_id);

    if (!notes) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    const EditData: UpdateNoteData = {};
    if (title) EditData.title = title;
    if (description) EditData.description = description;

    // Handle PDF upload
    if (pdfFile) {
      const uploadedPdf = await uploadFileToS3({
        buffer: pdfFile.buffer,
        fileName: pdfFile.originalname,
        fileType: pdfFile.mimetype,
        folderType: "Note",
      });
      // Delete old PDF
      if (notes.note_pdf_url) {
        try {
          await deleteFile(notes.note_pdf_url);
        } catch (error) {
          console.error("Error deleting old PDF:", error);
        }
      }
      EditData.note_pdf_url = uploadedPdf.key;
    }

    // Handle image upload
    if (imageFile) {
      const uploadedImage = await uploadFileToS3({
        buffer: imageFile.buffer,
        fileName: imageFile.originalname,
        fileType: imageFile.mimetype,
        folderType: "Note",
      });
      // Delete old image
      if (notes.note_image_url) {
        try {
          await deleteFile(notes.note_image_url);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }
      EditData.note_image_url = uploadedImage.key;
    }

    const note = await NoteModel.findByIdAndUpdate(_id, EditData, {
      new: true,
    });

    if (note) {
      return res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};
export const GetNote = async (_req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find();

    if (notes && notes.length > 0) {
      // Sign both image and PDF URLs in parallel for all notes
      const signedNotes = await Promise.all(
        notes.map((note) => signNoteAssets(note.toObject()))
      );
      return res.status(200).json({ success: true, data: signedNotes });
    }

    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};

export const DeleteNote = async (
  req: Request,
  res: Response,
) => {
  try {
    const { _id } = req.params as { _id: string };

    const note = await NoteModel.findById(_id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    // Delete files from S3 if URLs exist
    if (note.note_image_url) {
      try {
        await deleteFile(note.note_image_url);
      } catch (error) {
        console.error("Error deleting note image from S3:", error);
      }
    }

    if (note.note_pdf_url) {
      try {
        await deleteFile(note.note_pdf_url);
      } catch (error) {
        console.error("Error deleting note PDF from S3:", error);
      }
    }

    // Now delete the note from database
    await NoteModel.findByIdAndDelete(_id);

    return res
      .status(200)
      .json({ success: true, data: "Notes deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: toErrorMessage(error),
    });
  }
};



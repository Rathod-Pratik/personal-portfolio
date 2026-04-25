import { NoteModel } from './note.model.ts';
import { deleteFile } from '@utils';
import type { Request, Response } from 'express';
import type {
  CreateNoteRequestBody,
  DeleteNoteRequestParams,
  EditNoteRequestBody,
  UpdateNoteData,
} from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

export const CreateNote = async (
  req: Request<Record<string, never>, unknown, CreateNoteRequestBody>,
  res: Response,
) => {
  try {
    const { title, description, fileUrl, imageUrl } = req.body;
    if (!title || !description || !fileUrl || !imageUrl) {
      return res.status(400).send("All the fields are required");
    }

    const note = await NoteModel.create({
      title,
      description,
      note_image_url: imageUrl,
      note_pdf_url: fileUrl,
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
  req: Request<Record<string, never>, unknown, EditNoteRequestBody>,
  res: Response,
) => {
  try {
    const { _id, title, description, imageUrl, fileUrl } = req.body;

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
    if (fileUrl) {
      await deleteFile(notes.note_pdf_url);
      EditData.note_pdf_url = fileUrl;
    }
    if (imageUrl) {
      await deleteFile(notes.note_image_url);
      EditData.note_image_url = imageUrl;
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
    const note = await NoteModel.find();

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

export const DeleteNote = async (
  req: Request<DeleteNoteRequestParams>,
  res: Response,
) => {
  try {
    const { _id } = req.params;

    const note = await NoteModel.findById(_id);

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    // Delete files from S3 if URLs exist
    if (note.note_image_url) {
      await deleteFile(note.note_image_url);
    }

    if (note.note_pdf_url) {
      await deleteFile(note.note_pdf_url);
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



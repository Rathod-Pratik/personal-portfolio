import { NoteModel } from "../Model/note.model.js";
import AWS from "aws-sdk";

import dotenv from "dotenv";
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

export const CreateNote = async (req, res) => {
  try {
    const { title, description, fileUrl, imageUrl } = req.body;
    if (!title || !description) {
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
      message: error,
    });
  }
};

export const EditNote = async (req, res) => {
  try {
    const { _id, title, description, imageUrl, fileUrl } = req.body;

    const notes=await NoteModel.findById(_id)

    const EditData = {};
    if (title) EditData.title = title;
    if (description) EditData.description = description;
    if (fileUrl) {
      await deleteFile(notes.note_pdf_url)
      EditData.note_pdf_url = fileUrl;
    }
    if (imageUrl) {
      await deleteFile(notes.note_image_url)
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
      message: error,
    });
  }
};
export const GetNote = async (req, res) => {
  try {
    const note = await NoteModel.find();

    if (note) {
      return res.status(200).json({ success: true, data: note });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const DeleteNote = async (req, res) => {
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
      message: "Server error while deleting note",
    });
  }
};

// Helper function to delete a file from S3
export const deleteFile = async (fileUrl) => {
  if (!fileUrl) {
    console.warn("No file URL provided for deletion");
    return;
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: extractKeyFromUrl(fileUrl),
  };

  if (params.Key) {
    await s3.deleteObject(params).promise();
  } else {
    console.warn("Invalid file key extracted, skipping S3 delete.");
  }
};

// Helper function to extract S3 key from the URL
const extractKeyFromUrl = (url) => {
  if (!url || typeof url !== "string") {
    console.error("Invalid URL passed to extractKeyFromUrl:", url);
    return null;
  }

  const parts = url.split(".com/");
  return parts.length > 1 ? parts[1] : null;
};

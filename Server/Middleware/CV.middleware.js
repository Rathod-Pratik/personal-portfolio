import streamifier from "streamifier";
import cloudinary from "./Cloudinary.config.js";

const streamUpload = (buffer, resourceType = "raw", folder = "") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: folder,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadFile = async (req, res, next) => {
  try {
    const fileBuffer = req.files?.file?.[0]?.buffer;

    if (!fileBuffer) {
      return res.status(400).json({ error: "file is required" });
    }

    // Upload file to projectFiles folder
    const fileResult = await streamUpload(fileBuffer, "raw", "Portfolio/CV");

    req.uploadedFiles = {
      fileUrl: fileResult.secure_url,
      fileId: fileResult.public_id,
    };

    next();
  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ error: "File/Image upload failed" });
  }
};

export const UpdateFile = async (req, res, next) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(400).json({ error: "Note ID is required" });
    }

    const note = await NoteModel.findById(_id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const fileBuffer = req.files?.file?.[0]?.buffer;

    req.uploadedFiles = {};

    if (fileBuffer) {
      const result = await cloudinary.uploader.destroy(note.fileId, {
        resource_type: "raw",
      });
      const fileResult = await streamUpload(
        fileBuffer,
        "raw",
        "Portfolio/CV"
      );
      req.uploadedFiles.fileUrl = fileResult.secure_url;
      req.uploadedFiles.fileId = fileResult.public_id;
    }
    next();
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ error: "File/Image update failed" });
  }
};

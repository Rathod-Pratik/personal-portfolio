import streamifier from "streamifier";
import cloudinary from "./Cloudinary.config.js";
import {Project} from "../Model/project.model.js";

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

const deleteCloudinaryFile = async (publicId, resourceType = "raw") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    throw new Error("Cloudinary deletion failed");
  }
};


// 🧠 Middleware to handle both
export const uploadImage = async (req, res, next) => {
  try {
    const imageBuffer = req.files?.image?.[0]?.buffer;

    if (!imageBuffer) {
      return res
        .status(400)
        .json({ error: "image is required" });
    }

    // Upload image to projectImages folder
    const imageResult = await streamUpload(
      imageBuffer,
      "image",
      "Portfolio/Project_image"
    );

    req.uploadedFiles = {
      imageUrl: imageResult.secure_url,
      imageId: imageResult.public_id,
    };

    next();
  } catch (err) {
    console.error("Upload Error:", err.message);
    res.status(500).json({ error: "File/Image upload failed" });
  }
};

// Updated UpdateImageAndFile middleware
export const UpdateImageAndFile = async (req, res, next) => {
    try {
      const imageBuffer = req.files?.image?.[0]?.buffer;
      if(!imageBuffer){
        next();
      }
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ error: "Note ID is required" });
      }
  
      const note = await NoteModel.findById(_id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      await deleteCloudinaryFile(note.imageId, "image");
  
  
        const imageResult = await streamUpload(
          imageBuffer,  // Fixed: was fileBuffer
          "image",      // Fixed: was "raw"
          "Portfolio/note_image"
        );
        req.uploadedFiles.imageUrl = imageResult.secure_url;
        req.uploadedFiles.imageId = imageResult.public_id;
      
  
      next();
    } catch (error) {
      console.error("Update Error:", error.message);
      res.status(500).json({ error: "File/Image update failed" });
    }
  };
  
  // Updated deleteImageAndFile middleware
  export const deleteImageAndFile = async (req, res, next) => {
    try {
      const note = await Project.findById(req.params._id);
      if (!note) return res.status(404).json({ error: "Project not found" });

      if (note.imageId) {
        await deleteCloudinaryFile(note.imageId, "image");
      }
  
      next();
    } catch (error) {
      console.error("Deletion Error:", error.message);
      res.status(500).json({ error: "File/Image deletion failed" });
    }
  };
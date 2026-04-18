import { CVmodel } from "../Model/CV.model.js";
import { deleteFile } from "./Notes.controller.js";

export const AddCV = async (req, res) => {
  try {
    const { CV } = req.body;
    if (!CV) {
      return res.status(400).send("Url of Cv is required");
    }

    const cv = CVmodel.create({ CV });

    if (cv) {
      return res.status(200).json({ success: true, data: cv });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const UpdateCV = async (req, res) => {
  try {
    const { _id, CV } = req.body;
    
    // Validate input
    if (!CV || !_id) {
      return res.status(400).json({
        success: false,
        message: "CV URL and _id are required"
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

    // Delete old CV file from storage
    try {
      await deleteFile(existingCV.CV);
    } catch (deleteError) {
      console.error("Error deleting old CV file:", deleteError);
      // Continue even if deletion fails, but log the error
    }

    // Update the CV record
    const updatedCV = await CVmodel.findByIdAndUpdate(
      _id,
      { CV },
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
      error: error.message
    });
  }
};
export const GetCV = async (req, res) => {
  try {
    const cv =await CVmodel.find();
    return res.status(200).json({ success: true, data: cv });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

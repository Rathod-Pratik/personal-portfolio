import { ExpertiseModel } from "../Model/expertise.model.js";

// Create Expertise
export const createExpertise = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpertise = new ExpertiseModel({
      title,
      description,
      image,
    });

    await newExpertise.save();
    return res.status(201).json({
      message: "Expertise created successfully",
      expertise: newExpertise,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get All Expertise
export const getExpertise = async (req, res) => {
  try {
    const expertiseList = await ExpertiseModel.find().sort({ createdAt: 1 });
    return res.status(200).json(expertiseList);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get Single Expertise
export const getExpertiseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expertise = await ExpertiseModel.findById(id);

    if (!expertise) {
      return res.status(404).json({ message: "Expertise not found" });
    }

    return res.status(200).json(expertise);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update Expertise
export const updateExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const expertise = await ExpertiseModel.findByIdAndUpdate(
      id,
      { title, description, image },
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
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete Expertise
export const deleteExpertise = async (req, res) => {
  try {
    const { id } = req.params;
    const expertise = await ExpertiseModel.findByIdAndDelete(id);

    if (!expertise) {
      return res.status(404).json({ message: "Expertise not found" });
    }

    return res.status(200).json({ message: "Expertise deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

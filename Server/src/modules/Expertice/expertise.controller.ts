import { ExpertiseModel } from './expertise.model.ts';
import type { Request, Response } from 'express';
import type {
  CreateExperticeRequestBody,
  ExperticeIdParams,
  UpdateExperticeRequestBody,
} from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

// Create Expertise
export const createExpertise = async (
  req: Request<Record<string, never>, unknown, CreateExperticeRequestBody>,
  res: Response,
) => {
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
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Get All Expertise
export const getExpertise = async (_req: Request, res: Response) => {
  try {
    const expertiseList = await ExpertiseModel.find().sort({ createdAt: 1 });
    return res.status(200).json(expertiseList);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Get Single Expertise
export const getExpertiseById = async (
  req: Request<ExperticeIdParams>,
  res: Response,
) => {
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
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Update Expertise
export const updateExpertise = async (
  req: Request<ExperticeIdParams, unknown, UpdateExperticeRequestBody>,
  res: Response,
) => {
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
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Delete Expertise
export const deleteExpertise = async (
  req: Request<ExperticeIdParams>,
  res: Response,
) => {
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
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

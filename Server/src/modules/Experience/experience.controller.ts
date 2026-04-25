import { ExperienceModel } from './experience.model.ts';
import type { Request, Response } from 'express';
import type {
  CreateExperienceRequestBody,
  ExperienceIdParams,
  UpdateExperienceRequestBody,
} from '@type';

const toErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

// Create Experience
export const createExperience = async (
  req: Request<Record<string, never>, unknown, CreateExperienceRequestBody>,
  res: Response,
) => {
  try {
    const { year, title, company, description, duration } = req.body;

    if (!year || !title || !company || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExperience = new ExperienceModel({
      year,
      duration,
      title,
      company,
      description,
    });

    await newExperience.save();
    return res.status(201).json({
      message: "Experience created successfully",
      experience: newExperience,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Get All Experiences
export const getExperiences = async (_req: Request, res: Response) => {
  try {
    const experiences = await ExperienceModel.find().sort({ createdAt: -1 });
    return res.status(200).json(experiences);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Get Single Experience
export const getExperienceById = async (
  req: Request<ExperienceIdParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const experience = await ExperienceModel.findById(id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    return res.status(200).json(experience);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Update Experience
export const updateExperience = async (
  req: Request<ExperienceIdParams, unknown, UpdateExperienceRequestBody>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { year, title, company, description, duration } = req.body;

    const experience = await ExperienceModel.findByIdAndUpdate(
      id,
      { year, duration, title, company, description },
      { new: true, runValidators: true },
    );

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    return res
      .status(200)
      .json({ message: "Experience updated successfully", experience });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

// Delete Experience
export const deleteExperience = async (
  req: Request<ExperienceIdParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const experience = await ExperienceModel.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    return res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: toErrorMessage(error) });
  }
};

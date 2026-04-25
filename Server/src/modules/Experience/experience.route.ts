import express from "express";
import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from './experience.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';

const router = express.Router();

router.post("/", checkAdminCookie, createExperience);
router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.put("/:id", checkAdminCookie, updateExperience);
router.delete("/:id", checkAdminCookie, deleteExperience);

export default router;

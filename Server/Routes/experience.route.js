import express from "express";
import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../Controller/experience.controller.js";
import { checkAdminCookie } from "../Middleware/Auth.middleware.js";

const router = express.Router();

router.post("/", checkAdminCookie, createExperience);
router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.put("/:id", checkAdminCookie, updateExperience);
router.delete("/:id", checkAdminCookie, deleteExperience);

export default router;

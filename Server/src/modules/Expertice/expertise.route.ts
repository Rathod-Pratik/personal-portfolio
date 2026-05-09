import express from "express";
import {
  createExpertise,
  getExpertise,
  getExpertiseById,
  updateExpertise,
  deleteExpertise,
} from './expertise.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { uploadFiles } from '../../middlewares/multer.middleware.ts';

const router = express.Router();

router.post("/", uploadFiles, checkAdminCookie, createExpertise);
router.get("/", getExpertise);
router.get("/:id", getExpertiseById);
router.put("/:id", uploadFiles, checkAdminCookie, updateExpertise);
router.delete("/:id", checkAdminCookie, deleteExpertise);

export default router;

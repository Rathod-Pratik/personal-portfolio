import express from "express";
import {
  createExpertise,
  getExpertise,
  getExpertiseById,
  updateExpertise,
  deleteExpertise,
} from "../Controller/expertise.controller.js";
import { checkAdminCookie } from "../Middleware/Auth.middleware.js";

const router = express.Router();

router.post("/", checkAdminCookie, createExpertise);
router.get("/", getExpertise);
router.get("/:id", getExpertiseById);
router.put("/:id", checkAdminCookie, updateExpertise);
router.delete("/:id", checkAdminCookie, deleteExpertise);

export default router;

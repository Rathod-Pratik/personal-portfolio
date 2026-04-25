import express from "express";
import { getAbout, updateAbout } from './about.controller.ts';
import { checkAdminCookie } from '@Middleware/Auth.middleware.ts';

const router = express.Router();

router.get("/", getAbout);
router.put("/", checkAdminCookie, updateAbout);

export default router;

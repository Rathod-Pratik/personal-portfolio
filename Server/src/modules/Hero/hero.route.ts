import express from "express";
import { getHero, updateHero } from './hero.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { uploadFiles } from '../../middlewares/multer.middleware.ts';

const router = express.Router();

router.get("/", getHero);
router.put("/", uploadFiles, checkAdminCookie, updateHero); // Upsert basically

export default router;

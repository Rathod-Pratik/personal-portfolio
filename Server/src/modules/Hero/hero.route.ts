import express from "express";
import { getHero, updateHero } from './hero.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';

const router = express.Router();

router.get("/", getHero);
router.put("/", checkAdminCookie, updateHero); // Upsert basically

export default router;

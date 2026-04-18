import express from "express";
import { getHero, updateHero } from "../Controller/hero.controller.js";
import { checkAdminCookie } from "../Middleware/Auth.middleware.js";

const router = express.Router();

router.get("/", getHero);
router.put("/", checkAdminCookie, updateHero); // Upsert basically

export default router;

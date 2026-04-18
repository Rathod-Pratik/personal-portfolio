import express from "express";
import { getAbout, updateAbout } from "../Controller/about.controller.js";
import { checkAdminCookie } from "../Middleware/Auth.middleware.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", checkAdminCookie, updateAbout);

export default router;

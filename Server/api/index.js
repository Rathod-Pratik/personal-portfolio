import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });
import contactroutes from "../Routes/Contact.route.js";
import NoteRoutes from "../Routes/notes.route.js";
import ProjectRoutes from "../Routes/Project.route.js";
import SkillsRoutes from "../Routes/Skill.route.js";
import AuthRoutes from "../Routes/Auth.route.js";
import CVRoutes from "../Routes/CV.route.js";
import AwsRoutes from "../Routes/aws.route.js";
import BlogRoutes from "../Routes/blog.routes.js";
import StateRoutes from "../Routes/States.routes.js";
import ExperienceRoutes from "../Routes/experience.route.js";
import HeroRoutes from "../Routes/hero.route.js";
import ExpertiseRoutes from "../Routes/expertise.route.js";
import AboutRoutes from "../Routes/about.route.js";

import cookieParser from "cookie-parser";

import { ConnectToMongoDB } from "../Controller/Connaction.js";
const app = express();
app.use(cookieParser());
app.use(
  cors({
    sameSite: "None",
    origin: process.env.FRONTED,
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  }),
);

ConnectToMongoDB(process.env.Database);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Backend is up");
});

app.use("/contact", contactroutes);
app.use("/note", NoteRoutes);
app.use("/auth", AuthRoutes);
app.use("/CV", CVRoutes);
app.use("/s3", AwsRoutes);
app.use("/project", ProjectRoutes);
app.use("/skills", SkillsRoutes);
app.use("/blogs", BlogRoutes);
app.use("/states", StateRoutes);
app.use("/experiences", ExperienceRoutes);
app.use("/hero", HeroRoutes);
app.use("/expertise", ExpertiseRoutes);
app.use("/about", AboutRoutes);

app.get("/auth/check", (req, res) => {
  const token = req.cookies.admin;

  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    res.json({ authenticated: true, user: decoded });
  } catch (err) {
    console.error("JWT verify failed:", err.message);
    res.status(401).json({ authenticated: false });
  }
});

export default app;

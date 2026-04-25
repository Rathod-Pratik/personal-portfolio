import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });

import contactroutes from '@modules/Contact/Contact.route.ts';
import NoteRoutes from '@modules/Note/notes.route.ts';
import ProjectRoutes from '@modules/Project/Project.route.ts';
import SkillsRoutes from '@modules/Skill/Skill.route.ts';
import AuthRoutes from '@modules/Auth/Auth.route.ts';
import CVRoutes from '@modules/Resume/Resume.route.ts';
import AwsRoutes from '@modules/Aws/aws.route.ts';
import BlogRoutes from '@modules/Blog/blog.routes.ts';
import StateRoutes from '@modules/Stats/States.routes.ts';
import ExperienceRoutes from '@modules/Experience/experience.route.ts';
import HeroRoutes from '@modules/Hero/hero.route.ts';
import ExpertiseRoutes from '@modules/Expertice/expertise.route.ts';
import AboutRoutes from '@modules/About/about.route.ts';

import cookieParser from "cookie-parser";

import { ConnectToMongoDB } from '@utils';

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTED,
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  }),
);

const databaseUri = process.env.Database;
if (!databaseUri) {
  throw new Error("Database connection string is missing");
}

ConnectToMongoDB(databaseUri);
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
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) return res.status(401).json({ authenticated: false });
  if (!jwtSecret) {
    return res.status(500).json({ authenticated: false, message: "JWT secret is missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    res.json({ authenticated: true, user: decoded });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("JWT verify failed:", errorMessage);
    res.status(401).json({ authenticated: false });
  }
});

export default app;

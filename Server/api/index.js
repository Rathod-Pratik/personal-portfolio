import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import CodeRoutes from "../Routes/code.route.js";
import contactroutes from "../Routes/Contact.route.js";
import NoteRoutes from "../Routes/notes.route.js";
import LanguageRoutes from "../Routes/Language.route.js";
import ProjectRoutes from "../Routes/Project.route.js";
import SkillsRoutes from "../Routes/Skill.route.js";
import AuthRoutes from '../Routes/Auth.route.js'
import CVRoutes from '../Routes/CV.route.js'
import AwsRoutes from "../Routes/aws.route.js";
import cookieParser from 'cookie-parser';

import { ConnectToMongoDB } from "../Controller/Connaction.js";
const app = express();
app.use(cookieParser());
app.use(
  cors({
    sameSite: "None",
    origin: process.env.FRONTED, // Ensure FRONTED is set correctly in your .env file
    methods: ["POST", "PUT", "DELETE", "GET"], // Adjust methods if you need others like PATCH
    credentials: true, // Allow cookies and authorization headers to be sent
  })
);

ConnectToMongoDB(process.env.Database);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Backend is up");
});

app.use("/code", CodeRoutes);
app.use("/contact", contactroutes);
app.use("/note", NoteRoutes);
app.use('/auth',AuthRoutes);
app.use('/CV',CVRoutes)
app.use('/s3',AwsRoutes)
app.use("/language", LanguageRoutes);
app.use("/project", ProjectRoutes);
app.use("/skills", SkillsRoutes);


export default app
import express from 'express'
import { CreateProject, DeleteProject, EditProject, GetProject } from '../Controller/Project.controller.js';
import { UpdateImageAndFile, uploadImage } from '../Middleware/Project.middleware.js';
import upload from '../Middleware/multer.middleware.js';
const router=express.Router();

router.get('/getProject',GetProject);
router.post('/createProject',upload.single('image'),uploadImage,CreateProject)
router.put('/editProject',upload.single('image'),UpdateImageAndFile,EditProject)
router.delete('/deleteProject/:_id',DeleteProject);

export default router;
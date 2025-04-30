import express from 'express'
import { CreateProject, DeleteProject, EditProject, GetProject, GetProjectData } from '../Controller/Project.controller.js';
const router=express.Router();

router.get('/getProject',GetProject);
router.post('/createProject',CreateProject)
router.put('/editProject',EditProject)
router.put('/projectdata/:_id',GetProjectData)
router.delete('/deleteProject/:_id',DeleteProject);

export default router;
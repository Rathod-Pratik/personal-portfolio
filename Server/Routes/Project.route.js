import express from 'express'
import { CreateProject, DeleteProject, EditProject, GetProject, GetProjectData } from '../Controller/Project.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
import { updateAdminViews } from '../Middleware/View.middleware.js';
const router=express.Router();

router.get('/getProject',updateAdminViews,GetProject);
router.post('/createProject',checkAdminCookie,CreateProject)
router.put('/editProject',checkAdminCookie,EditProject)
router.put('/projectdata/:_id',checkAdminCookie,GetProjectData)
router.delete('/deleteProject/:_id',checkAdminCookie,DeleteProject);

export default router;
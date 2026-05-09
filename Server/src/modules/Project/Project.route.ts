import express from 'express'
import { CreateProject, DeleteProject, EditProject, GetProject, GetProjectData } from './Project.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';
import { uploadFiles } from '../../middlewares/multer.middleware.ts';
const router=express.Router();

router.get('/getProject',updateAdminViews,GetProject);
router.post('/createProject',uploadFiles,checkAdminCookie,CreateProject)
router.put('/editProject',uploadFiles,checkAdminCookie,EditProject)
router.put('/projectdata/:_id',checkAdminCookie,GetProjectData)
router.delete('/deleteProject/:_id',checkAdminCookie,DeleteProject);

export default router;
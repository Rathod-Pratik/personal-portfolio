import express from 'express';
import { GetProjectTypes, CreateProjectType, UpdateProjectType, DeleteProjectType } from './projectType.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';

const router = express.Router();

router.get('/options', GetProjectTypes);
router.post('/options', checkAdminCookie, CreateProjectType);
router.put('/options/:_id', checkAdminCookie, UpdateProjectType);
router.delete('/options/:_id', checkAdminCookie, DeleteProjectType);

export default router;

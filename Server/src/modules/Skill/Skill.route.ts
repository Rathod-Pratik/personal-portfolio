import express from 'express'
import { CreateSkill, DeleteSkill, EditSkill, GetSkill } from './Skills.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';

const router=express.Router();

router.get('/getskills',updateAdminViews,GetSkill);
router.post('/createskill',checkAdminCookie,CreateSkill)
router.put('/editskills',checkAdminCookie,EditSkill)
router.delete('/deleteskill/:_id',checkAdminCookie,DeleteSkill);

export default router;
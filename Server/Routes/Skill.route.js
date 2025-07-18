import express from 'express'
import { CreateSkill, DeleteSkill, EditSkill, GetSkill } from '../Controller/Skills.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';

const router=express.Router();

router.get('/getskills',GetSkill);
router.post('/createskill',checkAdminCookie,CreateSkill)
router.put('/editskills',checkAdminCookie,EditSkill)
router.delete('/deleteskill/:_id',checkAdminCookie,DeleteSkill);

export default router;
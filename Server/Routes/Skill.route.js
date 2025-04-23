import express from 'express'
import { CreateSkill, DeleteSkill, EditSkill, GetSkill } from '../Controller/Skills.controller.js';

const router=express.Router();

router.get('/getskills',GetSkill);
router.post('/createskill',CreateSkill)
router.put('/editskills',EditSkill)
router.delete('/deleteskill/:_id',DeleteSkill);

export default router;
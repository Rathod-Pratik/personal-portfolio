import express from 'express'
import { CreateCode, Deletecode, GetCode, Updatecode } from '../Controller/Code.controller.js';
const router=express.Router();

router.get('/Getcode/:_id',GetCode);
router.post('/createCodeData',CreateCode)
router.put('/editcodeData',Updatecode)
router.delete('/deleteCodeData/:_id',Deletecode);

export default router;
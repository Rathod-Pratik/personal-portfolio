import express from 'express'
import { CreateCode, Deletecode, GetCode, Updatecode } from '../Controller/Code.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
const router=express.Router();

router.get('/Getcode/:_id',GetCode);
router.post('/createCodeData',checkAdminCookie,CreateCode)
router.put('/editcodeData',checkAdminCookie,Updatecode)
router.delete('/deleteCodeData/:_id',checkAdminCookie,Deletecode);

export default router;
import express from 'express'
import { CreateCode, Deletecode, GetCode, Updatecode } from '../Controller/Code.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
import { updateAdminViews } from '../Middleware/View.middleware.js';
const router=express.Router();

router.get('/Getcode/:_id',updateAdminViews,GetCode);
router.post('/createCodeData',checkAdminCookie,CreateCode)
router.put('/editcodeData',checkAdminCookie,Updatecode)
router.delete('/deleteCodeData/:_id',checkAdminCookie,Deletecode);

export default router;
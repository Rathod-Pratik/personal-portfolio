import express from 'express';
import { Get_Signed_Url, Sign_Url } from './aws.controller.ts';
import { checkAdminCookie } from '@Middleware/Auth.middleware.ts';

const router=express.Router();
router.post('/signed-url',checkAdminCookie,Sign_Url);
router.post('/signed-get-url',Get_Signed_Url);


export default router;

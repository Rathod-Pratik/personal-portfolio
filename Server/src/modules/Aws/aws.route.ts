import express from 'express';
import { Sign_Url } from './aws.controller.ts';
import { checkAdminCookie } from '@Middleware/Auth.middleware.ts';

const router=express.Router();
router.post('/signed-url',checkAdminCookie,Sign_Url);


export default router;

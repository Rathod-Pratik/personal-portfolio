import express from 'express';
import { Sign_Url } from '../Controller/aws.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';

const router=express.Router();
router.post('/signed-url',checkAdminCookie,Sign_Url);


export default router;

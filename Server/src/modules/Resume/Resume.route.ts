import express from 'express'
import { AddCV, GetCV, UpdateCV } from './Resume.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';

const route=express.Router();

route.get('/GetCV',updateAdminViews,GetCV);
route.post('/AddCV',checkAdminCookie,AddCV)
route.put('/UpdateCV',checkAdminCookie,UpdateCV)

export default route;
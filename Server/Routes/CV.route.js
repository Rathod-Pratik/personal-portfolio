import express from 'express'
import { AddCV, GetCV, UpdateCV } from '../Controller/Cv.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
import { updateAdminViews } from '../Middleware/View.middleware.js';

const route=express.Router();

route.get('/GetCV',updateAdminViews,GetCV);
route.post('/AddCV',checkAdminCookie,AddCV)
route.put('/UpdateCV',checkAdminCookie,UpdateCV)

export default route;
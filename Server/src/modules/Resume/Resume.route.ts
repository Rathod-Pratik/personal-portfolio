import express from 'express'
import { AddCV, GetCV, GetCVDownload, UpdateCV,GetCVDownloadUrl } from './Resume.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';
import { uploadFiles } from '../../middlewares/multer.middleware.ts';

const route=express.Router();

route.get('/GetCV',updateAdminViews,GetCV);
route.get('/download',GetCVDownload);
route.get('/download-url', GetCVDownloadUrl);
route.post('/AddCV',uploadFiles,checkAdminCookie,AddCV)
route.put('/UpdateCV',uploadFiles,checkAdminCookie,UpdateCV)

export default route;
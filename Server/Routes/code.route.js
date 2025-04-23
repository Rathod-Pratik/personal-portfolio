import express from 'express'
import { uploadFiles } from '../Middleware/multer.middleware.js';
import { deleteImageAndFile, UpdateImageAndFile, uploadImageAndFile } from '../Middleware/Code.middleware.js';
import { CreateCode, Deletecode, GetCode, Updatecode } from '../Controller/Code.controller.js';
const router=express.Router();

router.get('/Getcode',GetCode);
router.post('/createCodeData',uploadFiles,uploadImageAndFile,CreateCode)
router.put('/editcodeData',uploadFiles,UpdateImageAndFile,Updatecode)
router.delete('/deleteCodeData/:_id',deleteImageAndFile,Deletecode);

export default router;
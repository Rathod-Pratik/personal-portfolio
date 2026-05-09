import express from 'express'
import { CreateNote, DeleteNote, EditNote, GetNote } from './Notes.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';
import { uploadFiles } from '../../middlewares/multer.middleware.ts';
const router=express.Router();

router.get('/getnotes',updateAdminViews,GetNote);
router.post('/createNote',uploadFiles,checkAdminCookie,CreateNote)
router.put('/editNote',uploadFiles,checkAdminCookie,EditNote)
router.delete('/deleteNote/:_id',checkAdminCookie,DeleteNote);

export default router;
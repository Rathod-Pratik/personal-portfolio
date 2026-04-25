import express from 'express'
import { CreateNote, DeleteNote, EditNote, GetNote } from './Notes.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';
import type { DeleteNoteRequestParams } from '@type';
const router=express.Router();

router.get('/getnotes',updateAdminViews,GetNote);
router.post('/createNote',checkAdminCookie,CreateNote)
router.put('/editNote',checkAdminCookie,EditNote)
router.delete<DeleteNoteRequestParams>('/deleteNote/:_id',checkAdminCookie,DeleteNote);

export default router;
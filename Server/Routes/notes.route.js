import express from 'express'
import { CreateNote, DeleteNote, EditNote, GetNote } from '../Controller/Notes.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
import { updateAdminViews } from '../Middleware/View.middleware.js';
const router=express.Router();

router.get('/getnotes',updateAdminViews,GetNote);
router.post('/createNote',checkAdminCookie,CreateNote)
router.put('/editNote',checkAdminCookie,EditNote)
router.delete('/deleteNote/:_id',checkAdminCookie,DeleteNote);

export default router;
import express from 'express'
import { CreateNote, DeleteNote, EditNote, GetNote } from '../Controller/Notes.controller.js';
const router=express.Router();

router.get('/getnotes',GetNote);
router.post('/createNote',CreateNote)
router.put('/editNote',EditNote)
router.delete('/deleteNote/:_id',DeleteNote);

export default router;
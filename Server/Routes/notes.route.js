import express from 'express'
import { uploadFiles } from '../Middleware/multer.middleware.js';
import { CreateNote, DeleteNote, EditNote, GetNote } from '../Controller/Notes.controller.js';
import { deleteImageAndFile, UpdateImageAndFile, uploadImageAndFile } from '../Middleware/Note.middleware.js';
const router=express.Router();

router.get('/getnotes',GetNote);
router.post('/createNote',uploadFiles,uploadImageAndFile,CreateNote)
router.put('/editNote',uploadFiles,UpdateImageAndFile,EditNote)
router.delete('/deleteNote/:_id',deleteImageAndFile,DeleteNote);

export default router;
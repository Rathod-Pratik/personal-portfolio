import express from 'express'
import { CreateLanguage, DeleteLanguage, EditLanguage, GetLanguage } from '../Controller/Language.controller.js';
const router=express.Router();

router.get('/getlanguage',GetLanguage);
router.post('/createlanguage',CreateLanguage)
router.put('/editlanguage',EditLanguage)
router.delete('/deletelanguage/:_id',DeleteLanguage);

export default router;
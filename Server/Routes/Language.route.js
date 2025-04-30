import express from 'express'
import { CreateLanguage, DeleteLanguage, EditLanguage, GetLanguage } from '../Controller/Language.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
const router=express.Router();

router.get('/getlanguage',GetLanguage);
router.post('/createlanguage',checkAdminCookie,CreateLanguage)
router.put('/editlanguage',checkAdminCookie,EditLanguage)
router.delete('/deletelanguage/:_id',checkAdminCookie,DeleteLanguage);

export default router;
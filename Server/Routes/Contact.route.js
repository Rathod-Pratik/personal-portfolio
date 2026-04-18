import express from 'express'
import { createContact, DeleteContact, GetContact } from '../Controller/contact.controller.js';
import { checkAdminCookie } from '../Middleware/Auth.middleware.js';
import { updateAdminViews } from '../Middleware/View.middleware.js';

const router=express.Router();

router.get('/getcontact',checkAdminCookie,GetContact);
router.post('/createcontact',updateAdminViews,createContact)
router.delete('/deletecontact/:_id',checkAdminCookie,DeleteContact);

export default router;
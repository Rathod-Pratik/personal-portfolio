import express from 'express'
import { createContact, DeleteContact,  GetContact,  UpdateContactStatus } from './contact.controller.ts';
import { checkAdminCookie } from '../../middlewares/Auth.middleware.ts';
import { updateAdminViews } from '../../middlewares/View.middleware.ts';

const router=express.Router();
router.get('/getcontact',checkAdminCookie,GetContact);
router.post('/createcontact',updateAdminViews,createContact)
router.put('/updatecontactstatus/:_id',checkAdminCookie,UpdateContactStatus);
router.delete('/deletecontact/:_id',checkAdminCookie,DeleteContact);

export default router;
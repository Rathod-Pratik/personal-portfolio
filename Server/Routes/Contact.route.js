import express from 'express'
import { createContact, DeleteContact, GetContact } from '../Controller/contact.controller.js';

const router=express.Router();

router.get('/getcontact',GetContact);
router.post('/createcontact',createContact)
router.delete('/deletecontact',DeleteContact);

export default router;
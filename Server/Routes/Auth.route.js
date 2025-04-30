import express from 'express'
import { Login, signup } from '../Controller/Auth.controller.js';

const route=express.Router();

route.post('/login',Login);
route.post('/signup',signup)

export default route
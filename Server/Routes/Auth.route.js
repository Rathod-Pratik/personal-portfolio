import express from 'express'
import { Login, Logout, signup } from '../Controller/Auth.controller.js';

const route=express.Router();

route.post('/login',Login);
route.post('/signup',signup)
route.get('/logout',Logout)

export default route
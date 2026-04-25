import express from 'express'
import { Login, Logout, forgotPassword, resetPassword, signup, verifyLoginOtp, verifyOtp } from './Auth.controller.ts';

const route=express.Router();

route.post('/login',Login);
route.post('/login-verify', verifyLoginOtp);
route.post('/signup',signup)
route.get('/logout',Logout)
route.post('/forgot-password', forgotPassword);
route.post('/verify-otp', verifyOtp);
route.post('/reset-password', resetPassword);

export default route
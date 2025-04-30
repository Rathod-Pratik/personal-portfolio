import express from 'express'
import { AddCV, GetCV, UpdateCV } from '../Controller/Cv.controller.js';

const route=express.Router();

route.get('/GetCV',GetCV);
route.post('/AddCV',AddCV)
route.put('/UpdateCV',UpdateCV)

export default route;
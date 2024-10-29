const express = require('express');
const information=require('../model/information');

const app=express.Router();

app.post('/',async(req,res)=>{
    try {
        const user = await information.create({
            name: req.body.name,
            email: req.body.email,
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the data.' });
    }

})

module.exports=app;
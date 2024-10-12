const express=require('express');
const app=express.Router();
const {sendCode,sendVideo,sendPhoto}=require('./PrintData')
app.get("/",(req,res)=>{
    const data=[
        {
            _id:1,
            file_name:"Link CSS",
            code:[sendCode('CSS/code/Link css/Link css.css'),sendCode('CSS/code/Link css/linkcss.html')]
        },
        {
            _id:2,
            file_name:"alignment",
            code:sendCode('CSS/code/alignment/inligement.html')
        },
        {
            _id:3,
            file_name:"Border",
            code:[sendCode('CSS/code/Border/border,height,width and background.html'),sendCode('CSS/code/Border/border.html')]
        },
        {
            _id:4,
            file_name:"Button",
            code:sendCode('CSS/code/Button/button.html'),
        },
        {
            _id:5,
            file_name:"Color",
            code:sendCode('CSS/code/Colors/color properties.html'),
        },
        {
            _id:6,
            file_name:"flex box",
            code:sendCode('CSS/code/Flex box/flexbox.html'),
        },
        {
            _id:7,
            file_name:"Floats",
            code:sendCode('CSS/code/Float/float.html'),
        },
        {
            _id:8,
            file_name:"Font property",
            code:[sendCode('CSS/code/Font property/font size.html'),sendCode('CSS/code/Font property/font.html')]
        },
        {
            _id:9,
            file_name:"Gradient",
            code:sendCode('CSS/code/gradient/gradient.html'),
        },
        {
            _id:10,
            file_name:"Grid",
            code:[sendCode('CSS/code/Grid/grid.html'),sendCode('CSS/code/Grid/grid marge.html'),sendCode('CSS/code/Grid/grid responsive.html'),sendCode('CSS/code/Grid/grid template.html'),sendCode('CSS/code/Grid/grid templet.html')]
        },
        {
            _id:11,
            file_name:"Media Query",
            code:sendCode('CSS/code/media query/media query.html')
        },
        {
            _id:12,
            file_name:"Selector",
            code:[sendCode('CSS/code/Selector/after pseudo selector.html'),sendCode('CSS/code/Selector/attributs and nth child pseudo selectors.html')]
        },
        {
            file_name:"Shadow",
            _id:13,
            code:sendCode('CSS/code/Shadow/shadow.html')
        },
        {
            _id:14,
            file_name:"Transeform",
            code:sendCode('CSS/code/Transeform/transform.html')
        },
        {
            _id:15,
            file_name:"Variable",
            code:sendCode('CSS/code/Variable/variable.html')
        },
        {
            _id:16,
            file_name:"Z-index",
            code:sendCode('CSS/code/Z-index/z-index.html'),
        },
        {
            _id:17,
            file_name:"Center element",
            code:sendCode('CSS/code/Center element/Center.html')
        }
    ]
    res.status(200).json(data);
})

module.exports=app
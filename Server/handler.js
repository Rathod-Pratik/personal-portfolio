const http=require('http');
const app =require('./index');
const serverless=require('serverless-http');
module.exports.hello=serverless(app)
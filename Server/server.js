const http=require('http');
const app=require('./index')


app.listen(5000,()=>{
    console.log("runntin");
})
var httpserver=http.createServer(app);
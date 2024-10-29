const {connnectToMongo}=require('./functions/connection');
connnectToMongo("mongodb+srv://RathodPratik:Pratik%401432@cluster0.v5r2m.mongodb.net/iNotebook?retryWrites=true&w=majority").then(()=>{
  console.log("connection success");
})

const express = require('express');
const app = express();
const cors=require('cors');
const port = 5000


app.use(express.json())
app.use(cors(
  {
    origin:["https://my-notebook-pratik.netlify.app"],
    methods:["POST","PUT","DELETE","GET"],
    credentials:true
  }
))

app.get("/",(req,res)=>{
 return res.json("server is running ");
})

// Available Routes
app.use('/api/auth', require('./functions/auth'))
 app.use('/api/notes', require('./functions/notes'))


 app.listen(port, () => {
  console.log(`iNotebook listening at http://localhost:${port}`)
})
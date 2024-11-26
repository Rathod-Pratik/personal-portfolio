const express=require('express');
const app=express.Router();

app.use("/form", require("../Controller/Function/Form-data"));
app.use("/jQuery/code", require("../Controller/JQuery/jQuery"));
app.use("/php/code", require("../Controller/PHP/php"));
app.use("/javascript/code", require("../Controller/javascript/javascript"));
app.use("/html/code", require("../Controller/HTML/html"));
app.use("/c__/code", require("../Controller/C++/C++"));
app.use("/css/code", require("../Controller/CSS/css"));
app.use("/SQL/code", require("../Controller/SQL/sql"));
app.use("/DSAC/code", require("../Controller/DS in C plus/c++"));
app.use("/project/code", require("../Controller/Project/project"));
app.use("/pdf", require("../Controller/PDF/pdf"));
app.use("/java",require("../Controller/Java/java"))
module.exports=app;
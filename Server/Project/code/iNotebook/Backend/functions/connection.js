const mongoose =require('mongoose');

function connnectToMongo(url){
    return mongoose.connect(url);
}

module.exports={connnectToMongo};
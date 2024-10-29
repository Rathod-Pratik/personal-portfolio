const mongoose=require('mongoose');

function ConnectToMongo(url){
    return mongoose.connect(url);
}

module.exports={ConnectToMongo};
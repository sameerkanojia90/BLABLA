const mongoose = require('mongoose');
require("dotenv").config();

const  connectdb = async () =>{
    try{
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL)
            console.log("MongoDb Connected SUCCESFULLY");

    } catch(error)
    {
        console.log(error);
    }
}

module.exports = connectdb;
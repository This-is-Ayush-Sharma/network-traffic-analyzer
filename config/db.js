const mongoose = require('mongoose');

exports.connect = ()=>{
    mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`,()=>{
        console.log("connected to the database!");
    })
}
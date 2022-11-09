const express = require('express');
const app = express();

const banController = require('../controllers/Ban.controller');
const DetectController = require('../controllers/detect.Controller');
app.get('/health',(req,res)=>{
    return res.status(200).json({
        message: "~App is live~"
    })
})
app.get('/',(req,res)=> {
    return res.redirect('/add');
})

app.get('/add',banController.Showpage);
app.post('/addban',banController.AddData);

app.get('/detect',DetectController.check);
module.exports = app;
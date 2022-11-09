const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');
const dbConnect = require('./config/db');
const cors = require('cors')
const bodyparser = require('body-parser')

app.set("view engine", "ejs")
app.use(express.json());
app.use(cors());
// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use('/',routes);

dbConnect.connect();

app.listen(process.env.PORT,()=>{
    console.log(`connected to port ${process.env.PORT}`);
})
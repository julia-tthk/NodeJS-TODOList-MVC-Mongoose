const express = require('express');
const bodyParser = require('body-parser');
//it is crucially important to import model dependency BEFORE the route!
require('./models/db');
const taskRoute = require('./routes/task');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(taskRoute);


app.listen(5000, ()=>{
    console.log("Server is running on port 5000");    
})

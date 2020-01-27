const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');


const app = express();

//Connnect to Mongo
connectDB();

//Bodyparser Middleware
app.use(express.json({ extended: false }));

//Use Routes
app.use('/api/notes',require('./routes/api/notes'));
app.use('/api/labels',require('./routes/api/label'));

//Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set staic folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PRT || 5000;

app.listen(port, ()=> console.log(`Server Started on port ${port}`));
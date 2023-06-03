require('dotenv').config();

const express=require('express');

const bodyParser = require('body-parser');
const path=require('path');


const PORT=process.env.PORT || 5005;


const getWeather=require('./route/getweather');

const app=express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'./front-end')));

app.use('/getWeather',getWeather);


// UI web app to call the api 
app.get('/',(req,res)=>{
    res.sendFile('./front-end/index.html');
})





app.listen(PORT, () => {
    console.log("listening for requests");
})
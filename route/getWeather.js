require('dotenv').config();
const express=require('express');
const router=express.Router();
const fetch=require('node-fetch');

const KEY=process.env.KEY;



router.route('/')
    .post(async(req,res)=>{
        console.log(req.body);
        const cities=req.body.cities;

        let temp={};

        for(const city of cities){ 

            temp[city]=await fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+  // calling the weather api along with city name and api key 
            "&units=metric&APPID="+
            KEY).then((data)=>{
                return data.json(); // converting the data to json 
            }).then((data)=>{
                console.log(data);
                if(Object.keys(data).length==2){ // handling the error if user sends a city that could not be found
                    throw new Error('Error: could not find the  city'); // throwing to the catch statement
                }else{
                    return data.main.temp+'C';
                }
            }).catch((error)=>{
                console.log(error);
                return 'error occured';
            });

            
        }
        console.log(temp);
        res.send(temp);

    })

module.exports=router;
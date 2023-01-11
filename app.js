const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(require, respond){

    var url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9367517c4a3d0682ce29a352cfe1cf6a";

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.weather[0].description;

            console.log(temp);
        })

    })

    respond.send("Server is up and running");
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
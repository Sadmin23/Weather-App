const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(require, respond){

    var url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=9367517c4a3d0682ce29a352cfe1cf6a&units=metric#";

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesccription = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            console.log("<img src=\"" + icon + "\" alt=\"weather icon\"/>");
            respond.write("<h1>Temperature of London is " + temp + " degrees Celcius.</h1>");
            respond.write("<p>The weather is currently " + weatherDesccription +  "</p>");
            respond.write("<img src=\"" + icon + "\" alt=\"weather icon\"/>");
            respond.send();
        })

    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(require, respond){

    respond.sendFile(__dirname + "/index.html");


});

app.post("/", function(require, respond){

    console.log(require.body.cityName);

    const query = require.body.cityName;
    const apiKey = "9367517c4a3d0682ce29a352cfe1cf6a";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit +"#";

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            // console.log("<img src=\"" + icon + "\" alt=\"weather icon\"/>");
            respond.write("<h1>Temperature of London is " + temp + " degrees Celcius.</h1>");
            respond.write("<p>The weather is currently " + weatherDescription +  "</p>");
            respond.write("<img src=\"" + icon + "\" alt=\"weather icon\"/>");
            respond.send();
        })

    })
    
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
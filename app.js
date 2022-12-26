const express = require("express");
const https = require("https");
const app = express();
app.use(express.urlencoded());
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "c32f422ed8b83ffc00ea2f83c972381b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey+""
    
    https.get(url, function(response){
        console.log(res.statusCode);

        response.on("data", function(data){
            console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            console.log(temp);
            const description = weatherData.weather[0].description;
            console.log(description);
            const icon = weatherData.weather[0].icon;
            const imageWeather = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The Temperature in Peshawar is "+temp+"  Degree Celcius.</h1>");
            res.write("<p>The Weather is Currently "+description+ "</p>");
            res.write("<img src=" + imageWeather+">");
            res.send();
    });
    });
});

app.listen(3000, function() {
    console.log("Server has started on port 3000");
});



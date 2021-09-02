const { constants } = require('buffer');
const express = require('express');
const https = require('https');
let bodyParser = require('body-parser');

const app = express();
app.use(bodyParser({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function (req, res) {
    let query = req.body.cityName;
    let apikey = 'e81b9453e4aef00c6030179f7d43de08';
    let units = 'metric';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apikey + '&units=' + units + '';
    https.get(url, (responce) => {
        console.log(responce.statusCode);
        responce.on('data', function (data) {
            let weatherData = JSON.parse(data);
            let icon = weatherData.weather[0].icon;
            console.log(weatherData);
            res.send('<h1>temparature in ' + weatherData.name + ' is ' + weatherData.main.temp + ' degrees </h1>')
        })
    })

})


app.listen(1000, () => {
    console.log('server is running on port 1000');
})
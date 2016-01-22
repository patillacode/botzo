var angryMessages = require('./angryMessages.json');
var weather = require('weather-js');

function random_message() {
    var randomPos = Math.floor(Math.random() * angryMessages.length);
    return {
        'message': angryMessages[randomPos]['message'],
        'icon': angryMessages[randomPos]['icon']
    }
}

function printWeather(result, bot, message, weatherMessages) {
    weatherMessages.forEach(weatherMessage => {
        bot.reply(message, weatherMessage);
    });
}

function printWeatherError(err, bot, message, weatherMessages) {
    bot.reply(message, err);
    bot.reply(message, 'The fvckin\' weather command is NOT working, leave me alone.');
}

function getWeather(bot, message, location) {
    weather.find({
        search: location,
        degreeType: 'C'
    }, function(err, result) {
        if (err) {
            printWeatherError(err, bot, message, location);
        } else {
            var weatherData = {
                'temperature': current['temperature'],
                'skytext': current['skytext'],
                'feelslike': current['feelslike'],
                'humidity': current['humidity']
            };
            var weatherMessages = [];
            weatherMessages.push('It is fucking ' + weatherData['temperature'] + ' degrees, aight?');
            if (weatherData['temperature'] !== weatherData['feelslike']) {
                weatherMessages.push('But it feels like ' + weatherData['feelslike'] + 'º god dammit!');
            }
            weatherMessages.push(weatherData['skytext'] + ' / ' + weatherData['humidity'] + '% humidity');
            printWeather(result, bot, message, weatherMessages);
        }
    });
}

exports.random_message = random_message;
exports.getWeather = getWeather;

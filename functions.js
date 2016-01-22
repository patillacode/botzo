var angry_messages = require('./angry_messages');
angry_messages = angry_messages.angry_messages

var weather = require('weather-js');
var weather_data;

exports.random_message = random_message;
exports.get_weather = get_weather;

function random_message() {
    random_pos = Math.floor(Math.random() * angry_messages.length);
    return {
        'message': angry_messages[random_pos]['message'],
        'icon': angry_messages[random_pos]['icon']
    }
}

function print_weather(result, bot, message, weather_messages) {
    for (var i = 0, len = weather_messages.length; i < len; i++) {
        bot.reply(message, weather_messages[i]);
    }
}

function print_weather_error(err, bot, message, weather_messages) {
    bot.reply(message, err);
    bot.reply(message, 'The fvckin\' weather command is NOT working, leave me alone.');
}

function get_weather(bot, message, location) {
    weather.find({
        search: location,
        degreeType: 'C'
    }, function(err, result) {
        if (err) {
            print_weather_error(err, bot, message, location);
        } else {
            current = result[0]['current'];
            temperature = current['temperature'];
            skytext = current['skytext'];
            feelslike = current['feelslike'];
            humidity = current['humidity'];

            weather_data = {
                'temperature': temperature,
                'skytext': skytext,
                'feelslike': feelslike,
                'humidity': humidity
            };
            weather_messages = [];
            weather_messages.push('It is fucking ' + weather_data['temperature'] + ' degrees, aight?');
            if (weather_data['temperature'] != weather_data['feelslike']) {
                weather_messages.push('But it feels like ' + weather_data['feelslike'] + 'º god dammit!');
            }
            weather_messages.push(weather_data['skytext'] + ' / ' + weather_data['humidity'] + '% humidity');
            print_weather(result, bot, message, weather_messages);
        }
    });
}

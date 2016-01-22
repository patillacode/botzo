var angry_messages = require('./angry_messages');
angry_messages = angry_messages.angry_messages

var weather = require('weather-js');
var weather_data;

exports.random_message = random_message;
exports.get_weather = get_weather;

function random_message() {
    random_pos = Math.floor(Math.random() * angry_messages.length);
    return {'message': angry_messages[random_pos]['message'],
            'icon': angry_messages[random_pos]['icon']}
}


function print_weather(result, bot, message, weather_messages){
    // foreach(function(i){
    //     bot.reply(message, weather_messages[i]);
    // });
    for (var i = 0, len = weather_messages.length; i < len; i++) {
        bot.reply(message, weather_messages[i]);
    }
}

function get_weather(bot, message, location){
    weather.find({search: location, degreeType: 'C'}, function(err, result){
        if(err){
            print_weather_error(err, bot, message, location);
        }
        else{
            // console.log(result[0]['current']);
            current = result[0]['current'];
            temperature = current['temperature'];
            skytext = current['skytext'];
            feelslike = current['feelslike'];
            humidity = current['humidity'];

            // console.log(JSON.stringify(result, null, 2));
            weather_data = {"temperature": temperature,
                            "skytext": skytext,
                            "feelslike": feelslike,
                            "humidity": humidity};
            weather_messages = [];
            weather_messages.push("It is fucking "+weather_data['temperature']+" degrees, aight?");
            if(weather_data['temperature'] != weather_data['feelslike']){
                weather_messages.push("But it feels like "+weather_data['feelslike']+"º god dammit!");
            }
            weather_messages.push(weather_data['skytext']+" / "+weather_data['humidity']+"% humidity");
            // weather_messages.push("Just look out the window you twat.");
            print_weather(result, bot, message, weather_messages);
        }
    });
}
/*#############################################################################

                    _/_/_/                _/
                   _/    _/    _/_/    _/_/_/_/  _/_/_/_/    _/_/
                  _/_/_/    _/    _/    _/          _/    _/    _/
                 _/    _/  _/    _/    _/        _/      _/    _/
                _/_/_/      _/_/        _/_/  _/_/_/_/    _/_/


Another Slack bot based on Botkit.
Botzo gets angry about almost anything. Tbh, everything.
#############################################################################*/

var Botkit = require('botkit');
var angry_messages = require('./angry_messages');
var functions = require('./functions');
var os = require('os');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

controller.hears(['help'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'Available commands:');
    bot.reply(message, '`random` -  Get a random angry message from Botzo');
    bot.reply(message, '```Basically you will get told to fvck off, no matter what you say```');
});

// controller.hears(['random'], 'direct_message,direct_mention,mention',function(bot, message) {
//     bot.reply(message, functions.random());
// });

// (.*)
// controller.hears(['hello','hi'],'direct_message,direct_mention,mention',function(bot, message) {
controller.hears(['(.*)'],'direct_message,direct_mention,mention',function(bot, message) {

    bot_response = functions.random();
    bot_message = bot_response['message'];
    bot_icon = bot_response['icon'];

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        // name: 'robot_face',
        name: bot_icon,
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
            bot.botkit.log(bot_icon);
        }
    });


    controller.storage.users.get(message.user,function(err, user) {
        // if (user && user.name) {
        //     bot.reply(message,'Hello ' + user.name + '!!');
        // } else {
        //     bot.reply(message,'Hello.');
        // }
        bot.reply(message, bot_message);
    });
});

controller.hears(['shutdown'],'direct_message,direct_mention,mention',function(bot, message) {

    bot.startConversation(message,function(err, convo) {
        convo.ask('Are you sure you want me to shutdown?',[
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    },3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime','identify yourself','who are you','what is your name'],'direct_message,direct_mention,mention',function(bot, message) {

    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());

    bot.reply(message,':robot_face: I am a bot named <@' + bot.identity.name + '>. I have been running for ' + uptime + ' on ' + hostname + '.');

});

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
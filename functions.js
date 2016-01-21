var angry_messages = require('./angry_messages');
angry_messages = angry_messages.angry_messages

exports.random = random;

function random() {
    random_pos = Math.floor(Math.random() * angry_messages.length);
    return {'message': angry_messages[random_pos]['message'],
            'icon': angry_messages[random_pos]['icon']}
}
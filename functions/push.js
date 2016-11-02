const gcm = require('node-gcm');

function push(data, to) {
    console.log('push data: ', data);
    console.log('push to: ', to);
    let message = new gcm.Message({
        priority: 'high',
        data: data,
        notification: {
            title: "t1t5",
            body: "Список фич обновился!"
        }
    });
    let sender = new gcm.Sender('AIzaSyDnG7F5yyYABdDAKb6nIOiQqynnbscjcjM');

    sender.send(message, { registrationTokens: to }, (err, response) => {
        if (err) {
            console.error('push sender err: ', err);
        } else {
            console.log('push sender response: ', response);
        }
    });
}

module.exports = push;

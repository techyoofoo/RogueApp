const express = require('express')
const app = express();
var amqp = require('amqplib/callback_api');

app.get('/', (req, res) => {
  res.send('')
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'test';
        var msg = 'test';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log("[x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
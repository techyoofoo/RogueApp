const express = require('express')
const app = express();
var amqp = require('amqplib/callback_api');
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post('/receive', (req, res) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            res.status(500).send({
                message: error0
            });
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                res.status(500).send({
                    message: error1
                });
            }
            var queue = `${req.body.queue}`;
            channel.assertQueue(queue, {
                durable: true
            });
            console.log("Waiting for messages in %s.", queue);
            let message = "";
            channel.consume(queue, function (msg) {
                message += msg.content.toString();
                setTimeout(function(){
                    console.log("Message:", msg.content.toString());
                    res.status(200).send({
                        message: message
                    });
                  },10000);
                  },{ noAck: false }
                );
        });
    });
});

app.listen(5000);













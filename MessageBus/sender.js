const express = require('express')
const app = express();
var amqp = require('amqplib/callback_api');
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post('/send', (req, res) => {
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
            var msg = `${req.body.message}`;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
        });
        setTimeout(function () {
            connection.close();
            //process.exit(0);
            res.status(200).send({
                message: "Success!"
            });
        }, 500);
    });
});

app.listen(3000);





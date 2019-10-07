import amqp from 'amqplib/callback_api';
const CONN_URL = 'amqp://localhost';

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
       
    });
});

export const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
}

/* export const consume = (queueName) => {
    console.log("Waiting for messages in %s.", queueName);
    return new Promise((resolve, reject) => {
        ch.consume(queueName, function (msg) {
            console.log(msg.content.toString());
            setTimeout(function(){
                ch.ack(msg);
            },5000);
        }, {
            noAck: false
        });
    });
} */

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
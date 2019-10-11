import amqp from 'amqplib/callback_api';
const CONN_URL = 'amqp://localhost';
var rabbitConn = require('../connection');

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    conn.createChannel(function (err, channel) {
        ch = channel;
       
    });
});

export const publishToQueue = async (queueName, data) => {
    ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
}

 export const consume = (queueName, res) => {
    console.log("Waiting for messages in %s.", queueName);
    rabbitConn(function(conn){
        conn.createChannel(function(err, ch) {
          if (err) {
            throw new Error(err)
          }
  
          var q = queueName;
          ch.assertQueue(q, {durable: true}, function(err, status) {
            if (err) {
              throw new Error(err)
            }
            else if (status.messageCount === 0) {
              res.send('{"messages": 0}')
            } else {
              var numChunks = 0;
  
              res.writeHead(200, {"Content-Type": "application/json"})
              res.write('{"messages": [')
  
              ch.consume(q.que, function(msg) {
                var resChunk = msg.content.toString()
  
                res.write(resChunk)
                numChunks += 1
                numChunks < status.messageCount && res.write(',')
  
                if (numChunks === status.messageCount) {
                  res.write(']}')
                  res.end()
                  ch.close(function() {conn.close()})
                }
              })
            }
          })
        }, {noAck: true})
      })
} 

process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
});
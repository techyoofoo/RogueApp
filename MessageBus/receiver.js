const express = require('express')
const app = express();
var amqp = require('amqplib/callback_api');
var rabbitConn = require('./connection');
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post('/receivenew',(req, res) => {
    rabbitConn(function(conn){
        conn.createChannel(function(err, ch) {
          if (err) {
            throw new Error(err)
          }
  
          var q = req.body.queue;
  
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
});

app.post('/receive', (req, res) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            res.status(500).send({
                message: error0
            });
        }

        connection.on('error', function(err) {
            console.error('RabbitMQ Connection ' + err);      
        });
        
        connection.createChannel(function (error1, channel) {
            if (error1) {
                res.status(500).send({
                    message: error1
                });
            }
            var queue = req.body.queue;
             channel.assertQueue(queue, {
                durable: true
            }); 
            //channel.prefetch(5);
            console.log("Waiting for messages in %s.", queue);
            let message = [];
            channel.consume(queue, function (msg) {
                message.push(msg.content.toString());
                 setTimeout(function(){
                    channel.ack(msg);
                    res.status(200).send({
                        message: message
                    });
                  },1000); 
                  },{ noAck: false }
            );
        });
    });
});

app.listen(5000);













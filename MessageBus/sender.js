const express = require('express')
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
import {publishToQueue, queueReceive} from './services/mqservices';

app.post('/send', async(req, res) => {
    var queueName = `${req.body.queue}`;
    var msg = `${req.body.message}`;
    await publishToQueue(queueName,msg);
    res.statusCode = 200;
    res.data = {"message-sent":true}
});

/* app.post('/receive', async(req, res) => {
    var queueName = `${req.body.queue}`;
    var msg = await queueReceive(queueName);
    res.statusCode = 200;
    res.data = {"message":msg};
}); */

app.listen(3000);





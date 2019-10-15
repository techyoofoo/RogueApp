import axios from 'axios';
var mqmodel = require('./model');

export const postToMq = (queue, messageid, message) => {
    let msg = mqmodel(messageid, message);
    axios.post('http://localhost:3000/send', {
        queue: queue,
        message: JSON.stringify(msg)
    }).then(function (response) {
        //console.log(response);
    }).catch(function (error) {
        //console.log(error);
    });
}
const express = require('express');
const fs = require('fs');
const app = express();
const server = require('http').createServer(/* {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem'),
    rejectUnauthorized: false
},  */app);

module.exports = server;

const services = require('./services');
const controllers = require('./controllers');

const io = services.socketio;

io.on('connect', socket => {
    socket.on('call-request', controllers.call.request);
    socket.on('call-request-accept', controllers.call.accept);
    socket.on('call-end-request', controllers.call.end);

    socket.on('add-unit', key => controllers.unit.add(key, false, socket.id));
    socket.on('add-op-unit', key => controllers.unit.add(key, true, socket.id));
    socket.on('remove-unit', controllers.unit.remove);
    socket.on('remove-op-unit', controllers.unit.remove);

    socket.on('unit-trigger', controllers.unit.trigger);
});

server.listen(8080, () => {
    console.log('Server listening to port 8080');
});
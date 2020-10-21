const socketio = require('socket.io');

const io = socketio(require('../server'));

module.exports = io;

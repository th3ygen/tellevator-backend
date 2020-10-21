const io = require('socket.io-client');

try {
    const socket = io.connect('http://localhost:8080');

    socket.on('connect', () => {
        console.log('connected');

        socket.on('wow', v => console.log(v));

        socket.emit('test', '1');
    });
    
    
} catch(err) {
    console.log(err);
}





/* socket.on('requestingCall', res => {
    console.log(res);

    socket.emit('callAccept', {
        signal: 'signal saya',
        to: res.from
    });
});

socket.emit('addAdmin', 'admin'); */
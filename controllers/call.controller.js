const stores = require('../stores');
const io = require('../services').socketio;

const queue = [];

function init(call) {
    const caller = stores.unit.get.byKey(call.from);

    caller.toggleAvailable(false);

    // find available admin, else queue
    const admin = stores.unit.get.op(true)[0];

    if (!admin) {
        queue.push(call);
        return io.to(caller.socket).emit('call-request-queue');
    }

    admin.toggleAvailable(false);
    
    io.to(admin.socket).emit('call-request-ring', {
        signal: call.signal,
        from: call.from
    });
    console.log('ringing admin');
};

module.exports = {
    request: (data) => {
        init(data);
    },
    accept: data => {
        io.to(stores.unit.get.byId(data.to).socket).emit('call-request-accepted', data.signal);
    },
    end: keys => {
        keys.map(d => {
            const unit = stores.unit.get.byKey(d)
            unit.toggleAvailable(true);
            io.to(unit.socket).emit('call-end-all');
        });

        // emit queue list
        io.emit('queue-list', queue);

        // connect to queueing unit
        const call = queue.shift();
        if (unit) {
            init(call);
        }
    }
};
const stores = require('../stores');
const io = require('../services').socketio;

module.exports = {
    add: stores.unit.add,
    remove: stores.unit.remove,
    trigger: key => {
        io.to(stores.unit.get.byKey(key).socket).emit('call-start');
    }
};
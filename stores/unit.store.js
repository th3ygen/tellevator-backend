class Unit {
    constructor(key, op, socket) {
        this.key = key;
        this.op = op;
        this.socket = socket;

        this.busy = false;

        this.createdAt = Date.now();
    }

    set(data) {
        Object.keys(this).map(k => this[k] = (data[k]) ? data[k] : this[k]);
    }

    toggleAvailable(flag) {
        this.set({ busy: !flag });
    }

    getAge() {
        return Date.now() - this.createdAt;
    }
}

let units = {};

module.exports = {
    add: (key, op, socket) => {
        units[key] = new Unit(key, op, socket);

        return units[key];
    },
    get: {
        all: () => {
            return Object.values(units);
        },
        op: onlyAvailable => {
            const res = Object.values(units).filter(q => (q.op));

            if (onlyAvailable) {
                return res.filter(q => (!q.busy));
            }

            return res;
        },
        byKey: key => {
            return units[key];
        }
    },
    remove: key => {
        delete units[key];
    }
};
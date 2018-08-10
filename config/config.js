var cfg = {
    db: {
        host: "127.0.0.1",
        port: 3306,
        database: "zyyl",
        user: "root",
        password: "root",
    },
    redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 0,
    },
    socketUrl : "ws://127.0.0.1:3000"
};

module.exports = cfg;
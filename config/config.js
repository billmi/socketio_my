var cfg = {
    db: {
        host: "127.0.0.1",
        port: 3306,
        database: "mytest",
        user: "root",
        password: "root",
    },
    redis: {
        host: '127.0.0.1',
        port: 7000,
        db: 0,
    },
    socketUrl : "ws://127.0.0.1:3000"
};

module.exports = cfg;